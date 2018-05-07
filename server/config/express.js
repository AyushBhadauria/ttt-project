
var flash = require('connect-flash')

var config = require('./local')
module.exports = function(app) {
    app.use(flash()); 
    
}