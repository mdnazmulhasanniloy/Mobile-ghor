import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { ImLocation2 } from 'react-icons/im';
import 'react-photo-view/dist/react-photo-view.css';
import { TbCurrencyTaka } from 'react-icons/tb';
import { MdOutlineReportProblem } from 'react-icons/md';





const AdvertisedItemCard = ({ product, setProduct }) => {
    const { img, title, location, originalPrice, resalePrice, used, author, date } = product;



    return (
        <div className="group w-80 relative shadow-lg rounded-lg">
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-50">
                <PhotoProvider>
                    <PhotoView src={img}>
                        <img src={img} className="h-full w-full object-cover object-center lg:h-full lg:w-full" alt="" />
                    </PhotoView>
                </PhotoProvider>
            </div>
            <div className="p-3">
                <h3 className="text-2xl font-bold text-gray-700 ">{title}</h3>
                <div className='flex justify-between'>
                    <h3 className="font-semibold text-gray-700 flex h-3 items-center mt-3"><span className='text-secondary'><ImLocation2 /> </span>{location}</h3>
                    <label
                        onClick={() => setProduct(product)}
                        htmlFor="Reported-Modal"
                        className='btn btn-ghost hover:text-yellow-900 btn-sm'
                    ><MdOutlineReportProblem title='Report This Product' className='text-3xl text-yellow-400' /> </label>
                </div>
                <p className="mt-3 text-gray-500">original price: <strong>{originalPrice}</strong>$ </p>
                <p className="mt-1 text-gray-500"> Resale price: <strong>{resalePrice}</strong>$ </p>
                <p className="text-sm mt-2 font-medium text-gray-900">Used: <strong>{used}</strong> </p> <br />
                <div className=' flex justify-between'>
                    <p className="text-sm font-medium text-gray-900">Dte: <strong>{date.slice(0, 10)}</strong> </p>
                    <label
                        onClick={() => setProduct(product)}
                        htmlFor="Booking-Modal"
                        className='btn btn-secondary btn-sm'
                    >Book Now</label>

                </div>
                <hr className='mt-3' />
                <div className='mt-2 flex justify-between'>
                    <p className="text-sm font-medium text-gray-900">Seller: {author.name}</p>
                    {
                        author?.status ?
                            <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Verified</span>
                            : ' '
                    }
                </div>

            </div>
        </div >
    );
};

export default AdvertisedItemCard;