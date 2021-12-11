const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerEnrollSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    propertyId: String,
})

const customerEnroll = mongoose.model('customerEnroll', customerEnrollSchema, 'customerEnrolls')

module.exports = customerEnroll;