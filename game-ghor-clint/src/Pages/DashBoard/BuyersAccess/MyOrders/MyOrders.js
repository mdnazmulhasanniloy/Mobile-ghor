import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../Context/Context';
import { useQuery } from '@tanstack/react-query';
import MyOrderTable from './MyOrderTable';
import Spanner from './../../../Shared/Spanner/Spanner';

const MyOrders = () => {
    const { user } = useContext(AuthContext)
    const email = user?.email;


    const { data: myOrders = [], refetch, isLoading } = useQuery({
        queryKey: ['Orders', email],
        queryFn: async () => {
            const res = await fetch(`https://mobile-ghor-sesrver.vercel.app/myOrders/${email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <Spanner />
    }
    return (
        <div>
            <div className="overflow-x-auto w-full">
                {
                    myOrders.length > 0 ?
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>

                                    </th>
                                    <th></th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    user?.email &&
                                    myOrders.map((order, index) => <MyOrderTable
                                        order={order}
                                        key={order._id}
                                        index={index}

                                    />)
                                }
                            </tbody>



                        </table>
                        : <h1 className=" text-5xl text-center text-red-400 mt-10"> Don't have any Order </h1>
                }
            </div>
        </div>
    );
};

export default MyOrders;