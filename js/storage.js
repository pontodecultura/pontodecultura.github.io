const PREFIX = 'barriguda-webtv:';

export const storage = {
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
