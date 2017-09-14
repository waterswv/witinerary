// main index.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
let express = require('express'),
  bodyParser = require('body-parser');

// generate a new express app and call it 'app'
let app = express();

// setup db instance to leverage models
let db = require('./models');

// setup instance of controllers to to leverage the controller functions
let controllers = require('./controllers');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

//root route setup

app.get('/', function(req, res){
  res.sendFile('views/index.html', {
    root: __dirname
  });
  console.log(__dirname);
});

// API Controller Routes
app.get('/api', controllers.api.index);

// Winery Controller Routes
app.get('/api/winery', controllers.winery.index);
app.post('/api/winery', controllers.winery.create);
app.get('/api/winery/:winery_id', controllers.winery.show);
app.delete('/api/winery/:id', controllers.winery.destroy);

// WineMap Controller Routes
app.get('/api/map', controllers.wineMap.index);
app.post('/api/map', controllers.wineMap.create);
app.get('/api/map/:map_id', controllers.wineMap.show);
app.delete('/api/map/:id', controllers.wineMap.destroy);
app.put('/api/map/:map_id/winery/:winery_id', controllers.wineMap.update)
app.delete('/api/map/:map_id/winery/:winery_id', controllers.wineMap.destroyWinery)


/**********
 * SERVER *
 **********/

app.listen(process.env.PORT || 3000, function() {
  console.log("Express Server is up and running on http://localhost:3000/");
});
