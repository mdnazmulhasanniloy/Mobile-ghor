import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Context/Context';
import Spanner from '../../../Shared/Spanner/Spanner';
import MyProductTable from './MyProductTable';
import { useQuery } from '@tanstack/react-query';
import Spanner2 from '../../../Shared/Spanner/Spanner2';

const MyProduct = () => {
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const email = user?.email;


    const { data: myProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['product', email],
        queryFn: async () => {
            const res = await fetch(`https://mobile-ghor-sesrver.vercel.app/myProduct/${email}`)
            const data = await res.json();
            return data;
        }
    })

    //add advertisement products
    const handelToAdvertisementadd = (id) => {
        fetch(`https://mobile-ghor-sesrver.vercel.app/myProduct/AdvertisementAdd/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Your Product show in Advertisement section')
                    refetch();
                }
            })
            .catch(err => toast.error(err))


    }

    //delete addProduct

    const handelToRemoveAdvertisement = (id) => {
        fetch(`https://mobile-ghor-sesrver.vercel.app/myProduct/RemoveAdvertisement/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Your Product will be removed form Advertisement section')
                    refetch();
                }
            })
            .catch(err => toast.error(err))


    }



    const handelToDelete = (id) => {
        setLoading(true)
        fetch(`https://mobile-ghor-sesrver.vercel.app/myProduct/delete/${id}`, {
            method: 'DELETE', headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }

        })
            .then(res => res.json())
            .then(data => {

                if (data.deletedCount > 0) {
                    toast.success('User deleted successfully.');
                    setLoading(false)
                    refetch()
                }
            })
            .catch(err => {
                toast.error(err.message)
                setLoading(false)
            });
    }

    if (isLoading) {
        return <Spanner />
    }
    if (loading) {
        return <Spanner2 />
    }

    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>

                                </label>
                            </th>
                            <th></th>
                            <th>Name</th>
                            <th>Resale Price</th>
                            <th>Product Status</th>
                            <th>Delete Account</th>
                            <th>advertise Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProducts.map((product, index) => <MyProductTable
                                product={product}
                                index={index}
                                handelToDelete={handelToDelete}
                                handelToRemoveAdvertisement={handelToRemoveAdvertisement}
                                handelToAdvertisementadd={handelToAdvertisementadd}
                                key={product._id} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProduct;