const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactFormSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    message: String,
    propertyId: String,
})

const contactform = mongoose.model('contactform', contactFormSchema, 'contactforms')

module.exports = contactform;