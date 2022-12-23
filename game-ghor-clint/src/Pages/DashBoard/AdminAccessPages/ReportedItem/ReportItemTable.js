import React from 'react';

const ReportItemTable = ({ reports, handelDelete }) => {
    const { img, title, report, email, _id } = reports;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img className='' src={img} alt={title} /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                </h2>
                <p><strong>Report: </strong> {report}</p>
                <hr />
                <div className="card-actions justify-between">
                    <h2>Email: {email}</h2>

                </div>
                <button className="btn btn-sm btn-error text-white" onCanPlay={() => handelDelete(_id)}>Delete</button>
            </div>
        </div>
    );
};

export default ReportItemTable;