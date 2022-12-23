import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import ReportModal from '../Shared/ReportModal/ReportModal';
import BookingModal from './BookingModal/BookingModal';
import ProductCard from './ProductCard';

const Product = () => {
    const Products = useLoaderData();
    const [product, setProduct] = useState(null)


    return (
        <div>
            <h3 className='text-center text-xl font-bold my-5'>Total Product: {Products.length} </h3>

            <div className="h-50 w-4/5 mx-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 my-20">
                {
                    Products.map(product => <ProductCard
                        product={product}
                        setProduct={setProduct}
                        key={product._id} />)
                }
            </div>
            {
                product &&
                <BookingModal
                    setProduct={setProduct}
                    product={product}
                />
            }
            {
                product &&
                <ReportModal
                    setProduct={setProduct}
                    product={product}

                />
            }

            <Footer />
        </div>
    );
};

export default Product;