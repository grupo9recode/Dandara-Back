var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
const Usuarios = require('../Routes/Usuarios')

var consign = require('consign');
var app = express()

app.use(bodyParser.urlencoded({extended:true}));
//app.use("/usuarios", Usuarios)

app.use(cors())
consign()
.include('/routes')
.then('/Config/DB/MySQL.js')
.then('/Config/DB/Mongo.js')
.then('/models')
.into(app);

module.exports = app;