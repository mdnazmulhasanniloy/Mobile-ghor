import React, { useContext } from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/Context';
import { toast } from 'react-hot-toast';


const DisplayError = () => {
    const { signOutUser } = useContext(AuthContext);
    const error = useRouteError();
    const Navigate = useNavigate()

    const HandelLogout = () => {
        signOutUser()
            .then(() => {
                localStorage.removeItem('accessToken')
                Navigate('/')
            })
            .catch(error => toast.error(error))

    }


    return (
        <div>
            <div className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Danger alert!</span> {error.statusText || error.message}
                </div>
            </div>
            <h4>Please <button className='btn btn-accent' onClick={HandelLogout}>Logout</button></h4>
        </div>
    );
};

export default DisplayError;