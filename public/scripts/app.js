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
      closeOnSelect: true, // Close upon selecting a date,
      onClose: function(){$('.datepicker').blur();}
    });
    // Generate winery cards on homepage ...
    $.ajax({
      method: 'GET',
      url: '/api/winery',
      success: wineryIndexSuccess,
    });



//  AJAX CALL SUCCESS FUNCTIONS
  function wineryIndexSuccess(wineries) {
    wineries.forEach(function(winery) {
      renderWineryCard(winery);
    });
  }





}); // Close Document.ready function
