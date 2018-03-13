// Includes all CRUD Functions for WineMap Schema

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
  db.WineMap.find({}, function(err, wineMaps) {
    if (err){
      console.log('Error', err);
    }
    res.json({data: wineMaps});
  });
}

function map(req, res) {
  let params = {
          center: '2000 Post St San Francisco CA 94115',
          zoom: 8,
          size: '250x250',
          maptype: 'roadmap'}
  let map = gmAPI.staticMap(params);


  res.json(map);

}
function create(req, res) {
  db.WineMap.create(req.body, function(err, wineMap) {
    if (err) {
      console.log('Error Creating WineMap', err);
    }
    res.json(wineMap);

  });
}

function show(req, res) {
  db.WineMap.findById(req.params.map_id, function(err, wineMap) {
    if (err) {
      console.log('Error finding WineMap by ID', err);
    }
    res.json(wineMap);
  });
}

// TODO: Update/PUT Method

function destroy(req, res) {
  db.WineMap.findOneAndRemove({_id: req.params.id}, function(err, wineMap) {
    if (err) {
      console.log('Error finding WineMap by ID ', err);
    }
    res.json(wineMap);
  });
}

function update(req, res) {
  // this line grabs the winery id from the parameter and passes to callback
  db.Winery.findById(req.params.winery_id, function(err, winery) {
    // this line grabs the wineMap id from parameter and passes it to callback
    db.WineMap.findById(req.params.map_id, function(err, wineMap) {
      if (err) {
        console.log('Error grabbing WineMap ID ', err);
      }
      // this line is taking the wineMap from callback and pushes the winery
      // from 1st lookup into embedded array
      wineMap.wineries.push(winery);
      // here we save the new wineMap with the embedded winery id & pass updated
      //  wineMap into a final callback
      wineMap.save(function(err, savedWineMap) {
        // here we populate the winery data into the WineMap
        savedWineMap.populate('wineries');
        // pass the final, updated winmap back as response
        res.json(savedWineMap);
      });
    });
  });
}

function destroyWinery(req, res) {

  db.WineMap.findOneAndUpdate({_id: req.params.map_id}, {$pull: {wineries: {_id: req.params.winery_id}}}, function(err, wineMap){
    if(err) {
      return res.status(500).json({'error' : 'error in deleting winery'});
      }
    res.json(wineMap);
  });
}

// // Non Route Functions:
// // renderMapLatLng creates lat long data from address & updates coordinates.
// function renderMapLatLng (pools) {
//   pools.forEach(function (pool) {
//       // geocode API
//       var geocodeParams = {
//         "address": pool.address,
//       };
//       gmAPI.geocode(geocodeParams, function(err, result){
//         console.log("the result is ", result);
//         pool.maps.lat = result.results[0].geometry.location.lat;
//         pool.maps.long = result.results[0].geometry.location.lng;
//         pool.save();
//         console.log('the pool LatLng is ', pool.maps);
//       });
//   });
// }



module.exports = {
  index: index,
  map: map,
  create: create,
  show: show,
  destroy: destroy,
  update: update,
  destroyWinery: destroyWinery,
};
