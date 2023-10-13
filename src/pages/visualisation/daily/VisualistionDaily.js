import React from 'react';
import './visualisationDaily.scss';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';

const VisualisationDaily = () => {
    return (
        <>
          <div className="visualisationDaily">
          <Sidebar/>
            <div className="visualisationDaily-container">
              <Navbar/>
              Daily Visualisation content goes here.
            </div>
          </div>
        </>
    );
};

export default VisualisationDaily;
