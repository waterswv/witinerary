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


    function wineryIndexSuccess(wineries) {
      console.log(wineries);
      wineries.forEach(function(winery) {
        console.log(winery);
        renderWineryCard(winery);
      });
    }
});
