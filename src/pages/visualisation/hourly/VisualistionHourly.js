import React from 'react';
import './visualisationHourly.scss';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';

const VisualisationHourly = () => {
    return (
        <>
          <div className="visualisationHourly">
          <Sidebar/>
            <div className="visualisationHourly-container">
              <Navbar/>
              Hourly Visualisation content goes here.
            </div>
          </div>
        </>
    );
};

export default VisualisationHourly;
