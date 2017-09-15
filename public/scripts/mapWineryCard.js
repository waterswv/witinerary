
function mapWineryCard(winery) {

  let mapWineryCardHTML = `
      <div class="col s12 m3" data-winery-id="${winery._id}">
        <div class="card">
          <div class="card-content">
            <div class="chip">
              <img src="${winery.url}" alt="Contact Person">
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

}
