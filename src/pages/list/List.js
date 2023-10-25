import React from 'react';
import './list.scss';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import CoreDataTable from '../../components/commonComponents/CoreDataTable/CoreDataTable';
import { userColumn, userRows } from '../../assets/data/datatableSource';

const List = ({ setAuth }) => {

    // const [userData, setUserData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://localhost:5005/fetch/getUserData', {
    //                 method: 'GET',
    //                 mode: 'cors',
    //                 headers: { 'Content-Type': 'application/json' },
    //             });
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }

    //             const data = await response.json();
    //             setUserData(data.rows);
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // const userColumn = [
    //     { field: 'id', headerName: 'ID', width: 50, sortable: false },
    //     { field: 'userName', headerName: 'User name', width: 150 },
    //     { field: 'email', headerName: 'Email ID', width: 200 },
    //     { field: 'phoneNumber', headerName: 'Phone number', width: 150, sortable: false},
    //     {
    //         field: 'role',
    //         headerName: 'Role',
    //         width: 100,
    //         renderCell: (params) => {
    //             return (
    //                 <div className={`cellWithRole ${params.row.role}`}>
    //                     {params.row.role}
    //                 </div>
    //             );
    //         },
    //     },
    //     { field: 'created_date', headerName: 'Created On', width: 130 },
    // ];

    // this contains the list of actionable buttons which can be used
    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            sortable: false,
            renderCell: () => {
                return (
                    <div className="cellWithAction">
                        <div className="view-btn">View</div>
                        <div className="delete-btn">Delete</div>
                    </div>
                );
            },
        },
    ];


    return (
        <>
            <div className="list">
                <Sidebar setAuth={setAuth} />
                <div className="list-container">
                    <Navbar />
                    <div className="title">
                        <h1>User Data</h1>
                        <div className="add-new">
                            <Link
                                to="/dashboard/users/new"
                                className="add-new-btn"
                            >
                                Add New
                            </Link>
                        </div>
                    </div>
                    <CoreDataTable
                        rows={userRows}
                        columns={userColumn.concat(actionColumn)}
                    />
                </div>
            </div>
        </>
    );
};

export default List;
