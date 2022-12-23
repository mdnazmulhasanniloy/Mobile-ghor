import React, { useContext, useState } from 'react';
import { TbToiletPaper } from 'react-icons/tb';
import { AuthContext } from '../../../Context/Context';
import { toast } from 'react-hot-toast';

const BookingModal = ({ product, setProduct }) => {
    const { user } = useContext(AuthContext);
    const { title, resalePrice } = product;
    const [loading, setLoading] = useState(false)


    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        const form = event.target;
        const phone = form.phoneNumber.value;
        const meetingLocation = form.meetingLocation.value;

        const bookingInfo = {
            title: title,
            resalePrice: resalePrice,
            productId: product._id,
            email: user.email,
            bayerName: user.displayName,
            bayerPhone: phone,
            bayerLocation: meetingLocation

        }

        fetch('https://mobile-ghor-sesrver.vercel.app/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(bookingInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Order successfully added')
                    setProduct(null)
                    setLoading(false)

                }

            })
            .catch(err => {
                toast.error(err.message)
                setLoading(false)
            })



    }
    return (
        <div>
            <input type="checkbox" id="Booking-Modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="Booking-Modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label htmlFor="realPrice">Price</label>
                            <input type="text" placeholder="Resale Price" defaultValue={resalePrice} disabled name="resalePrice" className="input input-bordered " />
                        </div>
                        <div className="form-control">
                            <label htmlFor="Name">Name</label>
                            <input type="text" placeholder="Full Name" defaultValue={user.displayName} disabled name="Name" className="input input-bordered " />
                        </div>
                        <div className="form-control">
                            <label htmlFor="Email">Email</label>
                            <input type="email" placeholder="Email" defaultValue={user.email} disabled name="email" className="input input-bordered " />
                        </div>
                        <div className="form-control my-5">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="phone" placeholder="Phone Number" name="phoneNumber" className="input input-bordered " />
                        </div>
                        <div className="form-control my-5">
                            <label htmlFor="phoneNumber">Meeting Location</label>
                            <input type="phone" placeholder="Meeting Location" name="meetingLocation" className="input input-bordered " />
                        </div>
                        <div className="form-control my-5">
                            <button type="submit" className={
                                loading ?
                                    'btn btn-secondary loading text-white'
                                    : 'btn btn-secondary text-white'
                            }>SUBMIT </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;