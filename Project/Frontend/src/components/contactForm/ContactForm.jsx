import React, { useEffect, useState } from 'react';
import './contactform.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";

const ContactForm = () => {
    let [contactFormData, setContactFormData] = useState({});
    let [loading, setLoading] = useState(true)
    let history = useHistory();

    let ContactDataFn = () => {
        axios.get('http://localhost:8000/contactform/viewAll').then(
            data => {
                console.log(data)
                setContactFormData(data.data)
                setLoading(false)
            }, 
            err => console.log(err)
        )
    }
    useEffect(() => {
         ContactDataFn();
        }, [])

    let handleDelete = (v) => {
        axios.post(`http://localhost:8000/contactform/delete/${v}`).then(
            data => {
                console.log(data)
                ContactDataFn()
            },
            err => {
                console.log(err)
            }
        )
    }
    let handleSubmit = (v) => {
        axios.post('http://localhost:8000/contactform/sendEmail', v).then(
            data => {
                console.log(data)
            },
            err => {
                console.log(err)
            }
        )
    }    

    return (
        <>
        <div className="contactFormContainer">
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr.No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            {/* <TableCell align="right"></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
            {
                (loading) ? (
                    ''
                ) : (
                     (contactFormData) ? (
                        contactFormData.map((v,i) => ( 
                   <TableRow
                     key={i}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                   >
                     <TableCell component="th" scope="row">
                       {i+1}
                     </TableCell>
                     <TableCell align="right">{v.firstName}</TableCell>
                     <TableCell align="right">{v.email}</TableCell>
                     <TableCell align="right">{v.phone}</TableCell>
                     <TableCell align="right"><button onClick={() => history.push(`/property/${v.propertyId}`)}>View Property</button></TableCell>
                     <TableCell align="right"><button onClick={() => handleSubmit(v)}>Send Email</button></TableCell>
                     <TableCell align="right"><button className="deleteButton" onClick={() => handleDelete(v._id)}>Delete</button></TableCell>
                     
                   </TableRow>
                  ))
                   ) : (
                       ''
                   )
                )
            }
        </TableBody>
      </Table>
    </TableContainer>
        </div>
        </>
    )
}

export default ContactForm;