// Includes all CRUD Functions for Winery Schema

const db = require('../models');

function index(req, res) {
  db.Winery.find({}, function(err, wineries) {
    if (err){
      console.log('Error', err);
    }
    res.json(wineries);
  });
}

function create(req, res) {
  db.Winery.create(req.body, function(err, winery) {
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

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
};
