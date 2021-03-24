"use strict";
const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("../config");

const app = express();
const router = express.Router();

//conexao com bd mongo
mongoose.connect(config.connectionString);
mongoose.connection.on("connected", function () {
  console.log("=====Conexão estabelecida com sucesso=====");
});
// carregando os model
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// carregar as rotas

const index = require("./routes/index");
const product = require("./routes/product");
const customer = require("./routes/custumer");
const order = require("./routes/order");

// definindo body parser para tratar arquivos json
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
app.use("/products", product);
app.use('/custumers', customer);
app.use('/oders',order);

module.exports = app;
