$(document).ready(function() {

  renderNav();
  renderFooter();
  // Add event listner on Winery Button ... call update method to add winery to wineMap model in DB


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

  // Render winery data to page
  wineMapData.data[0].wineries.forEach(function(winery){
    renderMapMarker(winery);
    let wineryDiv = `[data-winery-id=${winery._id}]`;
    // For each pool, render the events for that pool
    // console.log(wineryDiv);
    });
    generateWineriesForMaps();
}

function mapWineryAddSuccess(wineryData) {
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
      map: map
    });
  }


// Find all wineries that are currently not displayed on a map.

function generateWineriesForMaps() {
  let allWineriesArr =  $.get('/api/winery');
  let wineriesinMapArr =  $.get('/api/map');

   $.when(allWineriesArr, wineriesinMapArr).then(function (wineries, mapWineries) {
     //You have both responses at this point.
     console.log("All Wineries Array: ", wineries[0]);
     console.log("All Mapped Wineries Array: ", mapWineries[0].data[0].wineries);

     wineriesArr = wineries[0];
     console.log("Is this my all wineries Array... ", wineriesArr);
     mapWineriesArr = mapWineries[0].data[0].wineries.map((winery) => {return winery._id} );

    let wineriesNotOnMap = wineriesArr.filter(function(winery) {
       return !mapWineriesArr.includes(winery._id);
     });
     console.log("The current wineries not on map: ", wineriesNotOnMap);

     wineriesNotOnMap.forEach((winery) => {mapWineryCard(winery)})

   }).then(function() {
     $('.add-winery').on('click', function(e) {
       e.preventDefault();
       console.log('clicked + winery FAB');
       let newWinery_id = $(this).closest('.winery').data('winery-id');
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









}); // End of Document.ready() ...
