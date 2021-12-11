import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import './homesearch.css';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const HomeSearch = () => {
    // const [value, onChange] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [areaStreetData, setAreaStreetData] = useState({})
    const [loadingArea, setLoadingArea] = useState(true)
    const [homeSearchData, setHomeSearchData] = useState({ date: new Date()})
    const history = useHistory();

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

    let handlesubmit = () => {
        console.log(homeSearchData)
        axios.post('http://localhost:8000/property/findFilteredProperties', homeSearchData).then(
            data => {
                console.log(data)
                history.push('/propertysearch', data.data)
            },
            err => console.log(err)
        )
    }

    useEffect(() => {
        GetAreaAllDataFn();
    }, [])

    return (
        <div className="homeSearchContainer">
            {/* {console.log(areaStreetData, 'areaStreetData')} */}
            <div className="homeSearchInsideBox">
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
                <DatePicker name="date" className="datepickerr" selected={homeSearchData.date} onChange={(e) => handleChange('date', e)} />
                </div>
                <button type="button" className="submitButtonHome" onClick={handlesubmit}>Submit</button>
            </div>
        </div>
    )
}

export default HomeSearch;