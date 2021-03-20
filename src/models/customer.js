'use strict'

const mongosse = require("mongoose");
const schema = mongosse.Schema({

    name:{
        type: String,
        requerid: true
    },
    email:{
        type: String,
        requerid: true
    },
    password:{
        type: String,
        requerid: true
    }
   

});

module.exports = mongosse.model('Customer', schema);