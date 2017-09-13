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









module.exports = {
  index: index,
};
