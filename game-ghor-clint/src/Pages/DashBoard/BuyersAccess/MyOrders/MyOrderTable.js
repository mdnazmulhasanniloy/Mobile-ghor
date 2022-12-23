import React from 'react';
import { Link } from 'react-router-dom';

const MyOrderTable = ({ order, index }) => {

    const { img, title, resalePrice, _id, paid } = order;
    return (
        <tr>
            <th>
                {index + 1}
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={img} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                {title}
            </td>
            <td>
                {resalePrice}$
            </td>

            <th>
                {
                    paid ? <p className=' text-green-500'>Payment Paid</p>
                        : <Link to={`/dashBoard/payment/${_id}`} className="btn btn-secondary text-white btn-xs">Pay Now</Link>
                }
            </th>
        </tr>
    );
};

export default MyOrderTable;