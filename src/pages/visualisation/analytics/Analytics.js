import React from 'react'
import './analytics.scss'
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';

const Analytics = () => {
    return (
        <>
          <div className="analytics">
          <Sidebar/>
            <div className="analytics-container">
              <Navbar/>
              Analytics content goes here.
            </div>
          </div>
        </>
    );
}

export default Analytics