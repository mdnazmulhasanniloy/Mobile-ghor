import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/Context';
import toast from 'react-hot-toast';
import useToken from './../../Hooks/useToken';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext)
    const [loader, setLoader] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    const Navigate = useNavigate();
    const location = useLocation();
    const [passwordToggle, setPasswordToggle] = useState(false)





    const from = location?.state?.from || '/';
    if (token) {
        Navigate(from, { replace: true })
        setLoader(false)
        toast.success('Register success full');

    }

    const onSubmit = (data) => {
        setLoader(true)
        const imgHostKey = `1ac619d1289137be2fe6cbaa52f2b8f9`

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

                    const userInfo = {
                        displayName: data.name,
                        photoURL: imgData.data.url,

                    }

                    // create user
                    createUser(data.email, data.password)
                        .then((result) => {
                            const user = result.user;

                            // update user profile
                            updateUserProfile(userInfo)
                                .then(() => {
                                    saveUser(data.name, data.email, data.role, imgData.data.url);


                                })
                                .catch(err => {
                                    toast.error(err.message)
                                    setLoader(false)
                                });

                        }).catch((error) => {

                            const errorMessage = error.message;
                            toast.error(errorMessage)
                            setLoader(false)


                        });

                }
            });



    }


    //google login

    const HandelToGoogleLogin = () => {

        setLoader(true)
        googleSignIn()
            .then((result) => {
                const user = result.user;
                const role = 'Buyers'
                saveUser(user.displayName, user.email, role, user.photoURL);
                setCreatedUserEmail(user.email);
                setLoader(false);


            }).catch((error) => {

                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoader(false)

            });
    }






    //save user in database

    const saveUser = (name, email, role, img) => {
        const users = {
            name,
            email,
            role,
            img
        }
        fetch(`https://mobile-ghor-sesrver.vercel.app/users`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(users)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
                setLoader(false)
            })
            .catch(error => toast.error(error.message))
    }



    return (
        <div className="hero h-[70rem] mt-20" >
            <div className="card flex-shrink-0 w-full max-w-[600px] shadow-2xl bg-base-100">
                <div className="card-body">
                    <h1 className='text-5xl font-bold text-center my-5'>Register</h1>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="grid lg:grid-cols-2 md:grid-2 sm:grid-1 gap-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="name" placeholder="Enter Your Name" {...register("name", {
                                    required: "This field is required (You can't leave this field blank) ",
                                    maxLength: { value: 20, message: "Please Provide" }

                                })} className={errors.name ? "input input-bordered input-error" : "input input-bordered"} />
                                {
                                    errors.name && <p className=' text-red-600'>{errors.name.message}</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" {...register("email", {
                                    required: "Please enter a valid email address (the data you entered is not in the right format) ",
                                    maxLength: { value: 20, message: "you enter value is up to 20 characters" }

                                })} className={errors.email ? "input input-bordered input-error" : "input input-bordered"} />
                                {
                                    errors.email && <p className=' text-red-600 mt-3'>{errors.email.message}</p>
                                }
                            </div>

                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Specialty</span>
                            </label>
                            <select className={errors.Specialty ? 'input-bordered input-error select select-bordered w-full' : 'select select-bordered w-full'} {...register("role", {
                                required: "Specialty is required",
                            })}>
                                <option>Buyers</option>
                                <option>Sellers </option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={passwordToggle ? 'text' : 'password'} placeholder="password" {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "At last provide 6 characters" },
                                pattern: {
                                    value: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]/,
                                    message: "must include lower, upper, number, and special chars"
                                }


                            })} className={errors.password ? "input input-bordered input-error" : "input input-bordered "} />
                        </div>

                        <div className='w-100 flex justify-end mr-5 -mt-10 z-0'>
                            {
                                passwordToggle ? <AiFillEyeInvisible onClick={() => setPasswordToggle(!passwordToggle)} className='text-3xl cursor-pointer' />
                                    : <AiFillEye onClick={() => setPasswordToggle(!passwordToggle)} className='text-3xl cursor-pointer' />
                            }
                        </div>
                        {
                            errors.password && <p className=' text-red-600 mt-3'>{errors.password.message}</p>
                        }

                        <div className="form-control mt-5">
                            <label htmlFor="dropzone-file" className={errors.img ? "flex flex-col items-center justify-center w-full border-2 border-red-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                : "flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"}>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> User Images</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or jpeg </p>
                                </div>
                                <input id="dropzone-file" {...register("img", {
                                    required: "img is required",
                                })} type="file" className="hidden" accept=".png, .jpg, .jpeg" />
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className={loader ? 'btn btn-neutral loading' : 'btn btn-neutral'}>
                                {loader ? 'Loading' : 'Register'}
                            </button>
                        </div>
                    </form>
                    <label className="label ">
                        <p href="#" className="text-center text-sm">

                            Already have an account?
                            <Link to='/login' className="label-text-alt link link-hover text-secondary text-sm ml-1">Login account</Link>
                        </p>

                    </label>
                    <div className="flex my-5">
                        <div className="w-32 h-[2px] bg-neutral flex-2"></div>
                        <p className='text-lg mt-[-15px] flex-1 text-center text-neutral'>OR</p>
                        <div className="w-32 h-[2px] flex-2 bg-neutral"></div>
                    </div>

                    <div className="form-control">
                        <button className="btn btn-outline btn-neutral" onClick={HandelToGoogleLogin}>CONTINUE WITH GOOGLE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;