import React from 'react';

const MyProductTable = ({ product, handelToRemoveAdvertisement, handelToAdvertisementadd, handelToDelete, index }) => {
    const { title, img, _id, resalePrice, Advertisement } = product;
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
                    product?.paid ?
                        <span className="bg-yellow-100   text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900 ">Sold</span>
                        : <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">available</span>
                }
            </th>
            <th>
                <button className="btn btn-error text-white btn-xs" onClick={() => handelToDelete(_id)}>delete</button>
            </th>
            <th>
                {
                    Advertisement ?
                        <button className={product?.paid ? "hidden" : "btn btn-outline btn-error btn-xs"} onClick={() => handelToRemoveAdvertisement(_id)}>remove advertise</button>
                        : <button className={product?.paid ? "hidden" : "btn btn-secondary btn-xs"} onClick={() => handelToAdvertisementadd(_id)}>add advertise</button>
                }
            </th>
        </tr>
    );
};

export default MyProductTable;