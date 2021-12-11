const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Area = require('../models/areaModel');
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

router.post('/create', verifyToken, (req, res) => {
    Area.insertMany(req.body, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            // console.log(data)
            res.send(data)
        }
    })
})

router.get('/viewAllData', verifyToken, (req, res) => {
    Area.find({}, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

router.get('/specificArea/:id', verifyToken, (req, res) => {
    Area.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

router.post('/updateAreaData/:id', verifyToken, (req, res) => {
    Area.findOneAndUpdate({ _id: req.params.id }, req.body, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

router.post('/delete/:id', verifyToken, (req, res) => {
    Area.findOneAndDelete({ _id: req.params.id}, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

module.exports = router;