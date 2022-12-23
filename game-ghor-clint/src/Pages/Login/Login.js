import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/Context';
import { toast } from 'react-hot-toast';
import useToken from '../../Hooks/useToken';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
    const [loader, setLoader] = useState(false)
    const { signInUserPassword, googleSignIn } = useContext(AuthContext)
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [passwordToggle, setPasswordToggle] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [token] = useToken(createdUserEmail)
    const location = useLocation()
    const navigate = useNavigate()

    const from = location?.state?.from || '/';

    if (token) {
        navigate(from, { replace: true })
        toast.success('Login success full');
    }


    const onSubmit = (data) => {

        // LOGIN user login
        setLoader(true)
        //Sign in user password
        signInUserPassword(data.email, data.password)
            .then((result) => {
                const user = result.user;
                setCreatedUserEmail(user.email)
                setLoader(false)



            }).catch((error) => {

                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoader(false)


            });


    }


    //google login
    const handelToGoogleLogin = () => {

        setLoader(true)

        googleSignIn()
            .then((result) => {
                const user = result.user;
                setCreatedUserEmail(user.email)
                setLoader(false);

            }).catch((error) => {

                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoader(false)


            });


    }



    return (
        <div className="hero mt-20">
            <div className="card flex-shrink-0 w-full max-w-[600px] shadow-2xl bg-base-100">
                <div className="card-body">
                    <h1 className='text-5xl font-bold text-center my-5'>Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)} >
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
                        <div className=' flex justify-end mr-5 -mt-10 z-0'>
                            {
                                passwordToggle ? <AiFillEyeInvisible onClick={() => setPasswordToggle(!passwordToggle)} className='text-3xl cursor-pointer' />
                                    : <AiFillEye onClick={() => setPasswordToggle(!passwordToggle)} className='text-3xl cursor-pointer' />
                            }
                        </div>
                        {
                            errors.password && <p className=' text-red-600 mt-3'>{errors.password.message}</p>
                        }
                        <label className="label mt-2">
                            <Link href="#" className="label-text-alt text-sm link link-hover">Forgot password?</Link>
                        </label>
                        <div className="form-control mt-6">
                            <button type='submit' className={loader ? 'btn btn-neutral loading' : 'btn btn-neutral'}>
                                {loader ? 'Loading' : 'Login'}
                            </button>
                        </div>
                    </form>
                    <label className="label ">
                        <p href="#" className="text-center text-sm">

                            Don't have account?
                            <Link to='/register' className="label-text-alt link link-hover text-secondary text-sm ml-1">Create new account</Link>
                        </p>

                    </label>
                    <div className="flex my-5">
                        <div className="w-32 h-[2px] bg-neutral flex-2"></div>
                        <p className='text-lg mt-[-15px] flex-1 text-center text-neutral'>OR</p>
                        <div className="w-32 h-[2px] flex-2 bg-neutral"></div>
                    </div>

                    <div className="form-control">
                        <button className="btn btn-outline btn-neutral" onClick={handelToGoogleLogin} >CONTINUE WITH GOOGLE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;