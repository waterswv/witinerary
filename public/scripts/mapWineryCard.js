
// mapWineryCard Render Function.
function mapWineryCard(winery) {

  let mapWineryCardHTML = (`
      <div class="winery col s12 m6" data-winery-id="${winery._id}">
        <div class="mapwinery card">
          <div class="card-content">
            <div class="chip">
              <img src="https://pbs.twimg.com/profile_images/413706032871788544/IVbxnu7V_400x400.jpeg" alt="Contact Person">
              ${winery.name}
            </div>
            <p>${winery.description}</p>
          </div>
          <div class="card-action add-winery-card">
            <a id="add-winery" class="btn-floating btn-small fab waves-effect waves-light purple lighten-3"><i class="material-icons">add</i></a>
          </div>
        </div>
      </div> <!-- end of col class for card -->
  `
);
$('.map-outline').prepend(mapWineryCardHTML);
}
