import React, { useState } from 'react';
import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import NO_IMG from '../../assets/images/no-image.png';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const New = ({ inputs, title }) => {
    // State to store input field values
    const [formData, setFormData] = useState({
        username: '',
        email_address: '',
        login_pwd: '',
        phone_number: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                'http://localhost:5005/auth/register/new',
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );
            const parseRes = await response.json();
            console.log(parseRes);

            // Clear the form or perform any other necessary actions
            setFormData({
                username: '',
                email_address: '',
                login_pwd: '',
                phone_number: '',
            });
        } catch (err) {
            console.error(err.message);
        }
    };

    // Update the state when input fields change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };
    return (
        <>
            <div className="new">
                <Sidebar />
                <div className="new-container">
                    <Navbar />
                    <div className="top">
                        <div className="title">{title}</div>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <img src={NO_IMG} alt="noImage" />
                        </div>
                        <div className="right">
                            <form onSubmit={handleSubmit}>
                                <div className="form-input">
                                    <label htmlFor="file" className="add-img">
                                        Add Image
                                        <AddPhotoAlternateIcon className="icon" />
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                {inputs.map((input) => (
                                    <div className="form-input" key={input.id}>
                                        <label htmlFor={input.placeholder}>
                                            {input.label}
                                        </label>
                                        <input
                                            type={input.type}
                                            id={input.id_name}
                                            placeholder={input.placeholder}
                                            value={formData[input.id_name]}
                                            onChange={handleInputChange}
                                            autoComplete={input.autocomplete}
                                        />
                                    </div>
                                ))}

                                <button>Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default New;
