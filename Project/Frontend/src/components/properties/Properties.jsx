import React, { useEffect, useState } from 'react';
import './properties.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const Properties = () => {
    let [showPropertiesViewAllData, setShowPropertiesViewAllData] = useState(false)
    let [showPropertiesAddProperty, setShowPropertiesAddProperty] = useState(false)
    let [showPropertiesEditProperty, setShowPropertiesEditProperty] = useState(false)
    let [addpropertyData, setAddpropertyData] = useState({ date: new Date(), occupied: 'false'})
    let [streetData, setStreetData] = useState({})
    let [allPropertiesData, setAllPropertiesData] = useState({})
    let [editPropertyData, setEditPropertyData] = useState({})

    let handleClick = (v, id) => {
        if (v === "addPropertyButton") {
            setShowPropertiesAddProperty(true)
            setShowPropertiesViewAllData(false)
        }
        if (v === "propertiesEditButton") {
            setShowPropertiesEditProperty(true)
            setShowPropertiesViewAllData(false)
            GetSpecificPropertyFn(id)
        }
        if (v === "propertiesDeleteButton") {
            axios.post(`http://localhost:8000/property/delete/${id}`, {}).then(
                data => {
                    console.log(data, 'data after delete')
                    GetAllPropertiesFn()
                },
                err => console.log(err)
            )
        }
    }

    let handleCancel = (v) => {
        if (v === "propertiesAddPropertyCancelButton") {
            setShowPropertiesAddProperty(false)
            setShowPropertiesViewAllData(true)
        }
        if (v === "propertiesEditPropertyCancelButton") {
            setShowPropertiesEditProperty(false)
            setShowPropertiesViewAllData(true)
        }
    }

    let handleChange = (v, e) => {
        if (v === "addProperty") {
            setAddpropertyData(prevState => ({
                ...prevState,
                [e.target.name] : e.target.value
            }))
        }
        if (v === "date") {
            setAddpropertyData(prevState => ({
                ...prevState,
                date : e
            }))
        }
        if (v === "EditProperty") {
            setEditPropertyData(prevState => ({
                ...prevState,
                [e.target.name] : e.target.value
            }))
        }
    }

    let handleSubmit = (v) => {
        if (v === "propertiesAddPropertySubmitButton") {
            console.log(addpropertyData, 'add property data')
            let config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            axios.post('http://localhost:8000/property/create', addpropertyData , config).then(
            data => {
                console.log(data, 'property data')
                GetAllPropertiesFn()
                setShowPropertiesViewAllData(true)
                setShowPropertiesAddProperty(false)
            }
        )
        }
        if (v === "propertiesEditPropertySubmitButton") {
            let config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            axios.post('http://localhost:8000/property/updateProperty', editPropertyData, config).then(
                data => {
                    console.log(data, ' edit property data')
                    GetAllPropertiesFn()
                    setShowPropertiesViewAllData(true)
                    setShowPropertiesEditProperty(false)
                }
            )
        }
    }

    let GetAreaAllDataFn = () => {
        let config = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('http://localhost:8000/area/viewAllData', config).then(
            data => {
                console.log(data, 'area view all data')
                setStreetData(data.data)
            }
        )
    }

    let GetAllPropertiesFn = () => {
        let config = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('http://localhost:8000/property/viewAllProperties', config).then(
            data => {
                console.log(data, 'property view all data')
                setAllPropertiesData(data.data)
            }
        )
    }

    let GetSpecificPropertyFn = (id) => {
        let config = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.post(`http://localhost:8000/property/getSpecificProperty/${id}`, {} ,config).then(
            data => {
                console.log(data, 'specific property data')
                setEditPropertyData(data.data)
            }
        )
    }

    useEffect(() => {
        GetAreaAllDataFn()
        GetAllPropertiesFn()
        setTimeout(() => {
            setShowPropertiesViewAllData(true)
        }, 1000)
        
    }, [])

    return (
        <>
            <div className="propertiesContainer">
                <button className="addPropertyButton" onClick={() => handleClick('addPropertyButton')} type="button">Add Property</button>
                { (showPropertiesViewAllData) ? (
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>S.no</TableCell>
                          <TableCell align="right">Name</TableCell>
                          <TableCell align="right">Price</TableCell>
                        </TableRow>
                      </TableHead>
                      { (allPropertiesData) ? (
                          <TableBody>
                          {allPropertiesData.map((row, i) => (
                            <TableRow
                              key={row.name}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {i+1}
                              </TableCell>
                              <TableCell align="right">{row.name}</TableCell>
                              <TableCell align="right">{row.price}</TableCell>
                              <TableCell align="right" onClick={() => handleClick('propertiesEditButton', row._id)}><button className="propertiesEditButton">Edit</button></TableCell>
                              <TableCell align="right"><button className="propertiesDeleteButton" onClick={() => handleClick('propertiesDeleteButton', row._id)}>Delete</button></TableCell>
                              {/* <TableCell align="right">{row.protein}</TableCell> */}
                            </TableRow>
                          ))}
                        </TableBody>
                      ) : (
                          ''
                      )}
                      
                    </Table>
                  </TableContainer>
                ) : (
                    ''
                )}
                { (showPropertiesAddProperty) ? (
                    <div className="propertiesAddPropertyContainer">
                    <label>Name</label>
                    <input type="text" name="name" onChange={(e) => handleChange('addProperty', e)} placeholder="Enter name" />
                    <label>Price</label>
                    <input type="text" name="price" onChange={(e) => handleChange('addProperty', e)} placeholder="Enter Price" />
                    <label>Area of the property(sqft)</label>
                    <input type="text" name="propertyArea" onChange={(e) => handleChange('addProperty', e)} placeholder="Enter area of the property" />
                    { (streetData) ? (
                        
                         <select className="propertiesSelectOne" name="street" onChange={(e) => handleChange('addProperty', e)} type="text">
                       { streetData.map((v,i) => {
                              return <option value={v.name}>{v.name}</option>
                        }) }
                         </select>    
                    ) : (
                        ''
                    )}
                    {/* {console.log(streetData, 'streetdata')} */}
                    {/* <select className="propertiesSelectOne" name="street" onChange={(e) => handleChange('addProperty', e)} type="text">
                    <option value="--">Street</option>
                    <option value="chicago">21st jump street</option>
                    <option value="kansascity">22nd jump street</option>
                    <option value="stlousis">23rd jump street</option>
                </select> */}
                <select className="propertiesSelectTwo" name="bedrooms" onChange={(e) => handleChange('addProperty', e)} type="text">
                    <option value="--">Bedrooms</option>
                    <option value="0">Studio</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                </select>
                <select className="propertiesSelectTwo" name="areaStatus" onChange={(e) => handleChange('addProperty', e)} type="text">
                    <option value="--">Area Status</option>
                    <option value="safe">Safe</option>
                    <option value="studentfriendly">Student Friendly</option>
                    <option value="notsafe">Not safe</option>
                </select>
                <DatePicker name="date" className="datepickerr" selected={addpropertyData.date} onChange={(e) => handleChange('date', e)} />
                <div>
                <button type="button" onClick={() => handleSubmit('propertiesAddPropertySubmitButton')}>Submit</button>
                <button type="button" onClick={() => handleCancel('propertiesAddPropertyCancelButton')}>Cancel</button>
                </div>
                </div>
                ) : (
                    ''
                )}
                { (showPropertiesEditProperty) ? (
                    <div className="propertiesEditPropertyContainer">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Enter name" onChange={(e) => handleChange('EditProperty', e)} value={editPropertyData.name} />
                    <label>Price</label>
                    <input type="text" name="price" placeholder="Enter Price" onChange={(e) => handleChange('EditProperty', e)} value={editPropertyData.price} />
                    <label>Area of the property(sqft)</label>
                    <input type="text" name="propertyArea" placeholder="Enter area of the property" onChange={(e) => handleChange('EditProperty', e)} value={editPropertyData.propertyArea}/>
                    { (streetData) ? (
                        
                        <select className="propertiesSelectOne" name="street" onChange={(e) => handleChange('EditProperty', e)} value={editPropertyData.street} type="text">
                      { streetData.map((v,i) => {
                             return <option value={v.name}>{v.name}</option>
                       }) }
                        </select>    
                   ) : (
                       ''
                   )}
                <select className="propertiesSelectTwo" name="bedrooms" type="text" onChange={(e) => handleChange('EditProperty', e)} value={editPropertyData.bedrooms}>
                    <option value="--">Bedrooms</option>
                    <option value="0">Studio</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                </select>
                <select className="propertiesSelectTwo" name="areaStatus" onChange={(e) => handleChange('EditProperty', e)} value={editPropertyData.areaStatus} type="text">
                    <option value="--">Area Status</option>
                    <option value="safe">Safe</option>
                    <option value="studentfriendly">Student Friendly</option>
                    <option value="notsafe">Not safe</option>
                </select>
                <p className="datepickerr">Date: {editPropertyData.date}</p>
                <div>
                <button type="button" onClick={() => handleSubmit('propertiesEditPropertySubmitButton')} >Submit</button>
                <button type="button" onClick={() => handleCancel('propertiesEditPropertyCancelButton')}>Cancel</button>
                </div>
                </div>
                ) : (
                    ''
                )}
            </div>
        </>
    )
}

export default Properties;