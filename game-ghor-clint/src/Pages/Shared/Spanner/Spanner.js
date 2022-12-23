import React from 'react';
import RiseLoader from 'react-spinners/RiseLoader';

const Spanner = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-[#726d6d17]">
            <RiseLoader color="#36d7b7" />
        </div>
    );
};

export default Spanner;
