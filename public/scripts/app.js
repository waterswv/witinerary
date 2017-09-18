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
    })

}); // Close Document.ready function

//  AJAX CALL SUCCESS FUNCTIONS
  function wineryIndexSuccess(wineries) {
    wineries.forEach(function(winery) {
      renderWineryCard(winery);
    });
  }

  function handleNewMapSuccess(newMapData) {
    console.log(newMapData);
  }

  function handleAjaxError(err) {
      console.log('There was an error', err);
  }
