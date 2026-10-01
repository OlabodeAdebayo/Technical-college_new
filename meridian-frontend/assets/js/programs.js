(function () {
  var grid = document.getElementById("programGrid"), api = window.API_BASE;
  var fallback = [
    { id: 1, title: "Electrical Installation & Maintenance", category_slug: "electrical", duration: "2 Years", summary: "Wiring, installation, fault finding and safe maintenance of electrical systems." },
    { id: 2, title: "Mechanical Engineering Craft", category_slug: "engineering", duration: "2 Years", summary: "Machining, fitting, workshop practice and maintenance of mechanical equipment." },
    { id: 3, title: "Welding & Fabrication", category_slug: "engineering", duration: "1 Year", summary: "Arc, MIG and gas welding with metal fabrication and blueprint reading." },
    { id: 4, title: "Automotive Technology", category_slug: "automotive", duration: "2 Years", summary: "Engine, brake and electrical diagnosis and servicing for modern vehicles." },
    { id: 5, title: "Plumbing & Pipe Fitting", category_slug: "construction", duration: "1 Year", summary: "Water supply, drainage, pipe fitting and installation of sanitary systems." },
    { id: 6, title: "Building & Construction", category_slug: "construction", duration: "2 Years", summary: "Block laying, concrete work, site measurement and building practice." }
  ];
  var colors = ["#123B5D", "#1d5a8a", "#b45309", "#334155", "#0e7490", "#7c4a1d"];
  var esc = function (x) { return String(x).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var all = [], filter = "all", search = document.getElementById("search"), limit = grid && +grid.dataset.limit;

  function load() {
    return fetch(api + "/programs/").then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (d) { return d.results || d; }).catch(function () { return fallback; });
  }
  function render() {
    var q = search ? search.value.trim().toLowerCase() : "";
    var list = all.filter(function (p) { return (filter === "all" || p.category_slug === filter) && (p.title + " " + p.summary).toLowerCase().indexOf(q) > -1; });
    if (limit) list = list.slice(0, limit);
    grid.innerHTML = list.map(function (p, i) {
      return '<article class="card prog"><div class="img" style="background:' + colors[i % 6] + '" aria-hidden="true">' + esc(p.title.charAt(0)) + '</div><div class="body"><h3>' + esc(p.title) + "</h3><p>" + esc(p.summary) + '</p><span class="dur">Duration: ' + esc(p.duration) + '</span><a class="link" href="admissions.html">Apply for this program</a></div></article>';
    }).join("");
    var empty = document.getElementById("empty"); if (empty) empty.hidden = list.length > 0;
  }
  load().then(function (d) {
    all = d;
    var sel = document.getElementById("applyProgram");
    if (sel) sel.innerHTML = '<option value="">Choose a program</option>' + d.map(function (p) { return '<option value="' + p.id + '">' + esc(p.title) + "</option>"; }).join("");
    if (grid) render();
  });
  var chips = document.getElementById("chips");
  if (chips) chips.addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    document.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("on"); });
    b.classList.add("on"); filter = b.dataset.f; render();
  });
  if (search) search.addEventListener("input", render);

  // Campus tabs
  var tabs = document.getElementById("tabs"), panel = document.getElementById("panel");
  if (tabs) {
    var rooms = { Electrical: "Practice boards, distribution panels, test meters and solar installation rigs.", Mechanical: "Lathes, milling machines, bench vices and precision measuring tools.", Welding: "Individual welding bays with extraction, MIG and arc machines, and cutting tools.", Automotive: "Vehicle lifts, engine stands, diagnostic scanners and working vehicles.", Plumbing: "Pipe-bending stations, fixture test rigs and practical drainage layouts.", Construction: "Block-laying yards, formwork area, surveying equipment and a mixing station." };
    var show = function (n, btn) {
      tabs.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-selected", x === btn); });
      panel.innerHTML = "<h3>" + n + " workshop</h3><p>" + rooms[n] + " Students train in small groups with an instructor present.</p>";
    };
    Object.keys(rooms).forEach(function (n, i) {
      var b = document.createElement("button"); b.type = "button"; b.setAttribute("role", "tab"); b.textContent = n + " workshop";
      b.addEventListener("click", function () { show(n, b); }); tabs.appendChild(b); if (!i) show(n, b);
    });
  }
})();
