import { createBrowserRouter } from "react-router-dom"
import DashBoardLayout from "../Layout/DashBoardLayout";
import Main from "../Layout/Main"
import MyOrders from "../Pages/DashBoard/BuyersAccess/MyOrders/MyOrders";
import AddProduct from "../Pages/DashBoard/SellersAccessPage/AddProduct/AddProduct";
import MyProduct from "../Pages/DashBoard/SellersAccessPage/MyProduct/MyProduct";
import Home from "../Pages/Home/Home"
import Product from "../Pages/Product/Product";
import Blogs from './../Pages/Blogs/Blogs';
import Login from './../Pages/Login/Login';
import Register from './../Pages/Register/Register';
import PrivateRouter from "./PrivateRoute/PrivateRoute";
import AllUsers from './../Pages/DashBoard/AdminAccessPages/AllUsers/AllUsers';
import AdminRouts from "./AdminRouts/AdminRouts";
import SellersRoutes from "./SellersRoutes/SellersRoutes";
import DashBoard from "../Pages/DashBoard/DashBoard";
import DisplayError from "../Pages/Shared/Display Error/DisplayError";
import Payment from "../Pages/DashBoard/BuyersAccess/PaymentField/Payment";
import NotFoundPage from "../Pages/Shared/NotFoundPage/NotFoundPage";
import ReportedItem from "../Pages/DashBoard/AdminAccessPages/ReportedItem/ReportedItem";




export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <DisplayError />,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/Home',
                element: <Home />
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/category/:category_Name',
                element: <PrivateRouter><Product /></PrivateRouter>,
                loader: async ({ params }) => await fetch(`https://mobile-ghor-sesrver.vercel.app/category/${params.category_Name}`)
            },
        ]
    },
    {
        path: '/dashBoard',
        element: <DashBoardLayout />,
        errorElement: <DisplayError />,
        children: [
            {
                path: '/dashBoard',
                element: <PrivateRouter><DashBoard /></PrivateRouter>
            },
            {
                path: '/dashBoard/allUsers',
                element: <AdminRouts><AllUsers /></AdminRouts>
            },
            {
                path: '/dashBoard/ReportedItem',
                element: <AdminRouts><ReportedItem /></AdminRouts>
            },
            {
                path: '/dashBoard/addProduct',
                element: <SellersRoutes><AddProduct /></SellersRoutes>
            },
            {
                path: '/dashBoard/myProducts',
                element: <SellersRoutes><MyProduct /></SellersRoutes>
            },
            {
                path: '/dashBoard/myOrder/',
                element: <PrivateRouter><MyOrders /></PrivateRouter>
            },
            {
                path: '/dashBoard/payment/:id',
                element: <PrivateRouter><Payment /></PrivateRouter>,
                loader: ({ params }) => fetch(`https://mobile-ghor-sesrver.vercel.app/product/pay/${params.id}`)
            },
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />,
    }
])