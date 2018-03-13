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

// Prevent CORS errors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //Remove caching
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// RUNNING GRAPHQL ********************************************************
      let graphqlHTTP = require('express-graphql');
      let { buildSchema } = require('graphql');

      // Construct a schema, using GraphQL schema language
      let schema = buildSchema(`
        type Query {
          rollDice(numDice: Int!, numSides: Int): [Int]
        }
      `);

      // The root provides a resolver function for each API endpoint
      let root = {
        rollDice: function ({numDice, numSides}) {
          var output = [];
          for (var i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides || 6)));
          }
          return output;
        }
      };

      let graphApp = express();
      graphApp.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
      }));
      graphApp.listen(4000);
      console.log('Running a GraphQL API server at localhost:4000/graphql');
// END GRAPHQL ********************************************************

//root route setup

app.get('/', function(req, res){
  res.sendFile('views/index.html', {
    root: __dirname
  });
  console.log(__dirname);
});

app.get('/new-map', function(req, res){
  res.sendFile('views/new-map.html', {
    root: __dirname
  });
  console.log(__dirname);
});

app.get('/wine-map', function(req, res){
  res.sendFile('views/wine-map.html', {
    root: __dirname
  });
  console.log(__dirname);
});

app.get('/new-map/:map_id', function(req, res){
  res.sendFile('views/new-map.html', {
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
app.get('/api/map/google', controllers.wineMap.map)
app.post('/api/map', controllers.wineMap.create);
app.get('/api/map/:map_id', controllers.wineMap.show);
app.delete('/api/map/:id', controllers.wineMap.destroy);
app.put('/api/map/:map_id/winery/:winery_id', controllers.wineMap.update)
app.delete('/api/map/:map_id/winery/:winery_id', controllers.wineMap.destroyWinery)


/**********
 * SERVER *
 **********/

app.listen(process.env.PORT || 8000, function() {
  console.log("Express Server is up and running on http://localhost:8000/");
});
