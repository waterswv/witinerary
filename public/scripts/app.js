$(document).ready(function() {
    console.log('Javascript Sanity Check');
    renderNav();
    renderFooter();
    $('select').material_select();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });

    $.ajax({
      method: 'GET',
      url: '/api/winery',
      success: wineryIndexSuccess,
    });

    $.ajax({
      method: 'GET',
      url: '/api/map',
      success: wineMapIndexSuccess
    })


});


function wineryIndexSuccess(wineries) {

  wineries.forEach(function(winery) {

    renderWineryCard(winery);
  });
}

function wineMapIndexSuccess(wineMapData) {

  // Render winery data to page
  wineMapData.data[0].wineries.forEach(function(winery){
    mapWineryCard(winery);
    let wineryDiv = `[data-winery-id=${winery._id}]`;
    // For each pool, render the events for that pool
    console.log(wineryDiv);

  });

  console.log('(3)the lat is ', wineMapData.data[0].wineries[0].maps.lat);
  console.log('(3)the long is ', wineMapData.data[0].wineries[0].maps.long);

  let winery = wineMapData.data[0].wineries[0];
  let theLocation = {
    lat: wineMapData.data[0].wineries[0].maps.lat,
    lng: wineMapData.data[0].wineries[0].maps.long
    };
    console.log(document.getElementById('wine-map'));

    let map = new google.maps.Map(document.getElementById('wine-map'), {
      center: {lat: 37.7594696 ,lng: -122.4248613},
      zoom: 8
    });
    let marker = new google.maps.Marker({
      position: {lat: 37.7594696 ,lng: -122.4248613},
      map: map
    });
}

// AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg
