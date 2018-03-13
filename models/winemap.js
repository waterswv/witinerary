let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let Winery = require('./winery')

let WineMapSchema = new Schema({
  title: String,
  createdDate: String,
  scheduleDate: String,
  startTime: String,
  endTime: String,
  mapURL: String,
  wineries: [Winery.schema],
  wineRegion: String,
  startLocation: {
    lat: Number,
    long: Number
  },
  endLocation: {
    lat: Number,
    long: Number
  }

})

let WineMap = mongoose.model('WineMap', WineMapSchema);

module.exports = WineMap;
