(function () {
  var $ = function (s) { return document.querySelector(s); };
  // Mobile menu
  var burger = $("#burger"), menu = $("#menu");
  function setMenu(o) { menu.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); burger.setAttribute("aria-label", o ? "Close menu" : "Open menu"); }
  burger.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
  menu.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  // Count-up statistics
  var facts = $(".facts");
  if (facts && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    new IntersectionObserver(function (en, ob) {
      if (!en[0].isIntersecting) return; ob.disconnect();
      document.querySelectorAll("[data-count]").forEach(function (el) {
        var end = +el.dataset.count, t0 = null;
        requestAnimationFrame(function step(t) {
          t0 = t0 || t; var p = Math.min((t - t0) / 1200, 1);
          el.textContent = Math.round(end * p) + (p === 1 ? "+" : "");
          if (p < 1) requestAnimationFrame(step);
        });
      });
    }, { threshold: 0.6 }).observe(facts);
  }

  // Forms: <form data-endpoint="contact/"> posts JSON to the Django API
  document.querySelectorAll("form[data-endpoint]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = f.querySelector(".msg"), ok = true, data = {};
      f.querySelectorAll("input,select,textarea").forEach(function (i) {
        var bad = i.required && (!i.value.trim() || (i.type === "email" && !/^\S+@\S+\.\S+$/.test(i.value)));
        i.classList.toggle("bad", bad); if (bad) ok = false; data[i.name] = i.value;
      });
      function say(t, good) { msg.className = "msg " + (good ? "ok" : "err"); msg.textContent = t; }
      if (!ok) return say("Fill in every required field and enter a valid email address.");
      fetch(window.API_BASE + "/" + f.dataset.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (r) {
          if (!r.ok) return say(Object.values(r.j)[0].toString());
          say(r.j.reference ? "Application received. Your reference is " + r.j.reference + ". Keep it to track your application." : "Message sent. We will reply within two working days.", true);
          f.reset();
        })
        .catch(function () { say("Could not reach the server. Check your connection and try again."); });
    });
  });
})();
