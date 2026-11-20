/* Tabbed sections. Loaded in <head> so the right panel shows on first paint.
   Without JavaScript every panel stays visible and the nav works as jump links. */
(function () {
  var tabs = ['home', 'work', 'background'];
  var root = document.documentElement;

  function current() {
    var id = location.hash.slice(1);
    return tabs.indexOf(id) === -1 ? 'home' : id;
  }

  function apply() {
    var id = current();
    root.setAttribute('data-tab', id);

    var links = document.querySelectorAll('.tabs a');
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute('href') === '#' + id) {
        links[i].setAttribute('aria-current', 'page');
      } else {
        links[i].removeAttribute('aria-current');
      }
    }

    // Keep the visitor on the same section when switching language.
    var lang = document.querySelector('.lang');
    if (lang) {
      lang.setAttribute('href', lang.getAttribute('data-base') + (id === 'home' ? '' : '#' + id));
    }
    return id;
  }

  apply();
  document.addEventListener('DOMContentLoaded', apply);
  window.addEventListener('hashchange', function () {
    var panel = document.getElementById(apply());
    window.scrollTo(0, 0);
    if (panel) panel.focus({ preventScroll: true });
  });
})();
