import React, { useContext, useState } from 'react';
import { NavLink, NavNavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/Context';
import useSeller from '../Hooks/useSeller';
import NavBar from '../Pages/Shared/NavBar/NavBar';
import Spanner2 from '../Pages/Shared/Spanner/Spanner2';
import useAdmin from './../Hooks/useAdmin';
import style from './DashBoardLayout.css'

const DashBoardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    const [isSellers, isSellerLoading] = useSeller(user?.email)


    if (isSellerLoading && isAdminLoading) {
        return <Spanner2 />
    }

    return (
        <div>
            <NavBar />
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" tabIndex={0} className="drawer-overlay"></label>

                    <ul className="menu p-4 w-72 text-base-content">

                        {
                            !isSellers && !isAdmin && <>
                                <li><NavLink to='/dashBoard/myOrder/'>My Order</NavLink></li>
                            </>
                        }

                        {
                            isSellers && <>
                                <li><NavLink to='/dashBoard/addProduct'>Add Product</NavLink></li>
                                <li><NavLink to='/dashBoard/myProducts'>MyProducts</NavLink></li>
                            </>
                        }

                        {
                            isAdmin && <>
                                <li><NavLink to='/dashBoard/allUsers'>All Users</NavLink></li>
                                <li><NavLink to='/dashBoard/ReportedItem'>Reported Products</NavLink></li>
                            </>
                        }
                    </ul>
                    <ul className="menu p-4 w-80  bg-gray-50 text-base-content">




                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;