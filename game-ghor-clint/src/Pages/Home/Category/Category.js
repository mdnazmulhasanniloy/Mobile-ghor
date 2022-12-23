import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoryCard from './CategoryCard';
import Spanner2 from '../../Shared/Spanner/Spanner2';



const Category = () => {

    const { data: category = [], refetch, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch(`https://mobile-ghor-sesrver.vercel.app/category`)
            const data = await res.json();
            return data;
        }
    })

    //show data
    const handelToShowProduct = (category) => {

    }
    if (isLoading) {
        return <Spanner2 />
    }
    return (
        <div className='my-20 w-3/6 mx-auto'>
            <h1 className='text-5xl font-bold text-center text-[#ff3911] mb-5'> Category's</h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                {
                    category.map(data => <CategoryCard data={data} key={data._id} handelToShowProduct={handelToShowProduct} />)
                }
            </div>

        </div>
    );
};

export default Category;