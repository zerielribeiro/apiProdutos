"use strict";
const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const router = express.Router();

//conexao com bd mongo
mongoose.connect("mongodb://localhost:27017/cadprodutos");
mongoose.connection.on("connected", function () {
  console.log("=====Conexão estabelecida com sucesso=====");
});
// carregando os model
const Product = require('./models/product');

// carregar as rotas

const index = require("./routes/index");
const product = require("./routes/product");

// definindo body parser para tratar arquivos json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
app.use("/products", product);

module.exports = app;
