import React from 'react';
import './coreDataTable.scss';
import { DataGrid } from '@mui/x-data-grid';

const CoreDataTable = ({ rows, columns }) => {
    return (
        <>
            <div className="core-data-grid">
                <DataGrid
                    className="data-grid"
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </>
    );
};

export default CoreDataTable;
