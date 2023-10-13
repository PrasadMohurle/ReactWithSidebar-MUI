import React from 'react';
import './navbar.scss';
import Avatar from '../../assets/images/person1.jpg';

// list of icons
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';

const Navbar = () => {
    
    // Fetch data from local storage
    const storedUserName = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');

    return (
        <>
            <div className="navbar">
                <div className="wrapper">
                    <div className="search">
                        <input type="text" placeholder='Search...'/>
                        <SearchRoundedIcon className='icon'/>
                    </div>
                    <div className="items">
                        <div className="item">
                            <WbSunnyRoundedIcon className='icon'/>
                        </div>
                        <div className="item">
                            <NotificationsRoundedIcon className='icon'/>
                            <div className="counter">1</div>
                        </div>
                        <div className="item">
                            <MessageRoundedIcon className='icon'/>
                            <div className="counter">2</div>
                        </div>
                        <div className="item">
                            <SettingsRoundedIcon className='icon'/>
                        </div>
                        <div className="item">
                            <img src={Avatar} alt="user_image" className='avatar'/>
                        </div>
                        <div className="item">
                            <h5>{storedUserName}</h5>
                            <p>{storedEmail}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
