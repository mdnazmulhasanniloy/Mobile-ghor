import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Context';




const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    let location = useLocation();

    if (loading) {
        return <progress className="progress w-56"></progress>
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;

};

export default PrivateRoutes;