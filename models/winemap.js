let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let Winery = require('./winery')

let WineMapSchema = new Schema({
  title: String,
  createdDate: Date,
  scheduleDate: Date,
  startTime: String,
  endTime: String,
  mapURL: String,
  wineries: [Winery.schema]

})

let WineMap = mongoose.model('WineMap', WineMapSchema);

module.exports = WineMap;
