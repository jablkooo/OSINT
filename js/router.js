const Router = (() => {
  const listeners = [];

  function parse() {
    const hash = location.hash.replace(/^#\/?/, '');
    const parts = hash.split('/').filter(Boolean);
    return { scenario: parts[0] || null, tool: parts[1] || null };
  }

  function navigate() {
    listeners.forEach(fn => fn(parse()));
  }

  function onChange(fn) {
    listeners.push(fn);
    window.addEventListener('hashchange', navigate);
  }

  return { onChange, parse, navigate };
})();
