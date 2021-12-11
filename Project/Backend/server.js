const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// const path = require('path');

const app = express();

// app.use(express.static(`${__dirname}/public`))

const user = require('./routes/user');
const area = require('./routes/area');
const property = require('./routes/property');
const contactform = require('./routes/contactform');
const customerEnroll = require('./routes/customerEnroll');

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/user', user)
app.use('/area', area)
app.use('/property', property)
app.use('/contactform', contactform)
app.use('/customerEnroll', customerEnroll);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/public"));
// app.use("/public", express.static(path.join(__dirname, './public/images')));
// app.use('/static', express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public'));


app.get('/', (req,res) => {
    res.send('Hello from server')
})

const PORT = 8000;
const db = "mongodb://localhost:27017/propertyApp";

mongoose.connect(db, (err) => {
    err => console.log(err)
    console.log('Connected to the database')
})

app.listen(PORT, ()=> {
    console.log('Server is running on localhost:' + PORT);
})