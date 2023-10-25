import React from 'react';
import './home.scss';
import Oil_Pipeline from '../../assets/images/oil_pipeline.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="home">
                <div className="home-container">
                    <h1 className="background-text">HPCL</h1>
                    <img
                        className="home-img"
                        src={Oil_Pipeline}
                        alt="oil_pipeline_image"
                    />
                    <div className="home-content">
                        <h1>Welcome to HPCL</h1>
                        <h4>Delivering Happiness, at every step...</h4>
                        <div className="action-buttons">
                            <Link to={'login'}>
                                <button className="login-btn">LOGIN</button>
                            </Link>

                            <Link to={'register'}>
                                <button className="register-btn">
                                    REGISTER
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
