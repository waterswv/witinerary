// Includes all CRUD Functions for WineMap Schema

const db = require('../models');

function index(req, res) {
  db.WineMap.find({}, function(err, wineMaps) {
    if (err){
      console.log('Error', err);
    }
    res.json({data: wineMaps});
  });
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

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update,
  destroyWinery: destroyWinery,
};
