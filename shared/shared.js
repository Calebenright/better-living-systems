// Shared UI behaviors: nav mount, footer mount, reveal-on-scroll, parallax.

(function () {
  const SITE_NAV = [
    { label: 'Home', href: 'index.html', key: 'home' },
    { label: 'Security', href: 'security.html', key: 'security' },
    { label: 'Fire', href: 'fire.html', key: 'fire' },
    { label: 'Smart Home', href: 'smart-home.html', key: 'smart' },
    { label: 'About', href: 'about.html', key: 'about' },
    { label: 'Contact', href: 'contact.html', key: 'contact' },
  ];

  function mountNav(activeKey) {
    const host = document.querySelector('[data-nav]');
    if (!host) return;
    const links = SITE_NAV.map(n =>
      `<a class="nav-link ${n.key === activeKey ? 'active' : ''}" href="${n.href}">${n.label}</a>`
    ).join('');
    host.innerHTML = `
      <nav class="nav">
        <div class="nav-inner">
          <a class="nav-brand" href="index.html">
            <span class="nav-brand-mark"><img src="images/logo-mark-dark.png" alt="BLS"/></span>
            <span class="nav-brand-word"><img src="images/logo-word-dark.png" alt="Better Living Systems"/></span>
          </a>
          <div class="nav-links">${links}</div>
          <div class="nav-right">
            <div class="nav-phone">Orlando · <strong>(407) 696-4411</strong></div>
            <a class="btn" href="contact.html">
              Request consultation
              <svg class="arr" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.2"/></svg>
            </a>
          </div>
        </div>
      </nav>
    `;
  }

  function mountFooter() {
    const host = document.querySelector('[data-footer]');
    if (!host) return;
    host.innerHTML = `
      <footer class="footer">
        <div class="wrap">
          <div class="footer-brand-mark" style="display:flex; align-items:center; gap:16px; flex-wrap:wrap;"><img src="images/logo-mark-light.png" alt="BLS" style="height:36px; width:auto;"/><img src="images/logo-word-light.png" alt="Better Living Systems" style="height:18px; width:auto;"/></div>
          <div class="footer-grid">
            <div class="footer-col">
              <h4>Est. 1979</h4>
              <p style="font-size:14px; color:var(--ivory-2); max-width:38ch; line-height:1.6;">
                A family-owned firm serving Orlando, Winter Garden, and Central Florida with security, fire protection, and smart home systems, since the year the smoke alarm went mainstream.
              </p>
              <div style="margin-top:24px; font-family:var(--mono); font-size:12px; letter-spacing:0.04em; color:var(--brass-2);">
                <div>(407) 696-4411</div>
                <div style="color:var(--ivory-2); margin-top:4px;">info@betterlivingsystems.com</div>
                <div style="color:var(--ivory-2); margin-top:4px;">Winter Garden, FL</div>
              </div>
            </div>
            <div class="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="security.html">Home Security</a></li>
                <li><a href="security.html">Smart Automation</a></li>
                <li><a href="security.html">Access Control</a></li>
                <li><a href="security.html">24/7 Monitoring</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Commercial</h4>
              <ul>
                <li><a href="fire.html">Fire Alarm Systems</a></li>
                <li><a href="fire.html">Sprinklers</a></li>
                <li><a href="fire.html">Inspections</a></li>
                <li><a href="fire.html">Emergency Lighting</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Living</h4>
              <ul>
                <li><a href="smart-home.html">Home Theater</a></li>
                <li><a href="smart-home.html">Samsung Frame</a></li>
                <li><a href="smart-home.html">Lutron Lighting</a></li>
                <li><a href="smart-home.html">Automated Shades</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <div>© 2026 Better Living Systems · Family-owned since 1979</div>
            <div>Licensed · Insured · FL EF20000123</div>
          </div>
        </div>
      </footer>
    `;
  }

  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(e => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(el => io.observe(el));
  }

  function initParallax() {
    const nodes = document.querySelectorAll('[data-parallax]');
    if (!nodes.length) return;
    let ticking = false;
    function update() {
      const y = window.scrollY;
      nodes.forEach(n => {
        const rate = parseFloat(n.dataset.parallax) || 0.2;
        n.style.transform = `translate3d(0, ${y * rate}px, 0)`;
      });
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  window.BLS = { mountNav, mountFooter, initReveal, initParallax };

  document.addEventListener('DOMContentLoaded', () => {
    const active = document.body.dataset.page;
    mountNav(active);
    mountFooter();
    initReveal();
    initParallax();
  });
})();
