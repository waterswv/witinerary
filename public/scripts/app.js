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
  console.log(wineries);
  wineries.forEach(function(winery) {
    console.log(winery);
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

  console.log('(3)the lat is ', winery.maps.lat);

  let theLocation = {
    lat: winery.maps.lat,
    lng: winery.maps.long
    };
  let map = new google.maps.Map(document.getElementById('wine-map'), {
    zoom: 12,
    center: theLocation
  });
  let marker = new google.maps.Marker({
    position: theLocation,
    map: map,
  });

}
