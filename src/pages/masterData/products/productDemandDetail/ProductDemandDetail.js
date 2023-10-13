import React from 'react';
import './productDemandDetail.scss'
import Sidebar from '../../../../components/sidebar/Sidebar';
import Navbar from '../../../../components/navbar/Navbar';

const ProductDemandDetail = () => {
    return (
        <>
            <div className="product-demand-detail">
                <Sidebar/>
                <div className="product-demand-detail-container">
                    <Navbar />
                    data table will go here
                </div>
            </div>
        </>
    );
};

export default ProductDemandDetail;
