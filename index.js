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

// serve static files from public folder
app.use(express.static(__dirname + 'public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

//routes

app.get('/', function(req, res){
  res.sendFile('views/index.html', {
    root: __dirname
  });
  console.log(__dirname);
});

app.get('/api', function(req, res) {
  res.json({
    description: "This API provides data to Witinerary"
    gitHub: "https://github.com/waterswv/witinerary"
    endPoints: "Coming Soon"
  });
});


/**********
 * SERVER *
 **********/

app.listen(process.env.PORT || 3000, function() {
  console.log("Express Server is up and running on http://localhost:3000/");
});
