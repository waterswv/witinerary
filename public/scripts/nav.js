function renderNav() {

let navHTML = (`
  <div class="nav-wrapper">
    <a href="/" class="brand-logo"><i class="large material-icons">whatshot</i>Wine-trippin</a>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="#">Sign Up</a></li>
      <li><a href="#">Login</a></li>
      <li><a href="/new-map">New Wine Map</a></li>
      <li><a href="#">Wineries</a></li>
    </ul>
  </div>
  `);

$('nav').prepend(navHTML);

}
