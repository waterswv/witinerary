

  console.log('renderWineryCard JS Sanity Check');

  function renderWineryCard(winery) {
      let wineryCardHTML = (`
            <div class="col s12 m4 winery" data-winery-id="${winery._id}">
              <div class="card">
                <div class="card-image">
                  <img src="https://photos-05.shuttlerock-cdn.com/boards/sonoma-county/sonoma-county-experience/d3e3139094c211e7916d1574ab6b4480/DJNfddsWAAAKXJi/sonoma-county-400x400x">
                  <a class="new-wineMap btn-floating btn-large halfway-fab waves-effect waves-light purple lighten-3"><i class="material-icons">add</i></a>
                </div>
                <div class="card-content">
                  <span class="card-title">${winery.name}</span>
                  <p>${winery.description}</p>
                </div>
              </div>
            <!--End of Winery Card  -->
    `);
    $('#winery-container').prepend(wineryCardHTML);
  }
