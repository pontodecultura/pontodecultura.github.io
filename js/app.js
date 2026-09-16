import { model } from './model.js';
import { view } from './view.js';

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
