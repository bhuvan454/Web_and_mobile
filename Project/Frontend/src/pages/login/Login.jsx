import './login.css';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../../redux/actions/loginAction';

export default function Login() {
    let history = useHistory();
    // let dispatch = useDispatch();
    let [formData, setFormData] = useState([])
    const handleClick = (arg) => {
        history.push(`/${arg}`)
    }
    const handleChange = (e) => {
        console.log(e.target.name, 'name')
        console.log(e.target.value, 'value')
        setFormData(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value
        }
        ))
    }
    const handleSubmit = () => {
        // dispatch(loginUser(formData))
        axios.post('http://localhost:8000/user/login', formData).then(
            response => {
                console.log(response, 'response in login')
                localStorage.setItem('token', response.data.token)
                setTimeout(() => {
                    history.push('/admin_dashboard')
                }, 1000)
            }
        )
    }
    return (
        <div className="login">
                <pan className="loginTitle">Login</pan>
            <div className="loginForm">
                <label>Email</label>
                <input className="loginInput" name="email" type="text" placeholder="Enter your email...." onChange={handleChange} />
                <label>Password</label>
                <input className="loginInput" name="password" type="password" placeholder="Enter your password...." onChange={handleChange} />
                <button className="loginButton" onClick={handleSubmit}>Submit</button>
            </div>
            {/* <button className="loginRegisterButton" onClick={() => handleClick('register')}>Register</button> */}
        </div>
    )
}