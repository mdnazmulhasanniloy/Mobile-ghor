const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIP_SECRET);

const jwt = require('jsonwebtoken');


const app = express();
const port = process.env.PORT || 2000;


app.use(cors());
app.use(express.json());



//db connect 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pyj8wdj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

// jwt function

const verifyJwt = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('unAuthorize access')
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'forbidden access' })
        }
        req.decoded = decoded;
        next();
    })

}
const run = async () => {
    try {

        //db table 
        const userCollection = client.db(`${process.env.DB_USER}`).collection('user');
        const productsCollection = client.db(`${process.env.DB_USER}`).collection('products');
        const categoryCollection = client.db(`${process.env.DB_USER}`).collection('category');
        const ordersCollection = client.db(`${process.env.DB_USER}`).collection('orders');
        const paymentsCollection = client.db(`${process.env.DB_USER}`).collection('payments');
        const commentsCollection = client.db(`${process.env.DB_USER}`).collection('comments');
        const reportedItemCollection = client.db(`${process.env.DB_USER}`).collection('ReportedItem');


        //payment method
        app.post('/create-payment-intent', async (req, res, next) => {
            const product = req.body;
            const price = product.resalePrice;
            const amount = price * 100;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                "payment_method_types": [
                    "card"
                ]
            });
            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        })
        // jwt api
        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const user = await userCollection.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1d' });
                return res.send({ accessToken: token });
            }
            return res.status(403).send({ accessToken: '' })


        })
        //create user
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user)
            res.send(result);
        })

        //get admin
        app.get('/allUser/:role', async (req, res) => {
            const role = req.params.role
            const query = {
                role: role
            }
            const result = await userCollection.find(query).toArray();
            res.send(result)
        });

        // user find using email 
        app.get('/user', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const result = await userCollection.findOne(query)
            res.send(result)
        })



        // update user status verified
        app.put('/user/status/:id', verifyJwt, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail }
            const user = await userCollection.findOne(query);
            if (user?.role !== 'Admin') {
                return res.status(403).send({ message: 'forbidden access' })
            }

            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    status: 'verified'
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc, options);
            res.send(result)


        });





        // delete user 

        app.delete('/user/delete/:id', verifyJwt, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail }
            const user = await userCollection.findOne(query);
            if (user?.role !== 'Admin') {
                return res.status(403).send({ message: 'forbidden access' })
            }

            const id = req.params.id;
            const userQuery = {
                _id: ObjectId(id)
            }

            const result = await userCollection.deleteOne(userQuery);
            res.send(result);
        })

        //find user info using email
        app.get('/user', async (req, res) => {
            const email = req.query.email
            const query = { email: email }
            const result = await userCollection.findOne(query)
            if (result.role === 'Admin') {
                return res.send('Admin');
            }
            else if (result.role === 'Sellers') {
                return res.send('Sellers');
            }
            else if (result.role === 'Buyers') {
                return res.send('Buyers');
            }

        });


        //category get
        app.get('/category', async (req, res) => {
            const query = {}
            const result = await categoryCollection.find(query).toArray();
            res.send(result)
        })




        // product add
        app.post('/addProduct', verifyJwt, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail }
            const user = await userCollection.findOne(query);
            if (user?.role !== 'Sellers') {
                return res.status(403).send({ message: 'forbidden access' })
            }
            const product = req.body;
            const result = await productsCollection.insertOne(product)
            res.send(result);
        })

        // get product using category 
        app.get('/category/:name', async (req, res) => {

            const categoryName = req.params.name;
            const query = {
                category: categoryName

            }
            const products = await productsCollection.find(query).sort('date', -1).toArray();
            const remainingProduct = products.filter(product => product.paid !== true)
            res.send(remainingProduct);



        })



        //Sellers my product get 
        app.get('/myProduct/:email', async (req, res) => {
            const email = req.params.email;
            const query = {
                email: email,
            }
            const result = await productsCollection.find(query).toArray();
            res.send(result)
        })

        //myProduct delete
        app.delete('/myProduct/delete/:id', verifyJwt, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail }
            const user = await userCollection.findOne(query);
            if (user?.role !== 'Sellers') {
                return res.status(403).send({ message: 'forbidden access' })
            }

            const id = req.params.id;
            const productQuery = {
                _id: ObjectId(id)
            }
            const result = await productsCollection.deleteOne(productQuery);
            res.send(result);
        })


        // add advertisement  products 
        app.put('/myProduct/AdvertisementAdd/:id', async (req, res) => {
            // const decodedEmail = req.decoded.email;
            // const query = { email: decodedEmail }
            // const user = await userCollection.findOne(query);
            // if (user?.role !== 'Sellers') {
            //     return res.status(403).send({ message: 'forbidden access' })
            // }


            const id = req.params.id;
            const ProductQuery = {
                _id: ObjectId(id)
            }
            const updatedDoc = {
                $set: {
                    Advertisement: true,
                }
            }
            const result = await productsCollection.updateOne(ProductQuery, updatedDoc);
            res.send(result);

        });



        //removed advertisement products
        app.put('/myProduct/RemoveAdvertisement/:id', async (req, res) => {
            // const decodedEmail = req.decoded.email;
            // const query = { email: decodedEmail }
            // const user = await userCollection.findOne(query);
            // if (user?.role !== 'Sellers') {
            //     return res.status(403).send({ message: 'forbidden access' })
            // }
            const id = req.params.id;
            const ProductQuery = {
                _id: ObjectId(id)
            }
            const updatedDoc = {
                $set: {
                    Advertisement: false,
                }
            }
            const result = await productsCollection.updateOne(ProductQuery, updatedDoc);
            res.send(result);

        })
        // show data in advertisement section

        app.get('/advertisementSection', async (req, res) => {

            const query = {
                Advertisement: true,
            }
            const products = await productsCollection.find(query).toArray();
            const advertisementItems = products.filter(product => product.paid !== true)
            res.send(advertisementItems);
        })





        // add order
        app.post('/addOrder', verifyJwt, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail }
            const user = await userCollection.findOne(query);
            if (user?.role !== 'Buyers') {
                return res.status(403).send({ message: 'forbidden access this feature only access a Buyers' })
            }


            const order = req.body;
            const result = await ordersCollection.insertOne(order)
            res.send(result);

        });




        // add report
        app.post('/addReports', verifyJwt, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail }
            const user = await userCollection.findOne(query);
            if (user?.role !== 'Admin') {
                return res.status(403).send({ message: 'forbidden access this feature only access a Buyers' })
            }


            const order = req.body;
            const result = await reportedItemCollection.insertOne(order)
            res.send(result);

        });


        // add report
        app.get('/Reports', verifyJwt, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail }
            const user = await userCollection.findOne(query);
            if (user?.role !== 'Admin') {
                return res.status(403).send({ message: 'forbidden access this feature only access a Buyers' })
            }


            const reportQuery = {}
            const result = await reportedItemCollection.find(reportQuery).toArray();
            res.send(result);

        });

        //report delete
        app.delete('/report/delete/:id', verifyJwt, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail }
            const user = await userCollection.findOne(query);
            if (user?.role !== 'Admin') {
                return res.status(403).send({ message: 'forbidden access' })
            }

            const id = req.params.id;
            const productQuery = {
                _id: ObjectId(id)
            }
            const result = await reportedItemCollection.deleteOne(productQuery);
            res.send(result);
        })


        //get orders 
        app.get('/myOrders/:email', verifyJwt, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail }
            const user = await userCollection.findOne(query);
            if (user?.role !== 'Buyers') {
                return res.status(403).send({ message: 'forbidden access this feature only access a Buyers' })
            }


            const email = req.params.email;
            const myOrderQuery = {
                email: email,
            }
            const result = await ordersCollection.find(myOrderQuery).toArray();
            res.send(result)
        })

        // check admin user 
        app.get('/user/admins/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await userCollection.findOne(query)
            res.send({ isAdmin: user?.role === 'Admin' })

        });

        // check seller user 
        app.get('/user/sellers/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await userCollection.findOne(query)
            res.send({ isSellers: user?.role === 'Sellers' })

        });

        app.get('/product/pay/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: ObjectId(id)
            }
            const result = await ordersCollection.findOne(query);
            res.send(result)
        })



        // payment post method api
        app.post('/payments', async (req, res) => {
            const payment = req.body;
            const result = await paymentsCollection.insertOne(payment);
            const id = payment.orderId
            const filter = { _id: ObjectId(id) }
            const updatedDoc = {
                $set: {
                    paid: true,
                    transactionId: payment.transactionId
                }
            }
            const updatedResult = await ordersCollection.updateOne(filter, updatedDoc)



            const orderData = await ordersCollection.findOne(filter)
            const productQuery = {
                _id: ObjectId(orderData.productId)
            };
            const productUpdateDoc = {
                $set: {
                    paid: true
                }
            }
            const productUpdateResult = await productsCollection.updateOne(productQuery, productUpdateDoc);
            const updatedProduct = await productsCollection.findOne(productQuery)
            res.send(result);
        })


        // get message homePage ofr review

        app.post('/message/review', async (req, res) => {
            const comment = req.body
            const result = await commentsCollection.insertOne(comment);
            res.send(result);

        })

        // get review comment
        app.get('/reviewhome', async (req, res) => {
            const query = {}
            const result = await commentsCollection.find(query).limit(2).toArray();
            res.send(result);
        })






    }
    finally {

    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('simple mobile-ghore server is running');
});



app.listen(port, () => {
    console.log(`simple mobile-ghore server running on prot ${port}`);
})