import React, { useState, useEffect } from 'react';
import './adminDashboard.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Properties from '../../components/properties/Properties';
import ContactForm from '../../components/contactForm/ContactForm';
import Customers from '../../components/customers/Customers';
import { useHistory } from "react-router-dom";

const AdminDashboard = () => {
    let [showAreaCreateForm, setShowAreaCreateForm] = useState(false)
    let [showAreaViewAll, setShowAreaViewAll] = useState(false)
    let [showAreaEditData, setShowAreaEditData] = useState(false)
    let [areaCreateFormData, setAreaCreateFormData] = useState({})
    let [areaViewAllData, setAreaViewAllData] = useState({})
    let [areaViewAllDataLoading, setAreaViewAllDataLoading] = useState(true)
    let [areaEditDataApi, setAreaEditDataApi] = useState({})
    let [showAreas, setShowAreas] = useState(false)
    let [showProperties, setShowProperties] = useState(false)
    let [showContactForm, setShowContactForm] = useState(false)
    let [showCustomers, setShowCustomers] = useState(false)
    let history = useHistory();

    let handleClick = (v, id) => {
        console.log(v, 'v')
        if (v === "AreaCreateForm") {
            setShowAreaCreateForm(true)
            setShowAreaViewAll(false)
            setShowAreaEditData(false)
        }
        if (v === "AreaEditData") {
            setShowAreaEditData(true)
            setShowAreaViewAll(false)
            GetAreaSpecificIdFn(id)
        }
    }

    let GetAreaSpecificIdFn = (id) => {
        let config = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get(`http://localhost:8000/area/specificArea/${id}`, config).then(
            data => {
                console.log(data, 'area specific data')
                setAreaEditDataApi(data.data)
            },
            err => console.log(err)
        )
    }

    let GetAreaViewAllDataFn = () => {
        let config = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.get('http://localhost:8000/area/viewAllData', config).then(
            data => {
                console.log(data, 'area view all data')
                setAreaViewAllData(data.data)
                setAreaViewAllDataLoading(false)
            }
        )
    }
    
    let handleCancel = (v) => {
        console.log(v, 'v')
        if (v === "AreaCreateFormCancel") {
            GetAreaViewAllDataFn()
            setShowAreaCreateForm(false)
            setShowAreaViewAll(true)
        }
        if (v === "areaEditDataCancel") {
            setShowAreaEditData(false)
            setShowAreaViewAll(true)
        }
    }

    let handleDelete = (v, id) => {

        if (v === "AreaEditData") {
            console.log('delete')
            let config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            axios.post(`http://localhost:8000/area/delete/${id}`, {}, config).then(
                data => {
                    console.log(data)
                    GetAreaViewAllDataFn()
                },
                err => console.log(err)
            )
        }
    }

    let handleChange = (v, e) => {
        if (v === "areaCreateFormChange") {
            setAreaCreateFormData(prevState => ({
                ...prevState,
                [e.target.name] : e.target.value
            }))
        }
        if (v === "AreaEditDataChange") {
            setAreaEditDataApi(prevState => ({
                ...prevState,
                [e.target.name] : e.target.value
            }))
        }
    }

    let handleSubmit = (v, id) => {
        if (v === "areaCreateFormSubmit") {
            console.log(areaCreateFormData,'area submit')
            let config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            axios.post('http://localhost:8000/area/create', areaCreateFormData, config).then(
                areaCreateFormData => {
                    console.log(areaCreateFormData, 'data in area create form')
                    setShowAreaViewAll(true)
                    setShowAreaCreateForm(false)
                    GetAreaViewAllDataFn()
                },
                err => console.log(err)
            )
        }
       if (v === "areaEditDataSubmit") {
        let config = {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        axios.post(`http://localhost:8000/area/updateAreaData/${id}`, areaEditDataApi, config).then(
            data => {
                console.log(data, 'after edit submit')
                setShowAreaViewAll(true)
                setShowAreaEditData(false)
                GetAreaViewAllDataFn()
            },
            err => {
                console.log(err)
            }
        )
       } 
    }

    useEffect(() => {
        GetAreaViewAllDataFn();
        setShowAreaViewAll(true)
    }, [])

    let handleComponents = (v) => {
        if (v === 'areas') {
            setShowAreas(true)
            setShowProperties(false)
            setShowContactForm(false)
            setShowCustomers(false)
        }
        if (v === 'properties') {
            setShowAreas(false)
            setShowProperties(true)
            setShowContactForm(false)
            setShowCustomers(false)
        }
        if (v === 'contactForm') {
            setShowContactForm(true)
            setShowProperties(false)
            setShowAreas(false)
            setShowCustomers(false)
        }
        if (v === 'customers') {
            setShowContactForm(false)
            setShowProperties(false)
            setShowAreas(false)
            setShowCustomers(true)
        }
    }

    let handleLogout = () => {
        localStorage.removeItem('token')
        history.push('/login')
    }


    return (
        <>
            <div className="adminDashboardContainer">
                <div className="leftContainer">
                    <div className="topHeading">Admin Dashboard</div>
                    <div className="selection" onClick={() => handleComponents('areas')}>Areas</div>
                    <div className="selection" onClick={() => handleComponents('properties')}>Properties</div>
                    <div className="selection" onClick={() => handleComponents('contactForm')}>Contact form</div>
                    <div className="selection" onClick={() => handleComponents('customers')}>Customers</div>
                    <div className="selection"><button onClick={handleLogout}>Logout</button></div>
                </div>
                <div className="rightContainer">
                    { (showAreas) ? (
                        <>
                            <button className="AreaCreateFormButton" onClick={() => handleClick('AreaCreateForm')}>Create</button>
                    { (showAreaCreateForm) ? (
                        <div className="AreaCreateForm">
                        <label>Name</label>
                        <input name="name" type="text" onChange={(e) => handleChange('areaCreateFormChange', e)} />
                        <button className="createFormsubmitButton" type="button" onClick={() => handleSubmit('areaCreateFormSubmit')}>Submit</button>
                        <button className="createFormcancelButton" type="button" onClick={() => handleCancel('AreaCreateFormCancel')}>Cancel</button>
                    </div>
                    ) : ''}
                    { (showAreaViewAll) ? (
                        <div className="AreaViewAll">
                        <TableContainer className="tableContainer" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="right">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            { (areaViewAllDataLoading) ? (
                ''
            ) : (
                (areaViewAllData) ? (
                    areaViewAllData.map((v,i) => (
                        <TableRow
                          key={i}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {i+1}
                          </TableCell>
                          <TableCell align="right">{v.name}</TableCell>
                          <TableCell align="right"><button type="button" className="AreaEditButton" onClick={() => handleClick('AreaEditData', v._id)}>edit</button></TableCell>
                          <TableCell align="right"><button type="button" className="AreaDeleteButton" onClick={() => handleDelete('AreaEditData', v._id)}>Delete</button></TableCell>
                          {/* <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                       ))
                ) : (
                    ''
                )
            )}
        </TableBody>
      </Table>
    </TableContainer>
                        </div>
                    ) : ''}
                    { (showAreaEditData) ? (

                        (areaEditDataApi) ? (
                            <div className="AreaEditData">
                        <p>edit data</p>
                        <label>Name</label>
                        <input name="name" type="text" onChange={(e) => handleChange('AreaEditDataChange', e)} value={areaEditDataApi.name} />
                        <button className="areaEditDatasubmitButton" type="button" onClick={() => handleSubmit('areaEditDataSubmit', areaEditDataApi._id)}>Submit</button>
                        <button className="areaEditDatacancelButton" type="button" onClick={() => handleCancel('areaEditDataCancel')}>Cancel</button>
                        {/* <button type="button" onClick={() => handleCancel('editData')}>Cancel</button> */}
                        </div>
                        ) : (
                            ''
                        )
                    ) : ''}
                        </>
                    ): (
                        ''
                    )}
                    { (showProperties) ? (
                        <Properties />
                    ) : (
                        ''
                    )}
                    { (showContactForm) ? (
                        <ContactForm />
                    ) : (
                        ''
                    )}
                    { (showCustomers) ? (
                        <Customers />
                    ) : (
                        ''
                    )}
                    
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;