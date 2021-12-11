import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './customerDashboard.css';
import { useHistory } from "react-router-dom";

const CustomerDashboard = () => {
    let [userData, setUserData] = useState({});
    let [loading, setLoading] = useState(true);
    let history = useHistory();

    useEffect(() => {
        let config = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.post(`http://localhost:8000/customerEnroll/specificCustomer`, {}, config).then(
            data => {
                console.log(data, 'after submit')
                setUserData(data.data)
                setLoading(false)
            },
            err => {
                console.log(err)
            }
        )
    }, [])

    let handleClick = () => {
        localStorage.removeItem('token')
        history.push('/customerlogin')
    }
    return (
        <>
            <div className="customerDashboardContainer">
                <div className="containerbox">
                    { (loading) ? (
                        ''
                    ) : (
                        (userData) ? (
                            <>
                            <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Phone: {userData.phone}</p>
                    <p><button onClick={() => history.push(`/property/${userData.propertyId}`)}>View Property</button></p>
                    <p><button className="logoutButton" onClick={handleClick}>Logout</button></p>
                    </>
                        ) : (
                            ''
                        )
                    )}
                </div>
            </div>
        </>
    )
}

export default CustomerDashboard;