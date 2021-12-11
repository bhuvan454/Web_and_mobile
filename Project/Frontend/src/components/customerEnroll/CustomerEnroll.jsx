import React, { useEffect, useState } from 'react';
import './customerEnroll.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const CustomerEnroll = () => {
    let history = useHistory();
    const [formData, setFormData] = useState({ propertyId: window.location.pathname.split('/')[2] });
    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value,'e')
        console.log(e.target.name, 'name')
        setFormData(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
        // console.log(formData, 'formData in change')
    }
    const handleSubmit = () => {
        console.log(formData, 'formData')
        // dispatch(registerUser(formData));
        axios.post('http://localhost:8000/customerEnroll/create', formData).then(
            data => {
                console.log(data, 'data in register')
                NotificationManager.success('User Enrolled successfully');
                setTimeout(() => {
                    history.push('/customerlogin')
                }, 2000)
            },
            err => {
                console.log(err)
            }
        )
    }
    return (
        <div className="customerEnroll">
            <NotificationContainer/>
                <pan className="customerEnrollTitle">Customer Enroll</pan>
            <div className="customerEnrollForm">
            <label>Name</label>
                <input className="customerEnrollInput" name="name" type="text" placeholder="Enter your name...." onChange={handleChange} />
                <label>Email</label>
                <input className="customerEnrollInput" name="email" type="text" placeholder="Enter your email...." onChange={handleChange}/>
                <label>Phone</label>
                <input className="customerEnrollInput" name="phone" type="text" placeholder="Enter your phone number...." onChange={handleChange}/>
                <label>Password</label>
                <input className="customerEnrollInput" name="password" type="password" placeholder="Enter your password...." onChange={handleChange} />
                <button className="customerEnrollButton" onClick={() => handleSubmit() }>Submit</button>
            </div>
            {/* <button className="registerLoginButton" onClick={() => handleClick('login')}>Login</button> */}
        </div>
    )
}

export default CustomerEnroll;