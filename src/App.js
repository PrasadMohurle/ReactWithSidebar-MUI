import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Error from './pages/error/Error';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import Dashboard from './pages/dashboard/Dashboard';
//  visualisation
import VisualisationDaily from './pages/visualisation/daily/VisualistionDaily';
import VisualisationHourly from './pages/visualisation/hourly/VisualistionHourly';
import Analytics from './pages/visualisation/analytics/Analytics';
//  schedule
import ScheduleDaily from './pages/schedule/daily/ScheduleDaily';
import ScheduleHourly from './pages/schedule/hourly/ScheduleHourly';
//  pipeline
import PipelineBranchDetails from './pages/masterData/pipeline/pipelineBranchDetails/PipelineBranchDetails';
import PipelineBranchPlugQuantity from './pages/masterData/pipeline/pipelineBranchPlugQuantity/PipelineBranchPlugQuantity';
//  product
import ProductCoastalSchedules from './pages/masterData/products/productCoastalSchedules/ProductCoastalSchedules';
import ProductDemandDetail from './pages/masterData/products/productDemandDetail/ProductDemandDetail';
//  data from ASSETS folder
import { userInputs } from './assets/data/formSource';

function App() {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const setAuth = (booleanValue) => { setIsAuthenticated(booleanValue);};
   
    return (
        <>
            <div className="app">            
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="login" element={!isAuthenticated ? ( <Login setAuth={setAuth} />) : (<Navigate to="/dashboard" />)} />
                    <Route exact path="register" element={!isAuthenticated ? ( <Register setAuth={setAuth} />) : (<Navigate to="/login" />)} />

                    <Route exact path="dashboard">
                      <Route index element={<Dashboard setAuth={setAuth}/>} />

                      <Route exact path="users">
                          <Route index element={<List setAuth={setAuth}/>} />
                          <Route path=":userId" element={<Single />} />
                          <Route path="new" element={<New inputs={userInputs} title="Add New User Details"/>} />
                      </Route>

                      <Route exact path="visualisation">
                          <Route index element={<VisualisationDaily />} />
                          <Route path="daily" element={<VisualisationDaily />} />
                          <Route path="hourly" element={<VisualisationHourly />}/>
                          <Route path="analytics" element={<Analytics />}/>
                      </Route>

                      <Route exact path="schedule">
                          <Route index element={<ScheduleDaily />} />
                          <Route path="daily" element={<ScheduleDaily />} />
                          <Route path="hourly" element={<ScheduleHourly />}/>
                      </Route>

                      <Route exact path="masterData">
                        <Route exact path="pipeline">
                            <Route exact path="pipeline_branch_details" element={<PipelineBranchDetails setAuth={setAuth}/>} />
                            <Route exact path="pipeline_branch_plug_quantity" element={<PipelineBranchPlugQuantity setAuth={setAuth}/>}/>
                        </Route>

                        <Route exact path="product">
                            <Route exact path="product_coastal_schedules" element={<ProductCoastalSchedules setAuth={setAuth}/>} />
                            <Route exact path="product_demand_detail" element={<ProductDemandDetail setAuth={setAuth} />}/>
                        </Route>   
                      </Route>
                    </Route>

                    <Route exact path="*" element={<Error />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
