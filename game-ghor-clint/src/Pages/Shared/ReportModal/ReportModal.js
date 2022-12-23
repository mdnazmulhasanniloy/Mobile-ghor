import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/Context';
import { toast } from 'react-hot-toast';

const ReportModal = ({ product, setProduct }) => {
    const { user } = useContext(AuthContext);
    const { title, resalePrice, img } = product;
    const [loading, setLoading] = useState(false)

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        const form = event.target;
        const message = form.message.value;

        const bookingInfo = {
            title: title,
            img: img,
            resalePrice: resalePrice,
            productId: product._id,
            email: user.email,
            report: message,
            bayerName: user.displayName

        }
        fetch('https://mobile-ghor-sesrver.vercel.app/addReports', {
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
            <input type="checkbox" id="Reported-Modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="Reported-Modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label htmlFor="Name">Name</label>
                            <input type="text" placeholder="Full Name" defaultValue={user.displayName} disabled name="Name" className="input input-bordered " />
                        </div>
                        <div className="form-control">
                            <label htmlFor="Email">Email</label>
                            <input type="email" placeholder="Email" defaultValue={user.email} disabled name="email" className="input input-bordered " />
                        </div>
                        <div className="form-control my-5">
                            <label htmlFor="phoneNumber">Message</label>
                            <textarea className="textarea textarea-bordered h-24" name='message' placeholder="Bio" required></textarea>
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

export default ReportModal;