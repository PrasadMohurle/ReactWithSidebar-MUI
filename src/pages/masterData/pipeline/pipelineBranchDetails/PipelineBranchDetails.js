import React from 'react';
import './pipelineBranchDetails.scss'
import Sidebar from '../../../../components/sidebar/Sidebar';
import Navbar from '../../../../components/navbar/Navbar';
// import DataTable from '../../../../components/dataTable/DataTable';

const PipelineBranchDetails = ({setAuth}) => {
    return (
        <>
            <div className="pipeline_branch_details">
                <Sidebar setAuth={setAuth} />
                <div className="pipeline_branch_details-container">
                    <Navbar />
                    data table will go here
                </div>
            </div>
        </>
    );
};

export default PipelineBranchDetails;
