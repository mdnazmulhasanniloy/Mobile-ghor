import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddReview = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const Navigate = useNavigate()

    const onSubmit = (data) => {
        const messageInfo = {
            name: data.name,
            email: data.email,
            message: data.message,
            date: new Date(),
        }
        fetch(`https://mobile-ghor-sesrver.vercel.app/message/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(messageInfo)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Thanks for the review');
                Navigate('/')
            })
            .catch(err => toast.error(err.message))
    }

    return (
        <div className=' w-3/4 mx-auto my-20'>
            <h1 className='text-5xl font-bold text-center text-[#ff3911] mb-5'> Add Comments </h1>
            <form onSubmit={handleSubmit(onSubmit)} className='my-10'>

                <div className="flex w-full gap-6">
                    <div className="form-control w-1/2">
                        <input type="text" placeholder="Type here" {...register("name", {
                            required: "Name is required",
                        })} className={errors.name ? "input input-bordered input-error" : "input input-bordered"} />
                        {
                            errors.name && <p className=' text-red-600 mt-3'>{errors.name.message}</p>
                        }
                    </div>
                    <div className="form-control w-1/2">
                        <input type="email" placeholder="Enter Your Email " {...register("email", {
                            required: "email is required",
                        })} className={errors.email ? "input input-bordered input-error" : "input input-bordered"} />
                        {
                            errors.email && <p className=' text-red-600 mt-3'>{errors.email.message}</p>
                        }
                    </div>

                </div>
                <div className="form-control">
                    <label className="label">Message</label>
                    <textarea {...register("message", {
                        required: "Message is required",
                    })} className={errors.message ? 'textarea textarea-error h-60' : "textarea textarea-bordered h-60"} placeholder="Message" ></textarea>
                    {
                        errors.message && <p className=' text-red-600 mt-3'>{errors.message.message}</p>
                    }

                </div>

                <div className="form-control">
                    <button type="submit" className="btn btn-accent mt-6 text-white">Submit</button>
                </div>
            </form>
        </div>

    );
};

export default AddReview;