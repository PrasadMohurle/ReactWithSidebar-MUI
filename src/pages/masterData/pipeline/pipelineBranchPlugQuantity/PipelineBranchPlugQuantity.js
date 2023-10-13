import React from 'react'
import './pipelineBranchPlugQuantity.scss'
import Sidebar from '../../../../components/sidebar/Sidebar';
import Navbar from '../../../../components/navbar/Navbar';
// import DataTable from '../../../../components/dataTable/DataTable';

const PipelineBranchPlugQuantity = () => {
  return (
    <>
            <div className="pipeline_branch_plug_quantity">
                <Sidebar />
                <div className="pipeline_branch_plug_quantity-container">
                    <Navbar />
                    data table will go here
                </div>
            </div>
        </>
  )
}

export default PipelineBranchPlugQuantity