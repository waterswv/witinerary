$(document).ready(function() {

  renderNav();
  renderFooter();
  // Add event listner on Winery Button ... call update method to add winery to wineMap model in DB


  let directionsService = new google.maps.DirectionsService();
  let map = new google.maps.Map(document.getElementById('wine-map'), {
    center: {lat: 38.6205463, lng: -122.8997986}, // TODO: update center location to be relative to all wineries. Think about ZOOM as well.
    zoom: 10
  });
  let directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

// TODO: Determine where to place AJAX calls ... inside or outside of document ready

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    console.log('the url params are', vars);
    return vars;
}
getUrlVars();

// Display all current winery cards available to be added to a given WineMap
$.ajax({
  method: 'GET',
  url: '/api/map',
  success: wineMapIndexSuccess
})



function wineMapIndexSuccess(wineMapData) {
  // TODO: THIS MUST BE REFACTORED TO PULL DATA BASED ON WINEMAP ID, NOT [INDEX 0]...
  console.log('The WineMapData object ', wineMapData);
  // Render winery data to page
  wineMapData.data[0].wineries.forEach(function(winery){
    renderMapMarker(winery);
    // For each pool, render the events for that pool
    let wineryDiv = `[data-winery-id=${winery._id}]`;
    // console.log(wineryDiv);
    });
    generateWineriesForMaps();
}

function mapWineryAddSuccess(wineryData) {
  // grabbing winery added to map and using it to generate a new marker
  let winery = wineryData.wineries[wineryData.wineries.length-1];
  // console.log(winery);
  renderMapMarker(winery);
}


// EVENT Listener Section

// TODO: add event listeners....

// AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg



  function renderMapMarker(winery) {
    let marker = new google.maps.Marker({
      position: {lat: winery.maps.lat ,lng: winery.maps.long},
      map: map,
      title: winery.name // Adds hover pop-up on marker placed on map
    });
  }


// Find all wineries that are currently not displayed on a map.

function generateWineriesForMaps() {
   let allWineriesArr =  $.get('/api/winery');
   let wineriesinMapArr =  $.get('/api/map');

   // Using variables above make multiple ajax calls to use with promises.
   $.when(allWineriesArr, wineriesinMapArr).then(function (wineries, mapWineries) {
     //You have both responses at this point.
     console.log("All Wineries Array: ", wineries[0]);
     console.log("All Mapped Wineries Array: ", mapWineries[0].data[0].wineries);

    //  send waypoints object to calcRoute function for generating driving view...
     let waypointsData = mapWineries[0].data[0].wineries.map((winery) => {return {location: winery.fullAddress}})
     calcRoute(waypointsData); // TODO: figure out how to better arrange waypoints ...
     console.log(waypointsData);
     wineriesArr = wineries[0];

     console.log("Is this my all wineries Array... ", wineriesArr);
     mapWineriesArr = mapWineries[0].data[0].wineries.map((winery) => {return winery._id} );

    let wineriesNotOnMap = wineriesArr.filter(function(winery) {
       // .includes function returns a boolean value depending on if an element is contained in an array
       return !mapWineriesArr.includes(winery._id);
     });
     console.log("The current wineries not on map: ", wineriesNotOnMap);

     // Take array that has all wineries not on current map and call mapWineryCad Function to
     // generate a card on the page.
     wineriesNotOnMap.forEach((winery) => {mapWineryCard(winery)})

   }).then(function() {
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
         url: `/api/map/59bd513b13d94290630fea00/winery/${newWinery_id}`,
         data: {_id: newWinery_id },
         success: mapWineryAddSuccess
       });
     });
   });
}





// LEARNING GOOGLE MAPS DIRECTIONS >>>>

function calcRoute(waypointsData) {
  // let winery1 = new google.maps.LatLng(38.6640092, -122.9342897);
  // let winery2 = new google.maps.LatLng(38.5706633, -122.7795547);
  let request = {
    origin: {lat: 38.6205463, lng: -122.8997986},
    destination: {lat: 38.6205463, lng: -122.8997986},
    waypoints: waypointsData,
    // Note that Javascript allows us to access the constant
    // using square brackets and a string value as its
    // "property."
    travelMode: "DRIVING"
  };
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    }
  });
}
}); // End of Document.ready() ...
