import { APP_CONFIG } from './config.js';
import { storage } from './storage.js';

const defaultGallery = [
  { id: 1, title: 'Identidade Barriguda', subtitle: 'Comunicação regional', src: 'assets/img/logo-barriguda-webtv-radio.png' },
  { id: 2, title: 'Rádio ao vivo', subtitle: 'Transmissão e programação', src: 'assets/img/gallery-radio.svg' },
  { id: 3, title: 'Web TV', subtitle: 'Conteúdo audiovisual', src: 'assets/img/gallery-live.svg' },
];

export const model = {
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
