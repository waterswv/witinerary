# Wine-Tripping by Witinerary

## An App to help you make the most of your time in Wine Country

### Technology Stack
* JAVASCRIPT
* [MaterializeCSS](http://materializecss.com/)
* [Google Maps api](https://www.npmjs.com/package/googlemaps)
* [Express](https://expressjs.com/)
* [Body-Parser](https://www.npmjs.com/package/body-parser-json)
* [Node.js](https://nodejs.org/en/)
* [Mongoose](http://mongoosejs.com/)
* [MongoDB](http://mongodb.github.io/node-mongodb-native/2.0/)

### Overview

#### Wine-Tripping is built with javascript and materializecss on the front end and employs express on top of node.js with a MongoDB/Mongoose database. The solution helps users search a directory of wineries located in the different wine regions of Northern California. Upon finding suitable destinations, a user will be able to build an itinerary list of addresses. Based on the built list the site then hits the Google Maps Directions API to build a mapped route of the destinations. Future enhancements will provide users with an optimized route of turn-by-turn directions of their route. This will help them in planning departure & arrival times for their entire trip.

#### Interesting Code [

> From my perspective :)

1. ** generateWineriesForMaps  function located in public/scripts/map.js **

##### The Generate Wineries for Maps is doing several things:
  1. Uses AJAX promises to make multiple get method calls and then executes multiple statement with both results.
  2. Leverages Google Maps Waypoints Array options
  3. Calculates which wineries have not been added to map to using .map() & .includes()
  4. Leveraging .next() waits until all functions have been executed to add event listeners to newly rendered winery cards.

  **Code Snippet Examples for generateWineriesForMaps:**
  1.
```
  function generateWineriesForMaps() {
     let allWineriesArr =  $.get('/api/winery');
     let wineriesinMapArr =  $.get(`/api/map/${urlData[3]}`);

     // Using variables above make multiple ajax calls to use with promises.
     $.when(allWineriesArr, wineriesinMapArr).then(function (wineries, mapWineries) {
       //You have both responses at this point.
       console.log("All Wineries Array: ", wineries[0]);
       console.log("All Mapped Wineries Array: ", mapWineries[0].wineries);
```

  2.


```   
       //  send waypoints object to calcRoute function for generating driving view...
       let waypointsData = mapWineries[0].wineries.map((winery) => {return {location: winery.fullAddress}})
       calcRoute(waypointsData); // Call Google Maps CalcRoute function to build directions display
       console.log(waypointsData);
```

  3.
```   
       wineriesArr = wineries[0];
       console.log("Is this my all wineries Array... ", wineriesArr);
       mapWineriesArr = mapWineries[0].wineries.map((winery) => {return winery._id} );

       let wineriesNotOnMap = wineriesArr.filter(function(winery) {
         // .includes function returns a boolean value depending on if an element is contained in an array
         return !mapWineriesArr.includes(winery._id);
       });
       console.log("The current wineries not on map: ", wineriesNotOnMap);

       // Take array that has all wineries not on current map and call mapWineryCad Function to
       // generate a card on the page.
       wineriesNotOnMap.forEach((winery) => {mapWineryCard(winery)})
       })
```
  4.
```
    .then(function() {
       // using promises & anonymous function setup jQuery event listeners on every card created on page with .add-winery class
       $('.add-winery').on('click', function(e) {
         e.preventDefault();
         console.log('clicked + winery FAB');
         // Grabs the winery id from data element to pass through to database to append
         let newWinery_id = $(this).closest('.winery').data('winery-id');
         // Toggles the display of the selected winery card to off upon clicking add button to map
         $(this).closest('.winery').toggle('slow');
         $.ajax({
           method: "PUT",
           url: `/api/map/${urlData[3]}/winery/${newWinery_id}`,
           data: {_id: newWinery_id },
           success: mapWineryAddSuccess
         });
       });
     });
```
2. AJAX Calls located in public/scripts/app.js

#### Here I'm making multiple ajax calls as well as adding event listeners:

* Allows you to generate a new wineMap in 2 different ways & create a dynamic page:
- Form Submission generating a blank wineMap
- Button click, which also adds your 1st winery to your wineMap

> Specifically what I like about this section of code is that I chain 2 separate
> ajax calls together so I can first create a wineMap & then add a winery to that
< wineMap that has been newly created. Then I execute a redirect to the new page

  ``` // Generate winery cards on homepage ...
  $.ajax({
    method: 'GET',
    url: '/api/winery',
    success: wineryIndexSuccess,
  }).then(function () {
    $('.new-wineMap').on('click', function(e) {
      e.preventDefault();
      console.log('clicked + winery FAB');
      // Grabs the winery id from data element to pass through to database to append
      let newWinery_id = $(this).closest('.winery').data('winery-id');
      $.post('/api/map', {data: {title: 'New Wine Map'}}).then(function(wineMap) {

        $.ajax({
          method: "PUT",
          url: `/api/map/${wineMap._id}/winery/${newWinery_id}`,
          data: {_id: newWinery_id },
          success: addWineryToWineMapSuccess
        }); // closes $.ajax call
        // Redirect to new web page.
        window.location = `/new-map/${wineMap._id}`;
      }); // Closes $.post anoynymous function
    }); // Closes on'Click' function.
  });
  ```
