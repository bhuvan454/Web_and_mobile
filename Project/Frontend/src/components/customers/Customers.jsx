import React, { useEffect, useState } from 'react';
import './customers.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";

const Customers = () => {
    let [customerEnrollData, setCustomerEnrollData] = useState({});
    let [loading, setLoading] = useState(true)
    let history = useHistory();

    let CustomersDataFn = () => {
        axios.get('http://localhost:8000/customerEnroll/viewAll').then(
            data => {
                console.log(data)
                setCustomerEnrollData(data.data)
                setLoading(false)
            }, 
            err => console.log(err)
        )
    }
    useEffect(() => {
         CustomersDataFn();
        }, [])

    let handleDelete = (v) => {
        axios.post(`http://localhost:8000/customerEnroll/delete/${v}`).then(
            data => {
                console.log(data)
                CustomersDataFn()
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
                     (customerEnrollData) ? (
                        customerEnrollData.map((v,i) => ( 
                   <TableRow
                     key={i}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                   >
                     <TableCell component="th" scope="row">
                       {i+1}
                     </TableCell>
                     <TableCell align="right">{v.name}</TableCell>
                     <TableCell align="right">{v.email}</TableCell>
                     <TableCell align="right">{v.phone}</TableCell>
                     <TableCell align="right"><button onClick={() => history.push(`/property/${v.propertyId}`)}>View Property</button></TableCell>
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

export default Customers;