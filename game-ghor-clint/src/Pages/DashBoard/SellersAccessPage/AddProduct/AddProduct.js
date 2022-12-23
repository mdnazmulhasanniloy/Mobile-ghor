import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../../Context/Context';
import Spanner from './../../../Shared/Spanner/Spanner';
import { toast } from 'react-hot-toast';

const AddProduct = () => {
    const { user } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loader, setLoader] = useState(false)
    const [isloader, setIsloader] = useState(false)
    const [author, setAuthor] = useState({});
    const email = user?.email;


    useEffect(() => {
        setLoader(true)
        fetch(`https://mobile-ghor-sesrver.vercel.app/user?email=${email}`)
            .then(res => res.json())
            .then(data => { return (setAuthor(data), setLoader(false)) })
    }, [email])


    const onSubmit = (data) => {
        setIsloader(true)
        const imgHostKey = `1ac619d1289137be2fe6cbaa52f2b8f9`;


        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);

        fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {

                    const productInfo = {
                        img: imgData.data.url,
                        title: data.title,
                        location: data.location,
                        date: new Date(),
                        used: data.used,
                        productQuality: data.productQuality,
                        category: data.category,
                        email: author.email,
                        resalePrice: data.resalePrice,
                        originalPrice: data.originalPrice,
                        description: data.description,
                        mobileNumber: data.mobileNumber,
                        author: author,


                    }

                    fetch(`https://mobile-ghor-sesrver.vercel.app/addProduct`, {
                        method: 'POST',
                        headers: {

                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`

                        },
                        body: JSON.stringify(productInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                setIsloader(false)
                                toast.success('your product hasbeen process please waite for admin aproved')
                            }
                        })
                        .catch(error => { toast.error(error.message); setIsloader(false) })
                }
            });


    }
    if (loader) {
        return <Spanner></Spanner>
    }

    return (
        <div>
            <div className="card-body">
                <h1 className='text-5xl font-bold text-center my-5'>Add A Product</h1>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="grid lg:grid-cols-2 md:grid-2 sm:grid-1 gap-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input type="text" placeholder="Product Name" {...register("title", {
                                required: "Name is required"

                            })} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input type="text" placeholder="Location" {...register("location", {
                                required: "Location is required"

                            })} className="input input-bordered" />
                        </div>

                    </div>
                    <div className="grid lg:grid-cols-2 md:grid-2 sm:grid-1 gap-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Original Price</span>
                            </label>
                            <input type="text" placeholder="OriginalPrice" {...register("originalPrice", {
                                required: "Original Price is required"

                            })} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Resale Price</span>
                            </label>
                            <input type="ResalePrice" placeholder="ResalePrice" {...register("resalePrice", {
                                required: "ResalePrice is required"

                            })} className="input input-bordered" />
                        </div>

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Mobile Number</span>
                        </label>
                        <input type="tel" placeholder="Mobile Number" {...register("mobileNumber", {
                            required: "Mobile Number is required"

                        })} className="input input-bordered" />
                    </div>
                    <div className='form-control my-3'>
                        <label className="label">
                            <span className="label-text">Product Quality :</span>
                        </label>
                        <div className='flex items-center'>
                            <div className="flex items-center ml-5">
                                <input id="default-radio-1" {...register("productQuality")} type="radio" value="Excellent" name="default-radio" className="w-4 h-4" />
                                <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Excellent</label>
                            </div>
                            <div className="flex items-center mx-5">
                                <input checked id="default-radio-2" {...register("productQuality")} type="radio" value="Good" name="default-radio" className="w-4 h-4" />
                                <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Good</label>
                            </div>
                            <div className="flex items-center">
                                <input checked id="default-radio-3" {...register("productQuality")} type="radio" value="Fair" name="default-radio" className="w-4 h-4" />
                                <label htmlFor="default-radio-3" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fair</label>
                            </div>
                        </div>
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select className={errors.category ? 'input-bordered input-error select select-bordered w-full' : 'select select-bordered w-full'} {...register("category", {
                            required: "Specialty is required",
                        })}>
                            <option>Apple</option>
                            <option>OnePlus</option>
                            <option>Oppo</option>
                            <option>Samsung</option>
                            <option>Vivo</option>
                            <option>Xiaomi</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Used Year</span>
                        </label>
                        <select className={errors.category ? 'input-bordered input-error select select-bordered w-full' : 'select select-bordered w-full'} {...register("used", {
                            required: "Specialty is required",
                        })}>
                            <option>1 Year</option>
                            <option>2 Years</option>
                            <option>3 Years</option>
                            <option>4 Years</option>
                            <option>5 Years</option>
                        </select>
                    </div>
                    <div className="form-control mt-5">
                        <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">select Product image</label>
                        <input className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

                            type="file"
                            {...register("img", {
                                required: "img is required",
                            })}
                            id="formFile" />

                    </div>

                    <div className="form-control mt-5">
                        <label className="label">
                            <span className="label-text inline-block mb-2 text-gray-700">Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" {...register("description")} placeholder="Description..."></textarea>
                    </div>

                    <div className="form-control mt-6">
                        <button type='submit' className={isloader ? 'btn btn-neutral loading' : 'btn btn-neutral'}>
                            {isloader ? 'Loading' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;