function renderNav() {

let navHTML = (`
  <div class="nav-wrapper">
    <a href="#" class="brand-logo"><i class="large material-icons">whatshot</i>Wine-trippin</a>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="sass.html">Sign Up</a></li>
      <li><a href="badges.html">Login</a></li>
      <li>Test Text</li>
      <li><a href="collapsible.html">Wines</a></li>
    </ul>
  </div>
  `);

$('nav').prepend(navHTML);

}
