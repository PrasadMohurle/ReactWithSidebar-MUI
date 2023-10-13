import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.scss';
import HPCL_LOGO from '../../assets/images/Hindustan-Petroleum.png';
import { sidebarData } from '../../assets/data/sidebarData';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const Sidebar = ({setAuth}) => {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    // Function to toggle isSubmenuOpen
    const toggleSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };

    const navigate = useNavigate();

  const logout = (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      setAuth(false);
      navigate('/login');
  };

    return (
        <>
            <div className="sidebar">
                <div className="sidebar-header">
                    <div className="company-logo">
                        <img src={HPCL_LOGO} alt="company logo" />
                        <h4>HPCL</h4>
                    </div>
                </div>
                <div className="sidebar-main">
                    <ul>
                        {sidebarData.map((section, index) => (
                            <React.Fragment key={index}>
                                <p className="title">{section.title}</p>
                                {section.items.map((item, itemIndex) => (
                                    <React.Fragment key={itemIndex}>
                                        <Link
                                            to={item.link || '#'}
                                            className={`nav-link ${ item.text === 'Logout' ? 'logout-btn': ''}`}
                                            onClick={item.text === 'Logout' ? logout : undefined}
                                        >
                                            <div className="icon">
                                                {item.icon}
                                            </div>
                                            <span>{item.text}</span>
                                            <div className="dropdown-icon">
                                                {item.subItems ? (isSubmenuOpen ? <ArrowDropUpIcon onClick={toggleSubmenu}/> : <ArrowDropDownIcon onClick={toggleSubmenu}/>) : null}
                                            </div>
                                        </Link>
                                        {item.subItems &&
                                            item.subItems.length > 0 && (
                                                isSubmenuOpen && (
                                                <ul className="submenu">
                                                    {item.subItems.map( (subItem, subItemIndex) => (
                                                            <Link
                                                                to={subItem.link || '#'}
                                                                className="nav-link sub-menu"
                                                                key={subItemIndex}
                                                            >
                                                                <span>
                                                                    {subItem.text}
                                                                </span>
                                                            </Link>
                                                        )
                                                    )}
                                                </ul>
                                                )
                                            )}
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ))}
                    </ul>

                    
                </div>
            </div>
        </>
    );
};

export default Sidebar;
