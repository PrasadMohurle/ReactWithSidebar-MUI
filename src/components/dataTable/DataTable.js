import React from 'react';
import './dataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import {userColumn, userRows} from '../../assets/data/datatableSource'
import { Link } from 'react-router-dom';

const DataTable = () => {

    const actionColumn =[
        {field: "action", headerName : "Action", width: 150, sortable: false, renderCell: () => {
            return (
                <div className="cellWithAction">
                    <div className="view-btn">View</div>
                    <div className="delete-btn">Delete</div>
                </div>
            )
        } }
    ]
    
    return (
        <>
            <div className="datatable">
                <div className="title">
                    <h1>User Data</h1>
                    <div className="add-new">
                        <Link to='/dashboard/users/new' className='add-new-btn'>Add New</Link>
                    </div>
                </div>
                <DataGrid
                    className='data-grid'
                    rows={userRows}
                    columns={userColumn.concat(actionColumn)}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </>
    );
};

export default DataTable;
