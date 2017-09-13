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
app.use(express.static(__dirname + 'public'));

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

/**********
 * SERVER *
 **********/

app.listen(process.env.PORT || 3000, function() {
  console.log("Express Server is up and running on http://localhost:3000/");
});
