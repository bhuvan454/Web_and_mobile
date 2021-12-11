const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const propertySchema = new Schema({
    name: String,
    price: String,
    propertyArea: String,
    street: String,
    bedrooms: String,
    date: String,
    occupied: String,
    areaStatus: String,
})

const property = mongoose.model('property', propertySchema, 'properties')

module.exports = property;