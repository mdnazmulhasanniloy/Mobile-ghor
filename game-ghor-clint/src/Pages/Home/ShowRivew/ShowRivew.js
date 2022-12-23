import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';

const ShowRivew = () => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch(`https://mobile-ghor-sesrver.vercel.app/reviewhome`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <div className='my-20'>
            <h3 className='text-5xl font-bold text-center text-[#ff3911] mb-5 '><u>Reviews</u></h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 my-20'>
                {
                    reviews.map(review => <ReviewCard review={review} key={review._id}></ReviewCard>)
                }

            </div>
        </div>
    );
};

export default ShowRivew;