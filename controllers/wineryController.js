// Includes all CRUD Functions for Winery Schema

const db = require('../models');
var GoogleMapsAPI = require('googlemaps');

// importing google maps:
var publicConfig = {
  key: 'AIzaSyDV5HMbW_2loRPhf5xa0IzXP5SfOP1TF-Q',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true, // use https
  //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
};
var gmAPI = new GoogleMapsAPI(publicConfig);

function index(req, res) {
  db.Winery.find({}, function(err, wineries) {
    if (err){
      console.log('Error', err);
    }
    res.json(wineries);
  });
}

function create(req, res) {
  let winery = new db.Winery(req.body);
  renderMapLatLng(winery);

  winery.save(function(err, winery) {
    if (err) {
      console.log('Error Creating Winery', err);
    }
  
    res.json(winery);
  });
}

function show(req, res) {
  db.Winery.findById(req.params.winery_id, function(err, winery) {
    if (err) {
      console.log('Error finding Winery by ID', err);
    }
    res.json(winery);
  });
}

// TODO: Update/PUT Method

function destroy(req, res) {
  db.Winery.findOneAndRemove({_id: req.params.id}, function(err, winery) {
    if (err) {
      console.log('Error finding winery by ID ', err);
    }
    res.json(winery);
  });
}

// Non Route Functions:
// renderMapLatLng creates lat long data from address & updates coordinates.
function renderMapLatLng (winery) {
  // wineries.forEach(function (winery) {
      // geocode API
      console.log(winery);
      var geocodeParams = {
        "address": winery.fullAddress,
      };
      gmAPI.geocode(geocodeParams, function(err, result){
        console.log(err);
        console.log("the result is ", result);
        winery.maps.lat = result.results[0].geometry.location.lat;
        winery.maps.long = result.results[0].geometry.location.lng;
        winery.save();
        console.log('the pool LatLng is ', winery.maps);
      });
  // });
}


module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
};
