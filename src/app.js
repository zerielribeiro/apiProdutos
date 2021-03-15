"use strict";
const express = require("express");
var bodyParser = require("body-parser");

const app = express();
const router = express.Router();
// carregar as rotas

const index = require("./routes/index");
const product = require("./routes/product");

// definindo body parser para tratar arquivos json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
app.use("/products", product);

module.exports = app;
