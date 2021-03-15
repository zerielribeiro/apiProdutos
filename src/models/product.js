'use strict'

const mongosse = require("mongoose");
const schema = mongosse.Schema({

   "title":{
        type: String,
        requerid: true,
        trim: true,
    },
    "slug": {
        type: String,
        requerid: true,
        trim: true,
        index: true,
        unique: true,
    },
    "description": {
        type: String,
        requerid: true
       
    },
    "price": {
        type: Number,
        requerid: true,
    },
    "active": {
        type: Boolean,
        requerid: true,
        default: true
    },
    "tags": [{
        type: String,
        requerid: true
    }]

});

module.exports = mongosse.model('Product', schema);