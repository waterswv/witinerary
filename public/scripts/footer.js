
function renderFooter() {

let footerHTML = (
`<div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Witinerary Inc.</h5>
                <p class="grey-text text-lighten-4">Made with <i class="tiny material-icons">favorite</i> in Northern California.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">About Us</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="#!">Our History</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Careers</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">All Wineries</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2017 Copyright Witinerary Labs
            <a class="grey-text text-lighten-4 right" href="#!">Shhh :)</a>
            </div>
          </div>`
);
$('footer').prepend(footerHTML);

}
