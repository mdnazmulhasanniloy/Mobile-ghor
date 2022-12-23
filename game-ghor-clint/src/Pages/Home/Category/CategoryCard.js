import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ data, handelToShowProduct }) => {
    const { img, category_Name, _id } = data;
    return (
        <div className=" h-48 w-48 bg-base-100 shadow-2xl flex flex-col justify-center items-center" onClick={() => handelToShowProduct(category_Name)}>
            <figure><img src={img} alt="Shoes" /></figure>
            <Link to={`/category/${category_Name}`}>Show Product</Link>
        </div>
    );
};

export default CategoryCard;