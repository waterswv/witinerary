$(document).ready(function() {


  // Add event listner on Winery Button ... call update method to add winery to wineMap model in DB
  $('#add-winery').on('click', function(e) {
    e.preventDefault();
    console.log('clicked + winery FAB');
    let newWinery_id = $(this).closest('.winery').data('winery-id');
    $.ajax({
      method: "PUT",
      url: `/api/map/59bd513b13d94290630fea00/winery/${newWinery_id}`,
      data: {_id: newWinery_id },
      success: mapWineryAddSuccess
    });
  });

  let map = new google.maps.Map(document.getElementById('wine-map'), {
    center: {lat: 38.6205463, lng: -122.8997986}, // TODO: update center location to be relative to all wineries. Think about ZOOM as well.
    zoom: 10
  });

// TODO: Determine where to place AJAX calls ... inside or outside of document ready

// Display all current winery cards available to be added to a given WineMap
$.ajax({
  method: 'GET',
  url: '/api/map',
  success: wineMapIndexSuccess
})



function wineMapIndexSuccess(wineMapData) {
  // Render a New Map
  renderMap(wineMapData)
  // Render winery data to page
  wineMapData.data[0].wineries.forEach(function(winery){
    mapWineryCard(winery);
    let wineryDiv = `[data-winery-id=${winery._id}]`;
    // For each pool, render the events for that pool
    console.log(wineryDiv);
    });
}

function mapWineryAddSuccess(wineryData) {
  let winery = wineryData.wineries[wineryData.wineries.length-1];
  console.log(winery);
  renderMapMarker(winery);
}


// EVENT Listener Section

// TODO: add event listeners....

// AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg

// MAP RENDERING FUNCTIONS
  function renderMap(wineMapData,) {
    console.log(wineMapData);
    // let winery = wineMapData.data[0].data.wineries;
    let theLocation = {
      lat: wineMapData.data[0].wineries[0].maps.lat,
      lng: wineMapData.data[0].wineries[0].maps.long
    };
    console.log(document.getElementById('wine-map'));


    wineMapData.data[0].wineries.forEach(function(winery){
      // Add all wineries in WineMap to Map
      renderMapMarker(winery);
    });

  }

  function renderMapMarker(winery) {
    let marker = new google.maps.Marker({
      position: {lat: winery.maps.lat ,lng: winery.maps.long},
      map: map
    });
  }













}); // End of Document.ready() ...
