const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Area = require('../models/areaModel');
const Contactform = require('../models/contactFormModel');
const CustomerEnroll = require('../models/customerEnrollModel');
const Property = require('../models/propertyModel');
const User = require('../models/userModel');

function verifyToken(req, res, next) {
    console.log(req.headers.authorization)
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject;
    next()
 }

router.post('/create', (req, res) => {
    console.log(req.body)
    CustomerEnroll.insertMany(req.body, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data) {
                Property.findOneAndUpdate({ _id: req.body.propertyId }, { $set: { occupied: 'true'}}, (err, dataupdate) => {
                    if (err) {
                        console.log(err)
                     } else {
                         if (dataupdate) {
                             res.send(dataupdate)
                         }
                     }
                })
            }
        }
    })
})

router.get('/viewAll', (req, res) => {
    CustomerEnroll.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data) {
                res.send(data)
            }
        }
    })
})

router.post('/delete/:id', (req, res) => {
    CustomerEnroll.findOneAndDelete({ _id: req.params.id }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data) {
                res.send(data)
            }
        }
    })
})

router.post('/login', (req, res) => {
    console.log(req.body, 'req body')
    let userData = req.body;

    CustomerEnroll.findOne({ email: req.body.email}, (err, user) => {
        if(err) {
            console.log(err);
        } else {
            if(!user) {
                res.status(401).send('Invalid email')
            } else {
                if(user.password !== userData.password) {
                    res.status(401).send('Invalid Password')
                } else {
                    let payload = { subject: user._id}
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token: token, userData: user})
                }
            }
        }
    })
})

router.post('/specificCustomer', verifyToken ,(req, res) => {
    CustomerEnroll.findOne({ _id: req.userId }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data) {
                res.send(data)
            }
        }
    })
})

module.exports = router;