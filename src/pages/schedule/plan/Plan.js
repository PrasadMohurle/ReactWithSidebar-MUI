import React from 'react';
import './plan.scss'
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';

const Plan = ({setAuth}) => {
    return (
        <>
            <div className="plan">
                <Sidebar setAuth={setAuth} />
                <div className="plan-container">
                    <Navbar />
                    Plan related data table will go here
                </div>
            </div>
        </>
    );
};

export default Plan;
