import React from 'react';
import './list.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DataTable from '../../components/dataTable/DataTable';

const List = ({ setAuth }) => {
        return (
        <>
            <div className="list">
                <Sidebar setAuth={setAuth} />
                <div className="list-container">
                    <Navbar />
                    <DataTable />
                </div>
            </div>
        </>
    );
};

export default List;
