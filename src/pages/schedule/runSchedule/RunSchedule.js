import React from 'react';
import './runSchedule.scss'
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';

const RunSchedule = ({setAuth}) => {
    return (
        <>
            <div className="run-schedule">
                <Sidebar setAuth={setAuth} />
                <div className="run-schedule-container">
                    <Navbar />
                    Run Schedule
                </div>
            </div>
        </>
    );
};

export default RunSchedule;
