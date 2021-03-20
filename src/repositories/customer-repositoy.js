'use strict';

const mongoose = require('mongoose');
const Customer = require('../models/customer');

exports.create = async(data) =>{
    var customer = new Customer(data);
    await customer.save();
}