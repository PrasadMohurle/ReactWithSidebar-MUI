import React from 'react';
import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const Single = () => {
    return (
        <>
            <div className="single">
                <Sidebar />
                <div className="single-container">
                    <Navbar />
                    single user details.
                </div>
            </div>
        </>
    );
};

export default Single;
