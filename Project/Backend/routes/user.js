const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.post('/create', (req,res) => {
    // console.log(req.body, 'body')
    // return false
    let userData = req.body;
    let user = new User(userData)
    user.save((error, data) => {
        if (error) {
            console.log(error)
        } else {
            console.log(data, 'data after response')
            // res.send(data)
            let payload = { subject: data._id.toString() }
            console.log(payload, 'payload')
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token:token, userData: data})
        }
    })
})

router.post('/login', (req, res) => {
    console.log(req.body, 'req body')
    let userData = req.body;

    User.findOne({ email: req.body.email}, (err, user) => {
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


module.exports = router;