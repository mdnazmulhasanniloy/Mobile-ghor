import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Context/Context';
import Spanner2 from '../Shared/Spanner/Spanner2';

const DashBoard = () => {
    const { user, loading, setLoading } = useContext(AuthContext)
    const email = user?.email;

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users', email],
        queryFn: async () => {
            const res = await fetch(`https://mobile-ghor-sesrver.vercel.app/user?email=${email}`)
            const data = await res.json();
            return data;
        }
    })

    if (loading && isLoading) {
        <Spanner2 />
    }
    const { name, img, status, role } = users;
    return (
        <div className='flex justify-center items-center'>

            <div className=" w-2/4 bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-end px-4 pt-4">


                </div>
                <div className="flex flex-col items-center pb-10">
                    <img className="w-24 h-24 ring ring-primary ring-offset-base-100 mb-3 rounded-full shadow-lg" src={img} alt="Bonnie image" />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{email}</span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <h1 className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">{role}</h1>
                        {
                            status &&
                            <h1 className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">{status}</h1>
                        }

                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashBoard;