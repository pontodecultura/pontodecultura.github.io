/* ===== config.js ===== */
const APP_CONFIG = {
  brand: {
    name: 'Barriguda',
    subtitle: 'WEB TV',
    description: 'Informação, cultura, entretenimento e transmissão ao vivo em um único portal.',
  },
  contact: {
    email: 'contato@barrigudawebtv.com.br',
    whatsapp: '5500000000000',
    whatsappDisplay: '(00) 00000-0000',
    city: 'Irecê – Bahia',
    address: 'Atualize este campo com o endereço oficial da emissora.'
  },
  live: {
    youtubeEmbed: '',
    youtubeChannel: 'https://www.youtube.com/',
    title: 'Barriguda Web TV — Ao Vivo',
    description: 'Quando houver uma transmissão, informe aqui a URL de incorporação do YouTube.'
  },
  socials: [
    { id: 'facebook', name: 'Facebook', handle: '@BarrigudaWebTV', url: 'https://www.facebook.com/', icon: 'f', className: 'facebook' },
    { id: 'instagram', name: 'Instagram', handle: '@BarrigudaWebTV', url: 'https://www.instagram.com/', icon: '◎', className: 'instagram' },
    { id: 'whatsapp', name: 'WhatsApp', handle: 'Atendimento', url: '', icon: '◔', className: 'whatsapp' },
    { id: 'youtube', name: 'YouTube', handle: 'Canal principal', url: 'https://www.youtube.com/', icon: '▶', className: 'youtube' }
  ],
  colors: ['#0082C9','#E8B800','#D87013','#8CB738','#FFFFFF','#1A1A1A']
};


/* ===== storage.js ===== */
const PREFIX = 'barriguda-webtv:';

const storage = {
  get(key, fallback = null) {
    try { const raw = localStorage.getItem(PREFIX + key); return raw === null ? fallback : JSON.parse(raw); }
    catch { return fallback; }
  },
  set(key, value) {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return value;
  },
  remove(key) { localStorage.removeItem(PREFIX + key); },
  push(key, value) {
    const items = this.get(key, []);
    items.push(value);
    return this.set(key, items);
  }
};


/* ===== model.js ===== */

const defaultGallery = [
  { id: 1, title: 'Identidade Barriguda', subtitle: 'Comunicação regional', src: 'assets/img/logo-barriguda-webtv-radio.png' },
  { id: 2, title: 'Rádio ao vivo', subtitle: 'Transmissão e programação', src: 'assets/img/gallery-radio.svg' },
  { id: 3, title: 'Web TV', subtitle: 'Conteúdo audiovisual', src: 'assets/img/gallery-live.svg' },
];

const model = {
  getConfig() {
    const overrides = storage.get('config', {});
    return {
      ...APP_CONFIG,
      ...overrides,
      brand: { ...APP_CONFIG.brand, ...(overrides.brand || {}) },
      contact: { ...APP_CONFIG.contact, ...(overrides.contact || {}) },
      live: { ...APP_CONFIG.live, ...(overrides.live || {}) },
      socials: overrides.socials || APP_CONFIG.socials
    };
  },
  getGallery() { return storage.get('gallery', defaultGallery); },
  saveMessage(message) { return storage.push('messages', message); },
  getTheme() { return storage.get('theme', 'light'); },
  setTheme(theme) { return storage.set('theme', theme); }
};


/* ===== view.js ===== */

const esc = (s='') => String(s).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
const openExternal = url => url && url !== '#' ? url : '#';

const iconColors = { facebook:'#1877F2', instagram:'#C13584', whatsapp:'#25D366', youtube:'#FF0000' };

