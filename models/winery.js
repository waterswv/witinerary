let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let WinerySchema = new Schema({
  name: String,
  description: String,
  url: String,
  fullAddress: String,
  contactPhone: String,
  contactEmail: String,
  hours: String,
  tastingByAppt: Boolean,
  varietals: [String],
  wineClub: Boolean,
  twitter: String,
  facebook: String,
  wineRegion: String,
  maps: {
    lat: Number,
    long: Number
  }

})

let Winery = mongoose.model('Winery', WinerySchema);

module.exports = Winery;

// varietals is an array of grape types
