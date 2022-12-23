import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/Context';
import { toast } from 'react-hot-toast';

const NavBar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const Navigate = useNavigate()


    const HandelToLogout = () => {

        signOutUser()
            .then(() => {
                localStorage.removeItem('accessToken')
                Navigate('/')
            })
            .catch(error => toast.error(error))

    }

    const menuItem =
        <React.Fragment>
            <li><Link to='/home' >Home</Link></li>
            <li><Link to='/blogs' >Blogs</Link></li>
            {
                user ? <>
                    <li><Link to='/dashBoard' >DashBoard</Link></li>
                    <li><button onClick={HandelToLogout} >Log Out</button></li>
                </>
                    : <li><Link to='/login' >Login</Link></li>
            }



        </React.Fragment>


    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            menuItem
                        }
                    </ul>
                </div>
                <Link className="btn btn-ghost text-2xl"> <span className="text-[#2385be] text-xl">Mobile </span> <span className="text-[#efbc1b] ml-2 text-xl"> Ghor</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {
                        menuItem
                    }
                </ul>
            </div>
            <label tabIndex={1} htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default NavBar;