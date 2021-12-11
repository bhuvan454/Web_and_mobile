import React, { useEffect, useState } from 'react';
import TopBar from '../../components/topbar/TopBar';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './property.css';
import image1 from '../../images/room1.jpg';
import Footer from '../../components/footer/Footer';
import axios from 'axios';

const Property = () => {
    let [propertyData, setPropertyData] = useState({})
    let [loading, setLoading] = useState(true)
    let [contactFormData, setContactFormData] = useState({propertyId: window.location.pathname.split('/')[2]})

    useEffect(() => {
        console.log(window.location.pathname.split('/')[2])
        let propertyId = window.location.pathname.split('/')[2];
        axios.post(`http://localhost:8000/property/getSpecificProperty/${propertyId}`).then(
            data => {
                setPropertyData(data.data)
                console.log(data.data)
                setLoading(false)
            }
        )
    }, [])

    let handleChange = (e) => {
        setContactFormData(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    let handleSubmit = () => {
        axios.post('http://localhost:8000/contactform/create', contactFormData).then(
            data => {
                console.log(data)
                NotificationManager.success('Form submitted successfully');
            },
            err => console.log(err)
        )
    }
    return (
        <>
            <TopBar />
            <div className="propertyContainer">
            <NotificationContainer/>
                    <div className="aboutProperty">
                        {
                            (loading) ? (
                                ''
                            ) : (
                                (propertyData) ? (
                                    <>
                                    <p>Name: {propertyData.name}</p>
                                    <p>Price: {propertyData.price}</p>
                                    <p>Property Area: {propertyData.propertyArea}</p>
                                    <p>Area Status: {propertyData.areaStatus}</p>
                                    <p>Bedrooms: {propertyData.bedrooms}</p>
                                    <p>Occupied: {(propertyData.occupied == "true") ? 'Yes occupied' : 'Not occupied'}</p>
                                    </>    
                                ) : (
                                    ''
                                )
                            )
                        }
                        <h2>About Community</h2>
                        <p>1/2 month FREE on studios. 1 month FREE on select one bedrooms & all two bedrooms. Lease must start on or before December 1st, 2021. Terms apply. Nestled in the urban KC neighborhood of Hyde Park on Armour Blvd, 520 East embodies the modern apartment community with plenty of space to relax, work, learn, or play. This 7-story brick apartment was constructed in 2021 and features a top-floor indoor/outdoor pool lounge that will elevate the living experience and entice residents to never leave home. Speaking of home, each resident will enjoy a washer and dryer, smart entry locks, sleek two-toned cabinets, wood-style flooring, LED lighting, an icemaker, and no-fee access to a smart package collection room, a state-of-the-art fitness center, study rooms, and bike storage. If residents feel the need to venture, the surrounding area of Midtown has plenty to offer with a wide variety local restaurants, parks, and shopping. Some of the best Kansas City has to offer! 520 East is just a 5-minute drive or short bike ride to downtown Kansas City, The Plaza, and Westport. Now Renting!</p>
                        <h4>Building Amenities</h4>
                        <div className="amenities">
                        <ul>
                            <li>Bike Storage</li>
                            <li>Fitness Center</li>
                            <li>Package Service</li>
                            <li>Pets Allowed</li>
                            <li>Rooftop Deck</li>
                        </ul>
                        <ul>
                            <li>Business Center</li>
                            <li>Outdoor Grill</li>
                            <li>Parking Available</li>
                            <li>Swimming Pool</li>
                            <li>Smoke Free</li>
                        </ul>
                        </div>
                    </div>
                    <div className="contactproperty">
                    <img src={image1} className="propertyContainerPropertyImage" />
                        <h2>Message our leasing office</h2>
                        <input type="text" name="firstName" placeholder="First Name*" onChange={handleChange} />
                        <input type="text" name="lastName" placeholder="Last Name*" onChange={handleChange} />
                        <input type="text" name="email" placeholder="Email*" onChange={handleChange} />
                        <input type="text" name="phone" placeholder="Phone(optional)" onChange={handleChange} />
                        <textarea type="text" name="message" placeholder="What can we help you with?" onChange={handleChange} />
                        <button type="button" onClick={handleSubmit}>Send Message</button>
                    </div>
            </div>
            <Footer />
        </>
    )
}

export default Property;