'use strict'

const mongosse = require("mongoose");
const schema = mongosse.Schema({

    customer:{
        type: mongosse.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    number:{
        type: String,
        requerid: true
    },
    createDate:{
        type: Date,
        requerid: true,
        default:Date.now
    },
    status:{
        type: String,
        required:true,
        enum:['created', 'done'],
        default: 'created'
    },
    items:[{
        quantity: {
            type: Number,
            required: true,
            default:1
        },
        price:{
            type: Number,
            requerid: true
        },
        product:{
            type: mongosse.Schema.Types.ObjectId,
            ref: 'Product'
    }}]

   

});

module.exports = mongosse.model('Order', schema);