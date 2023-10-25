import React from 'react';
import './planVersion.scss'
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';

const PlanVersion = ({setAuth}) => {
    return (
        <>
            <div className="plan-version">
                <Sidebar setAuth={setAuth} />
                <div className="plan-version-container">
                    <Navbar />
                    PlanVersion related data table will go here
                </div>
            </div>
        </>
    );
};

export default PlanVersion;
