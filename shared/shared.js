// Shared UI behaviors: nav mount, footer mount, reveal-on-scroll, parallax.

(function () {
  const SITE_NAV = [
    { label: 'Home', href: 'index.html', key: 'home' },
    { label: 'Products', href: 'products.html', key: 'products' },
    { label: 'Services', href: 'services.html', key: 'services' },
    { label: 'Showroom', href: 'showroom.html', key: 'showroom' },
    { label: 'Security', href: 'https://hwalarm.com', key: 'security', external: true },
    { label: 'About', href: 'about.html', key: 'about' },
    { label: 'Contact', href: 'contact.html', key: 'contact' },
  ];

  function mountNav(activeKey) {
    const host = document.querySelector('[data-nav]');
    if (!host) return;
    const links = SITE_NAV.map(n => {
      const target = n.external ? ' target="_blank" rel="noopener"' : '';
      return `<a class="nav-link ${n.key === activeKey ? 'active' : ''}" href="${n.href}"${target}>${n.label}</a>`;
    }).join('');
    host.innerHTML = `
      <nav class="nav">
        <div class="nav-inner">
          <a class="nav-brand" href="index.html">
            <span class="nav-brand-mark"><img src="images/logo-mark-dark.png" alt="BLS"/></span>
            <span class="nav-brand-word"><img src="images/logo-word-dark.png" alt="Better Living Systems"/></span>
          </a>
          <div class="nav-links">${links}</div>
          <div class="nav-right">
            <div class="nav-phone">Central Florida · <strong>(407) 696-4411</strong></div>
            <a class="btn" href="contact.html">
              Design Inquiry
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
          <div class="footer-brand-mark" style="display:flex; align-items:flex-end; gap:20px; flex-wrap:wrap;"><img src="images/logo-mark-light.png" alt="BLS" style="height:120px; width:auto;"/><img src="images/logo-word-light.png" alt="Better Living Systems" style="height:48px; width:auto; margin-bottom:16px;"/></div>
          <div class="footer-grid">
            <div class="footer-col">
              <h4>Est. 1979</h4>
              <p style="font-size:14px; color:var(--ivory-2); max-width:38ch; line-height:1.6;">
                An elevated technology experience for residential homes across Central Florida. Family-owned since 1979.
              </p>
              <div style="margin-top:24px; font-family:var(--mono); font-size:12px; letter-spacing:0.04em; color:var(--brass-2);">
                <div>(407) 696-4411</div>
                <div style="color:var(--ivory-2); margin-top:4px;">info@betterlivingsystems.com</div>
                <div style="color:var(--ivory-2); margin-top:4px;">Central Florida</div>
              </div>
            </div>
            <div class="footer-col">
              <h4>Products</h4>
              <ul>
                <li><a href="products.html">Lighting & Keypads</a></li>
                <li><a href="products.html">Audio & Theater</a></li>
                <li><a href="products.html">Shades & Drapery</a></li>
                <li><a href="products.html">Displays</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="services.html">Design & Engineering</a></li>
                <li><a href="services.html">Installation</a></li>
                <li><a href="services.html">Calibration</a></li>
                <li><a href="services.html">Service & Support</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>More</h4>
              <ul>
                <li><a href="showroom.html">Showroom</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Design Inquiry</a></li>
                <li><a href="https://hwalarm.com" target="_blank" rel="noopener">Security → H&W Alarm</a></li>
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
