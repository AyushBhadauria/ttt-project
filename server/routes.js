
'use strict'

module.exports = function(app) {

    app.use('/read', require('./routes/read'))
    
}