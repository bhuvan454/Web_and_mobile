import React, { useEffect, useState } from 'react';
import HomeSearch from '../../components/homeSearch/HomeSearch';
import TopBar from '../../components/topbar/TopBar';
import './propertysearch.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import image1 from '../../images/room1.jpg';
import Footer from '../../components/footer/Footer';
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios';

const PropertySearch = () => {
    const [startDate, setStartDate] = useState(new Date());
    let location = useLocation();
    let history = useHistory();
    let [searchedData, setSearchedData] = useState({});
    let [loading, setLoading] = useState(true)
    const [areaStreetData, setAreaStreetData] = useState({})
    const [loadingArea, setLoadingArea] = useState(true)
    const [homeSearchData, setHomeSearchData] = useState({ date: new Date()})

    let GetAreaAllDataFn = () => {
        let config = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('http://localhost:8000/area/viewAllData', config).then(
            data => {
                console.log(data, 'area view all data')
                setAreaStreetData(data.data)
                setLoadingArea(false)
            }
        )
    }

    useEffect(() => {
        console.log(location.state, 'location state')
        setSearchedData(location.state)
        setLoading(false)
        GetAreaAllDataFn();
    }, [])

    let handlesubmit = () => {
        console.log(homeSearchData)
        axios.post('http://localhost:8000/property/findFilteredProperties', homeSearchData).then(
            data => {
                console.log(data)
                setSearchedData(data.data)
                // history.push('/propertysearch', data.data)
            },
            err => console.log(err)
        )
    }

    let handleChange = (v, e) => {
        // setAreaStreetData(prevState => ({
        //     ...prevState,
        //     [e.target.name] : e.target.value
        // }))
        console.log(e)
        // console.log(e)
        if (v === "homesearch") {
                setHomeSearchData(prevState => ({
                    ...prevState,
                    [e.target.name] : e.target.value
                }))
        }
        if (v === "date") {
            setHomeSearchData(prevState => ({
                ...prevState,
                date : e
            }))
        }
        console.log(homeSearchData)
    }

    return (
        <>
        <TopBar />
        <div className="searchContainerPropertySearch">
        { (loadingArea) ? (
                    ''
                ) : (
                    (areaStreetData) ? (
                        <select name="street" onChange={(e) => handleChange('homesearch', e)} type="text">
                       { areaStreetData.map((v,i) => {
                              return <option key={i} value={v.name}>{v.name}</option>
                        }) }
                         </select>  
                    ) : (
                        ''
                    )
                )}
                <select name="bedrooms" type="text" onChange={(e) => handleChange('homesearch', e)}>
                    <option value="--">Bedrooms</option>
                    <option value="0">Studio</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                </select>
                <select name="price" type="text" onChange={(e) => handleChange('homesearch', e)}>
                    <option value="--">Price</option>
                    <option value="600">Less than $600</option>
                    <option value="1200">Less than $1200</option>
                    <option value="2000">Less than $2000</option>
                    <option value="3000">Less than $3000</option>
                </select>
                <div>
                <DatePicker name="date" className="datepicker" selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <button type="button" className="submitButton" onClick={handlesubmit}>Submit</button>
        </div>
        <div className="searchedResultsContainer">
            { (loading) ? (
                ''
            ) : (
                (searchedData) ? (
                    searchedData.map((v, i) => {
                      return  <div className="singleresultContent">
                    <img className="searchedResultsImage" src={image1} onClick={() => history.push(`/property/${v._id}`)} />
                    <h4 className="searchedResultsTitle">{v.name}</h4>
                    <p className="searchedResultsPrice">$ {v.price}</p>
                    <p className="searchedResultsSft">{v.propertyArea} sqft</p>
                    <p className="areaStatusLabel">{v.areaStatus}</p>
                    <p className="searchedResultsSft">Occupied: {(v.occupied == "true") ? 'Yes occupied' : 'Not occupied'}</p>
                </div>
                    })
                ) : (
                    <h4>No Data Found</h4>
                )
            )
                }
        </div>
        {/* <Footer /> */}
        </>
    )
}

export default PropertySearch;