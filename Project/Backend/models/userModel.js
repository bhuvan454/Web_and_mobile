const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
})

const user = mongoose.model('user', userSchema, 'users')

module.exports = user;