
// mapWineryCard Render Function.
function mapWineryCard(winery) {

  let mapWineryCardHTML = (`
      <div class="winery col s12 m6" data-winery-id="${winery._id}">
        <div class="mapwinery card">
          <div class="card-content">
            <div class="chip">
              <img src="https://doubleavineyards.com/media/catalog/product/cache/1/image/600x600/9df78eab33525d08d6e5fb8d27136e95/d/o/double-a-vineyards-foch2-grapevines.jpg" alt="Contact Person">
              ${winery.name}
            </div>
            <p>${winery.description}</p>
          </div>
          <div class="card-action add-winery-card">
            <a class="add-winery btn-floating btn-small fab waves-effect waves-light purple lighten-3"><i class="material-icons">add</i></a>
          </div>
        </div>
      </div> <!-- end of col class for card -->
  `
);
$('.map-outline').prepend(mapWineryCardHTML);
}
