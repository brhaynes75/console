(function () {
  var PASSWORD = 'stripeconsole';
  var STORAGE_KEY = 'console_auth';

  // Hide page immediately
  document.documentElement.style.visibility = 'hidden';

  if (sessionStorage.getItem(STORAGE_KEY) === '1') {
    document.documentElement.style.visibility = '';
    return;
  }

  function showGate() {
    var overlay = document.createElement('div');
    overlay.id = 'auth-gate';
    overlay.innerHTML =
      '<div style="display:flex;flex-direction:column;align-items:center;gap:16px;">' +
        '<div style="font-size:13px;font-weight:600;color:#6D6D77;text-transform:uppercase;letter-spacing:0.05em;">Console Prototypes</div>' +
        '<input id="auth-input" type="password" placeholder="Password" autocomplete="off" />' +
        '<div id="auth-error" style="font-size:12px;color:#ef4444;height:16px;"></div>' +
      '</div>';

    overlay.style.cssText =
      'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;' +
      'background:#101012;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;';

    var style = document.createElement('style');
    style.textContent =
      '#auth-input{width:240px;padding:10px 12px;border-radius:6px;border:1px solid #1E1E21;' +
      'background:#171719;color:#D3D3D3;font-size:13px;font-family:inherit;outline:none;text-align:center;}' +
      '#auth-input:focus{border-color:#3e3e44;}' +
      '#auth-input::placeholder{color:#6D6D77;opacity:0.5;}';

    document.documentElement.style.visibility = '';
    document.body.appendChild(style);
    document.body.appendChild(overlay);

    var input = document.getElementById('auth-input');
    var error = document.getElementById('auth-error');
    input.focus();

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        if (input.value === PASSWORD) {
          sessionStorage.setItem(STORAGE_KEY, '1');
          overlay.remove();
          style.remove();
        } else {
          error.textContent = 'Incorrect password';
          input.value = '';
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showGate);
  } else {
    showGate();
  }
})();
