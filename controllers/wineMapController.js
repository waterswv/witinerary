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

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
};
