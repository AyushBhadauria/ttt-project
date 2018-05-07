'use strict'

var express =require('express');
var app=express();
const path=require('path');
var bodyParser =require('body-parser');
var cors = require('cors')
const config=require('./config/local');

app.use(cors());

// index
app.use(express.static(path.join(config.root, 'public')));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

require('./config/express')(app)
require('./routes')(app)
app.use('*', function(req, res, next) {
    var indexFile = path.resolve(config.root, 'public/index.html')
    res.sendFile(indexFile)
})
module.exports = app;
const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port,()=>{
    console.log('server running on ' + port)
})