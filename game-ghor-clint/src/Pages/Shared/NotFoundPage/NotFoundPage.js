import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFoundPage = () => {




    return (
        <div>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>4<span>0</span>4</h1>
                    </div>
                    <h2>the page you requested could not found</h2>
                    <Link to='/' className="button px-3 py-2 rounded">GO to back</Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;