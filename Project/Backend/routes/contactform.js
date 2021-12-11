const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Area = require('../models/areaModel');
const Contactform = require('../models/contactFormModel');
const Property = require('../models/propertyModel');
const User = require('../models/userModel');


router.post('/create', (req, res) => {
    console.log(req.body)
    Contactform.insertMany(req.body, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data) {
                res.send(data)
            }
        }
    })
})

router.get('/viewAll', (req, res) => {
    Contactform.find({}, (err, data) => {
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
    Contactform.findOneAndDelete({ _id: req.params.id }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data) {
                res.send(data)
            }
        }
    })
})

router.post('/sendEmail', (req, res) => {
    console.log(req.body)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'webdevumkc@gmail.com',
          pass: 'webdevumkc2021'
        }
      });
      
    var emailBody = `<body style="background-color:grey">
    <table align="center" border="0" cellpadding="0" cellspacing="0"
           width="550" bgcolor="white" style="border:2px solid black">
        <tbody>
            <tr>
                <td align="center">
                    <table align="center" border="0" cellpadding="0" 
                           cellspacing="0" class="col-550" width="550">
                        <tbody>
                            <tr>
                                <td align="center" style="background-color: #4cb96b;
                                           height: 50px;">
  
                                    <a href="#" style="text-decoration: none;">
                                        <p style="color:white;
                                                  font-weight:bold;">
                                            Thank you for contacting us
                                        </p>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr style="height: 300px;">
                <td align="center" style="border: none;
                           border-bottom: 2px solid #4cb96b; 
                           padding-right: 20px;padding-left:20px">
  
                    <p style="font-weight: bolder;font-size: 42px;
                              letter-spacing: 0.025em;
                              color:black;">
                        <p>Hi, we received a request that you had enquired for the below property</p>
                        <p>http://localhost:3000/property/${req.body.propertyId} </p>
                        <p>Inorder to reserve the above property, please visit the below link</p>
                        <p>http://localhost:3000/customer_enroll/${req.body.propertyId} </p>
                        <br> 
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
</body>`

      var mailOptions = {
        from: 'webdevumkc@gmail.com',
        to: req.body.email,
        subject: 'Response to enquiry about property',
        text: 'Test',
        html: emailBody
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
})

module.exports = router;