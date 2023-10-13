import React from 'react';
import './productCoastalSchedules.scss';
import Sidebar from '../../../../components/sidebar/Sidebar';
import Navbar from '../../../../components/navbar/Navbar';

const ProductCoastalSchedules = () => {
    return (
        <>
            <div className="product-coastal-schedule">
                <Sidebar />
                <div className="product-coastal-schedule-container">
                    <Navbar />
                    data table will go here
                </div>
            </div>
        </>
    );
};

export default ProductCoastalSchedules;
