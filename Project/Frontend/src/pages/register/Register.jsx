import './register.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
// import { registerUser } from '../../redux/actions/registerAction';
// import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import axios from 'axios';

export default function Register() {
    let history = useHistory();
    // const dispatch = useDispatch()
    const [formData, setFormData] = useState([]);
    // const counter = useSelector((state) => console.log(state))
    const handleClick = (arg) => {
        history.push(`/${arg}`)
    }
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
        axios.post('http://localhost:8000/user/create', formData).then(
            data => {
                console.log(data, 'data in register')
                NotificationManager.success('Registered successfully');
                setTimeout(() => {
                    history.push('/login')
                }, 2000)
            },
            err => {
                console.log(err)
            }
        )
    }

    useEffect(() => {
        // console.log(counter, 'useEffect')
    }, [])
    return (
        <div className="register">
                <pan className="registerTitle">Register</pan>
            <div className="registerForm">
            <label>Username</label>
                <input className="registerInput" name="username" type="text" placeholder="Enter your username...." onChange={handleChange} />
                <label>Email</label>
                <input className="registerInput" name="email" type="text" placeholder="Enter your email...." onChange={handleChange}/>
                <label>Password</label>
                <input className="registerInput" name="password" type="password" placeholder="Enter your password...." onChange={handleChange} />
                <button className="registerButton" onClick={() => handleSubmit() }>Submit</button>
            </div>
            {/* <button className="registerLoginButton" onClick={() => handleClick('login')}>Login</button> */}
            <NotificationContainer/>
        </div>
    )
}