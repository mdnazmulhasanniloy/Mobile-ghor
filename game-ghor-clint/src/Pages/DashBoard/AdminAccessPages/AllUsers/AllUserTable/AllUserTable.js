import React from 'react';

const AllUserTable = ({ user, index, handelToVerified, handelToDelete }) => {
    const { name, img, email, _id } = user;
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
                {name}
            </td>
            <td>
                {email}
            </td>
            <th>
                <button className="btn btn-ghost btn-xs" onClick={() => handelToDelete(_id)}>delete</button>
            </th>
            <th>
                {
                    user?.status ?
                        <p className=' text-green-500'>Verified</p>
                        : <button className="btn btn-ghost btn-xs" onClick={() => handelToVerified(_id)}>add to verify</button>
                }
            </th>
        </tr>
    );
};

export default AllUserTable;