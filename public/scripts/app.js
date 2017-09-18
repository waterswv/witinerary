$(document).ready(function() {
    console.log('Javascript Sanity Check');
    renderNav();
    renderFooter();
    $('select').material_select();

    // Generate winery cards on homepage ...
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

    $('form').on('submit', function(e) {
      e.preventDefault();
      let data = $(this).serialize();
      $.ajax({
        method: 'POST',
        url: '/api/map',
        data: data,
        success: handleNewMapSuccess,
        error: handleAjaxError
      });
    });



}); // Close Document.ready function

//  AJAX CALL SUCCESS FUNCTIONS
  function wineryIndexSuccess(wineries) {
    wineries.forEach(function(winery) {
      renderWineryCard(winery);
    });
  }

  function handleNewMapSuccess(newMapData) {
    console.log(newMapData);
    wineMapID = newMapData._id;


    window.location = `/new-map/${wineMapID}`;

  }

  function addWineryToWineMapSuccess(wineryData) {
    console.log(wineryData);
  }
  function handleAjaxError(err) {
      console.log('There was an error', err);
  }
