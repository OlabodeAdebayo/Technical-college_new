// Shared header and footer, injected on every page so they are edited in one place.
(function () {
  var page = location.pathname.split("/").pop() || "index.html";
  var links = [["about.html","About"],["programs.html","Programs"],["admissions.html","Admissions"],["campus.html","Campus"],["news.html","News"],["contact.html","Contact"]];
  var nav = links.map(function (l) { return '<a href="' + l[0] + '"' + (l[0] === page ? ' class="active" aria-current="page"' : "") + ">" + l[1] + "</a>"; }).join("");
  document.getElementById("site-header").innerHTML =
    '<div class="topbar"><div class="wrap"><span>Call +234 800 000 0000 &nbsp;|&nbsp; admissions@meridiantech.edu.ng</span><span><a href="#">Student portal</a> <a href="admissions.html">Apply</a></span></div></div>' +
    '<header class="nav"><div class="wrap nav-in"><a class="logo" href="index.html"><span class="mark" aria-hidden="true">M</span>Meridian Technical College</a>' +
    '<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span></button>' +
    '<nav id="menu" class="menu" aria-label="Main">' + nav + '<a class="btn btn-amber" href="admissions.html">Apply now</a></nav></div></header>';
  document.getElementById("site-footer").innerHTML =
    '<footer class="foot"><div class="wrap foot-grid"><div><b>Meridian Technical College</b><p>Practical technical education for the next generation of Nigerian professionals.</p></div>' +
    '<div><b>Quick links</b>' + links.slice(0, 4).map(function (l) { return '<a href="' + l[0] + '">' + l[1] + "</a>"; }).join("") + '</div>' +
    '<div><b>Programs</b><a href="programs.html">Electrical</a><a href="programs.html">Mechanical</a><a href="programs.html">Automotive</a><a href="programs.html">Welding</a></div>' +
    '<div><b>Follow us</b><a href="#">Facebook</a><a href="#">Instagram</a><a href="#">YouTube</a></div></div>' +
    '<div class="wrap copy">&copy; 2026 Meridian Technical College. <a href="#">Privacy</a> <a href="#">Terms</a></div></footer>';
})();
