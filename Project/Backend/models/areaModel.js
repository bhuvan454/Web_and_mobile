const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const areaSchema = new Schema({
    name: String,
})

const area = mongoose.model('area', areaSchema, 'areas')

module.exports = area;