/* iimcertificate.in — shared JS */
document.addEventListener('DOMContentLoaded', function () {
  // Nav hamburger
  const ham = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  if (ham && links) {
    ham.addEventListener('click', function () {
      const open = links.classList.toggle('nav-open');
      Object.assign(links.style, open ? {
        display:'flex', flexDirection:'column', position:'absolute',
        top:'68px', left:'0', right:'0', background:'#1A1A2E',
        padding:'1rem 5%', gap:'1rem', zIndex:'199',
        borderBottom:'1px solid rgba(255,255,255,0.08)',
        boxShadow:'0 8px 24px rgba(0,0,0,0.3)'
      } : { display:'none' });
    });
  }
  // Active nav
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    const href = a.getAttribute('href') || '';
    if (href !== '/' && path.includes(href.replace(/\/index\.html$/, '').replace(/\.html$/, ''))) {
      a.classList.add('active');
    }
  });
});

function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

function submitLead(e, formId, successId) {
  e.preventDefault();
  var form = document.getElementById(formId);
  var btn  = form.querySelector('button[type="submit"]');
  if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

  // Collect all named fields
  var d = {};
  form.querySelectorAll('input[name], select[name]').forEach(function(el) {
    d[el.name] = el.value;
  });

  // Auto-attach source + UTM data
  var params = new URLSearchParams(window.location.search);
  d.sourceDomain  = window.location.hostname;
  d.sourcePage    = window.location.pathname;
  d.utmSource     = params.get('utm_source')   || '';
  d.utmMedium     = params.get('utm_medium')   || '';
  d.utmCampaign   = params.get('utm_campaign') || '';

  fetch('https://script.google.com/a/macros/jaro.in/s/AKfycbwkP_F6VWsRwjEawqDTcaqSD7p9Yyb6MkGpW39R9zr-ZbSAte47aJL3XMnXEgVmG6V80g/exec', {
    method : 'POST',
    mode   : 'no-cors',          // Apps Script needs no-cors
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(d)
  })
  .then(function() {
    if (form)                              form.style.display = 'none';
    var s = document.getElementById(successId);
    if (s)                                 s.style.display = 'block';
  })
  .catch(function() {
    // Show success anyway — Apps Script with no-cors always resolves opaquely
    if (form)                              form.style.display = 'none';
    var s = document.getElementById(successId);
    if (s)                                 s.style.display = 'block';
  });
}
