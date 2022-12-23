import React, { useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { ImLocation2 } from 'react-icons/im';
import 'react-photo-view/dist/react-photo-view.css';
import { MdOutlineReportProblem } from 'react-icons/md';
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'





const ProductCard = ({ setProduct, product }) => {
    const { img, title, location, originalPrice, resalePrice, used, author, date } = product;

    const [SkeletonItems, setSkeleton] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setSkeleton(false);
        }, 3 * 1000);
    }, [])


    return (
        <div className="group w-80 relative shadow-lg rounded-lg">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-50">
                {
                    SkeletonItems ?
                        <Skeleton count={1} width="320px" height="300px" />
                        : <PhotoProvider>
                            <PhotoView src={img}>
                                <img src={img} className="h-80 w-full object-cover object-center lg:h-full lg:w-full" alt="" />
                            </PhotoView>
                        </PhotoProvider>
                }
            </div>
            <div className="p-3">
                {
                    SkeletonItems ?
                        <Skeleton count={1} width="200px" />
                        : <h3 className="text-2xl font-bold text-gray-700 ">{title}</h3>
                }
                <div className='flex justify-between'>
                    {
                        SkeletonItems ?
                            <Skeleton count={1} width="60px" />
                            : <h3 className="font-semibold text-gray-700 flex h-3 items-center mt-3"><span className='text-secondary'><ImLocation2 /> </span>{location}</h3>

                    }
                    {
                        SkeletonItems ?
                            <Skeleton count={1} width="30px" height="30px" />
                            : <label
                                onClick={() => setProduct(product)}
                                htmlFor="Reported-Modal"
                                className='btn btn-ghost hover:text-yellow-900'
                            ><MdOutlineReportProblem title='Report This Product' className='text-3xl text-yellow-400 ' /> </label>}
                </div>

                {
                    SkeletonItems ?
                        <Skeleton count={1} width="200px" />
                        : <p className="mt-3 text-gray-500">original price: <strong>{originalPrice}</strong> $</p>
                }


                {
                    SkeletonItems ?
                        <Skeleton count={1} width="200px" />
                        : <p className="mt-1 text-gray-500"> Resale price: <strong>{resalePrice}</strong> $ </p>
                }

                {
                    SkeletonItems ?
                        <Skeleton count={1} width="100px" />
                        : <p className="text-sm mt-2 font-medium text-gray-900">Used: <strong>{used}</strong> </p>
                }

                <div className=' flex justify-between'>
                    {
                        SkeletonItems ?
                            <Skeleton count={1} width="130px" />
                            : <p className="text-sm font-medium text-gray-900">Dte: <strong>{date.slice(0, 10)}</strong> </p>
                    }
                    {
                        SkeletonItems ?
                            <Skeleton count={1} width="100px" height="30px" />
                            : <label
                                onClick={() => setProduct(product)}
                                htmlFor="Booking-Modal"
                                className='btn btn-secondary btn-sm'
                            >Book Now</label>
                    }

                </div>
                <hr className='mt-3' />
                {
                    SkeletonItems ?
                        < Skeleton count={1} width="100%" height="20px" />
                        : <div className='mt-2 flex justify-between'>
                            <p className="text-sm font-medium text-gray-900">Seller: {author.name}</p>
                            {
                                author?.status ?
                                    <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Verified</span>
                                    : ' '
                            }
                        </div>
                }

            </div>
        </div >
    );
};

export default ProductCard;