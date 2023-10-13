
//temporary Data
import user_image from '../images/userDefault.jpg';

export const userColumn = [
    { field: 'id', headerName: 'ID', width: 50, sortable: false },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'userName',
        headerName: 'User name',
        width: 150,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img
                        className="user-avatar"
                        src={params.row.img}
                        alt="userImage"
                    />
                    {params.row.userName}
                </div>
            );
        },
    },
    { field: 'email', headerName: 'Email ID', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone number', width: 150, sortable: false},
    {
        field: 'role',
        headerName: 'Role',
        width: 100,
        renderCell: (params) => {
            return (
                <div className={`cellWithRole ${params.row.role}`}>
                    {params.row.role}
                </div>
            );
        },
    },
    { field: 'createdOn', headerName: 'Created On', width: 130 },
];

export const userRows = [
    {
        id: 1,
        img: user_image,
        lastName: 'Menon',
        firstName: 'Satish',
        userName: 'Satish247',
        email: 'satish@gmail.com',
        phoneNumber: 9424567890,
        role: 'Admin',
        createdOn: '01/01/2023',
        gender: "male",
    },
    {
        id: 2,
        img: user_image,
        lastName: 'Mohurle',
        firstName: 'Prasad',
        userName: 'PWM31',
        email: 'prasad@gmail.com',
        phoneNumber: 9514587629,
        role: 'Watcher',
        createdOn: '01/01/2023',
    },
    {
        id: 3,
        img: user_image,
        lastName: 'Ansari',
        firstName: 'Nabeel',
        userName: 'Nabeel247',
        email: 'nabeel@gmail.com',
        phoneNumber: 9647312846,
        role: 'Watcher',
        createdOn: '01/01/2023',
    },
    {
        id: 4,
        img: user_image,
        lastName: 'Stark',
        firstName: 'Tony',
        userName: 'Love3000',
        email: 'ironman@gmail.com',
        phoneNumber: 9513482630,
        role: 'Scheduler',
        createdOn: '01/01/2023',
    },
    {
        id: 5,
        img: user_image,
        lastName: 'Targaryen',
        firstName: 'Daenerys',
        userName: 'MomDragon',
        email: 'dany@gmail.com',
        phoneNumber: 8234562497,
        role: 'Admin',
        createdOn: '01/01/2023',
    },
    {
        id: 6,
        img: user_image,
        lastName: 'Bond',
        firstName: 'James',
        userName: 'A007',
        email: 'bond@gmail.com',
        phoneNumber: 9233707890,
        role: 'Watcher',
        createdOn: '01/01/2023',
    },
];