const view = {
  layout(content) { return content; },
  home(config, gallery) {
    return `
      <section class="hero">
        <div class="hero-copy">
          <span class="kicker"><span class="live-dot"></span> Barriguda Web TV</span>
          <h1>Comunicação que <span>conecta</span> Irecê.</h1>
          <p>${esc(config.brand.description)}</p>
          <div class="cta-row">
            <a class="btn btn-primary" href="#live">▶ Assistir ao vivo</a>
            <a class="btn btn-ghost" href="#redes">Seguir nas redes</a>
          </div>
        </div>
        <div class="hero-side">
          <div class="hero-card">
            <div class="hero-visual"><img src="${gallery[0]?.src || 'assets/img/logo-barriguda-webtv-radio.png'}" alt="Identidade Barriguda Web TV"></div>
            <div class="live-line"><div class="live-status"><span class="pulse"></span> Canal principal</div><a class="btn btn-ghost" href="#live">Abrir Live</a></div>
          </div>
        </div>
      </section>

      <section>
        <div class="section-head"><div><h2>O portal da emissora</h2><p>Uma estrutura simples para divulgação e atualização local.</p></div></div>
        <div class="grid grid-3">
          <article class="card info-card"><div class="icon" style="background:var(--c-blue)">◉</div><h3>Conteúdo e divulgação</h3><p>Apresente programas, chamadas, informações institucionais e novidades da Barriguda.</p></article>
          <article class="card info-card"><div class="icon" style="background:var(--c-orange)">▶</div><h3>Transmissão ao vivo</h3><p>Uma página dedicada ao YouTube, com área para incorporar a transmissão principal.</p></article>
          <article class="card info-card"><div class="icon" style="background:var(--c-green)">⌁</div><h3>Presença digital</h3><p>Centralize Facebook, Instagram, WhatsApp e YouTube em uma navegação rápida.</p></article>
        </div>
      </section>

      <section>
        <div class="section-head"><div><h2>Redes sociais</h2><p>Seu público encontra a Barriguda em um só lugar.</p></div><a class="btn" style="background:var(--surface);border:1px solid var(--border)" href="#redes">Ver todas</a></div>
        <div class="social-grid">${config.socials.map(s => socialCard(s)).join('')}</div>
      </section>

      <section class="feature-strip">
        <article class="card panel"><h3>Programação em destaque</h3><p>Edite esta área para destacar os programas e transmissões do período.</p><div class="program-list"><div class="program-item"><strong>Programa em destaque</strong><span>Atualize o horário</span></div><div class="program-item"><strong>Entrevistas e notícias</strong><span>Atualize o horário</span></div><div class="program-item"><strong>Transmissão especial</strong><span>YouTube</span></div></div></article>
        <article class="card panel"><h3>Fale com a Barriguda</h3><p>O formulário de contato salva as mensagens localmente no navegador. Para envio externo, use e-mail ou WhatsApp.</p><div class="cta-row"><a class="btn btn-primary" href="#contato">Abrir contato</a></div></article>
      </section>
    `;
  },
  socialPage(config) {
    return `<section class="page-hero"><h1>Redes Sociais</h1><p>Todos os canais oficiais em uma página, com destaque para o YouTube como canal principal.</p></section>
      <section class="social-page-grid">${config.socials.map(s => socialLarge(s)).join('')}</section>`;
  },
  galleryPage(gallery) {
    return `<section class="page-hero"><h1>Fotos</h1><p>Galeria local para registrar eventos, programas, transmissões e materiais institucionais.</p></section>
      <section class="gallery">${gallery.map(item => `<article class="card gallery-card"><button data-gallery-id="${esc(item.id)}" aria-label="Abrir ${esc(item.title)}"><img src="${esc(item.src)}" alt="${esc(item.title)}"><div class="gallery-caption"><strong>${esc(item.title)}</strong><span>${esc(item.subtitle)}</span></div></button></article>`).join('')}</section>`;
  },
  livePage(config) {
    const frame = config.live.youtubeEmbed ? `<iframe src="${esc(config.live.youtubeEmbed)}" title="Barriguda Web TV ao vivo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>` : `<div class="live-placeholder"><div><div class="live-status" style="justify-content:center;margin-bottom:15px"><span class="pulse"></span> Área de transmissão</div><h2>${esc(config.live.title)}</h2><p>${esc(config.live.description)}</p><div class="cta-row" style="justify-content:center"><a class="btn btn-primary" target="_blank" rel="noopener" href="${esc(config.live.youtubeChannel)}">Abrir YouTube</a></div></div></div>`;
    return `<section class="page-hero"><h1>Live</h1><p>Espaço principal para a transmissão da Barriguda Web TV. O endereço pode ser alterado sem banco de dados.</p></section>
      <section class="live-grid"><div class="video-shell">${frame}</div><aside class="card live-sidebar"><div class="status-box"><strong>Canal principal</strong><span>YouTube</span></div><h3>${esc(config.live.title)}</h3><p style="color:var(--muted);line-height:1.6">${esc(config.live.description)}</p><div class="cta-row"><a class="btn btn-primary" target="_blank" rel="noopener" href="${esc(config.live.youtubeChannel)}">Abrir canal</a></div></aside></section>`;
  },
  contactPage(config) {
    return `<section class="page-hero"><h1>Contato</h1><p>Central de contato da Barriguda Web TV. As mensagens do formulário ficam armazenadas localmente neste dispositivo.</p></section>
      <section class="form-grid"><form id="contact-form" class="card form-card"><div class="field"><label for="name">Nome</label><input id="name" name="name" required autocomplete="name" placeholder="Seu nome"></div><div class="field"><label for="email">E-mail</label><input id="email" type="email" name="email" required autocomplete="email" placeholder="voce@email.com"></div><div class="field full"><label for="subject">Assunto</label><input id="subject" name="subject" required placeholder="Assunto da mensagem"></div><div class="field full"><label for="message">Mensagem</label><textarea id="message" name="message" required placeholder="Escreva sua mensagem..."></textarea></div><div class="form-actions"><span class="help-text">Sem servidor: os dados são salvos apenas neste navegador.</span><button class="btn btn-primary" type="submit">Salvar mensagem</button></div></form>
      <aside class="card form-card"><h3>Fale conosco</h3><p style="color:var(--muted);line-height:1.6">Use os canais abaixo para contato direto.</p><div class="contact-list"><div class="contact-item"><div class="dot" style="background:var(--c-blue)">✉</div><div><strong>E-mail</strong><span>${esc(config.contact.email)}</span></div></div><div class="contact-item"><div class="dot" style="background:#25D366">◔</div><div><strong>WhatsApp</strong><span>${esc(config.contact.whatsappDisplay)}</span></div></div><div class="contact-item"><div class="dot" style="background:var(--c-green)">⌖</div><div><strong>Localização</strong><span>${esc(config.contact.city)}<br>${esc(config.contact.address)}</span></div></div></div><div class="cta-row"><a class="btn btn-primary" target="_blank" rel="noopener" href="${esc(whatsappUrl(config))}">WhatsApp</a><a class="btn" href="mailto:${esc(config.contact.email)}" style="background:var(--surface);border:1px solid var(--border)">E-mail</a></div></aside></section>`;
  }
};

