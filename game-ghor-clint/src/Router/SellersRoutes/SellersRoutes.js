import { useContext } from "react";
import { AuthContext } from './../../Context/Context';
import useSeller from './../../Hooks/useSeller';
import { useLocation, Navigate } from 'react-router-dom';
import Spanner2 from './../../Pages/Shared/Spanner/Spanner2';

const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const location = useLocation();


    if (loading || isSellerLoading) {
        return <Spanner2 />
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
