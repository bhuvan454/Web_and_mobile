const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Area = require('../models/areaModel');
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

router.post('/create', verifyToken, (req, res) => {
    console.log('create property')
    Property.insertMany(req.body, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            if (!data) {
                console.log('no data')
            } else {
                if (data) {
                    res.send(data)
                }
            }
        }
    })
})

router.get('/viewAllProperties', verifyToken, (req, res) => {
    Property.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (!data) {
                console.log('no data found')
            } else {
                if (data) {
                    res.send(data)
                }
            }
        }
    })
})

router.post('/getSpecificProperty/:id', (req, res) => {
    console.log('in specific')
    Property.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            if (!data) {
                console.log('no data')
            } else {
                if (data) {
                    res.send(data)
                }
            }
        }
    })
})

router.post('/updateProperty', (req, res) => {
    Property.findOneAndUpdate({ _id: req.body._id }, req.body, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            if (!data) {
                console.log('no data')
            } else {
                if (data) {
                    res.send(data)
                }
            }
        }
    })
})

router.post('/delete/:id', (req, res) => {
    Property.findOneAndDelete({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            if (!data) {
                console.log('no data')
            } else {
                if (data) {
                    res.send(data)
                }
            }
        }
    })
})

router.post('/findFilteredProperties', (req, res) => {
    console.log(req.body)
    Property.find({}, (err, allData) => {
        if (err) {
            res.send(err)
        } else {
            if (!allData) {
                console.log('no data')
            } else {
                if (allData) {
                    console.log(allData)
                    let dateFilteredData = [];
                    allData.forEach((v,i) => {
                        let reqDate = req.body.date;
                        console.log(req.body)
                        let reqDateDay = req.body.date.split('-')[2].split('T')[0];
                        let reqDateMonth = req.body.date.split('-')[1];
                        let reqDateYear = req.body.date.split('-')[0];
                        let vDateDay = v.date.split('-')[2].split('T')[0];
                        let vDateMonth = v.date.split('-')[1];
                        let vDateYear = v.date.split('-')[0];
                        // console.log(reqDateDay, 'req day')
                        // console.log(reqDateMonth, 'req month')
                        // console.log(reqDateYear, 'req year')
                        // console.log(vDateDay, 'v day')
                        // console.log(vDateMonth, 'v Month')
                        // console.log(vDateYear, 'v year')
                        if (reqDateYear >= vDateYear) {
                            // console.log('req year greater than or equal to')
                            if (reqDateMonth >= vDateMonth) {
                                // console.log('req month greater than or equal to')
                                if (reqDateDay >= vDateDay) {
                                    // console.log('req day greater than or equal to')
                                    dateFilteredData.push(v)
                                } else {
                                    // console.log('req month only greater')
                                    dateFilteredData.push(v)
                                }
                            }
                        } else {
                            console.log('false')
                        }

                    })
                    let reqPrice = req.body.price;
                    let priceFilteredData = [];
                    // console.log(dateFilteredData, 'datefiltereddata')
                    dateFilteredData.forEach((v,i) => {
                        console.log(req.body.price)
                        if (reqPrice >= Number(v.price)) {
                            priceFilteredData.push(v)
                            // console.log('reqprice less than or equal to v')
                        } else {
                            // priceFilteredData.push(v)
                            console.log(reqPrice, v.price,'reqPrice lesser than v')
                        }
                    })
                    console.log(priceFilteredData, 'priceFilteredData')
                    let reqBedrooms = req.body.bedrooms;
                    let bedroomsFilteredData = [];
                    priceFilteredData.forEach((v, i) => {
                        if (Number(reqBedrooms) === Number(v.bedrooms)) {
                            bedroomsFilteredData.push(v)
                            console.log(v, 'samebedrooms')
                        } else {
                            console.log('bedrooms didnt match')
                        }
                    })
                    let reqStreet = req.body.street;
                    let streetFilteredData = [];
                    bedroomsFilteredData.forEach((v, i) => {
                        if (reqStreet == v.street) {
                            streetFilteredData.push(v)
                            console.log(v, 'street matched')
                        } else {
                            console.log('street didnt match')
                        }
                    })
                    res.send(bedroomsFilteredData)
                }
            }
        }
    })
})

module.exports = router;