function whatsappUrl(config) {
  if (!config.contact.whatsapp) return 'https://wa.me/';
  return `https://wa.me/${String(config.contact.whatsapp).replace(/\D/g,'')}`;
}
function socialCard(s) {
  const href = s.id === 'whatsapp' && !s.url ? 'https://wa.me/' : openExternal(s.url);
  return `<a class="card social-card" href="${esc(href)}" target="_blank" rel="noopener"><div class="social-icon" style="background:${iconColors[s.id] || 'var(--c-blue)'}">${esc(s.icon)}</div><div class="social-meta"><strong>${esc(s.name)}</strong><span>${esc(s.handle)}</span></div></a>`;
}
function socialLarge(s) {
  const href = s.id === 'whatsapp' && !s.url ? 'https://wa.me/' : openExternal(s.url);
  return `<article class="card social-large"><div class="social-icon" style="background:${iconColors[s.id] || 'var(--c-blue)'}">${esc(s.icon)}</div><div class="copy"><strong>${esc(s.name)}</strong><span>${esc(s.handle)}</span></div><a class="open-social" href="${esc(href)}" target="_blank" rel="noopener">Abrir</a></article>`;
}


/* ===== app.js ===== */

const state = { route: routeFromHash() };
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

function routeFromHash() {
  const raw = location.hash.replace(/^#/, '') || 'home';
  return ['home','contato','redes','fotos','live'].includes(raw) ? raw : 'home';
}

function applyTheme() {
  const theme = model.getTheme();
  document.documentElement.dataset.theme = theme;
  $('#theme-toggle').textContent = theme === 'dark' ? '☀' : '☾';
}

function render() {
  state.route = routeFromHash();
  const config = model.getConfig();
  const gallery = model.getGallery();
  const output = {
    home: view.home(config, gallery),
    contato: view.contactPage(config),
    redes: view.socialPage(config),
    fotos: view.galleryPage(gallery),
    live: view.livePage(config)
  }[state.route];
  $('#view').innerHTML = output;
  $$('#main-nav a[data-route]').forEach(a => a.classList.toggle('active', a.dataset.route === state.route));
  document.title = state.route === 'home' ? 'Barriguda Web TV' : `${state.route[0].toUpperCase()}${state.route.slice(1)} — Barriguda Web TV`;
  $('#brand-name').textContent = config.brand.name;
  $('#brand-subtitle').textContent = config.brand.subtitle;
  $('#year').textContent = new Date().getFullYear();
  applyTheme();
  bindPageEvents();
}

function bindPageEvents() {
  const form = $('#contact-form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    model.saveMessage({ ...data, createdAt: new Date().toISOString() });
    form.reset();
    toast('Mensagem salva neste navegador.');
  });
  $$('.gallery-card button').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.dataset.galleryId;
    const item = model.getGallery().find(x => String(x.id) === String(id));
    if (!item) return;
    openModal(`<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title)}" style="width:100%;max-height:72vh;object-fit:contain;border-radius:14px"><div style="padding-top:12px"><strong>${escapeHtml(item.title)}</strong><div style="color:var(--muted);margin-top:4px">${escapeHtml(item.subtitle)}</div></div>`);
  }));
}

function escapeHtml(s='') { return String(s).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
function toast(message) { const el=$('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(window.__toast); window.__toast=setTimeout(()=>el.classList.remove('show'),2800); }
function openModal(content) {
  const wrap = document.createElement('div');
  wrap.className='modal open';
  wrap.innerHTML=`<div class="modal-card"><div class="modal-head"><strong>Visualização</strong><button class="icon-btn" aria-label="Fechar">×</button></div><div class="modal-body">${content}</div></div>`;
  wrap.addEventListener('click', e => { if (e.target===wrap || e.target.matches('button')) wrap.remove(); });
  document.body.appendChild(wrap);
}

window.addEventListener('hashchange', () => { render(); window.scrollTo({top:0, behavior:'smooth'}); $('#main-nav').classList.remove('open'); $('#menu-toggle').setAttribute('aria-expanded','false'); });
$('#menu-toggle').addEventListener('click', () => { const nav=$('#main-nav'); const open=nav.classList.toggle('open'); $('#menu-toggle').setAttribute('aria-expanded', open); });
$('#theme-toggle').addEventListener('click', () => { const next=model.getTheme()==='dark' ? 'light' : 'dark'; model.setTheme(next); applyTheme(); });

render();

