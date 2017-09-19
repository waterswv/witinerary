//require mongoose & connect
let mongoose = require('mongoose');

// connect mongoose to database location to store data from end-points
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/wineapp_test");

module.exports.Winery = require('./winery');
module.exports.WineMap = require('./winemap');
