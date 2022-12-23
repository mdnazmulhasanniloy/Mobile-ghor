import React, { useState } from 'react';
import AdvertisedItemCard from './AdvertisedItemCard';
import { useQuery } from '@tanstack/react-query';
import Spanner from '../../Shared/Spanner/Spanner';
import BookingModal from './../../Product/BookingModal/BookingModal';
import ReportModal from '../../Shared/ReportModal/ReportModal';


const AdvertisedItems = () => {
    const [product, setProduct] = useState(null)


    const { data: advertisementItems = [], refetch, isLoading } = useQuery({
        queryKey: ['advertisementItems'],
        queryFn: async () => {
            const res = await fetch(`https://mobile-ghor-sesrver.vercel.app/advertisementSection`)
            const data = await res.json();
            return data;
        }
    })


    if (isLoading) {
        return <Spanner />
    }
    return (
        <section className={advertisementItems.length === 0 ?
            'hidden'
            : 'block'}>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className='text-5xl font-bold text-center text-[#ff3911] mb-5'> Advertised Items</h1>

                    <div className="mt-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
                        {
                            advertisementItems.map(product => <AdvertisedItemCard
                                product={product}
                                setProduct={setProduct}
                                key={product._id}
                            />)
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
                </div>
            </div>


        </section>
    );
};

export default AdvertisedItems;