var express = require('express')
var controller = require('./read.controller')
var router = express.Router()

router.get('/:count', controller.getFile);

module.exports = router
