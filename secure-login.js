/**
 * ============================================================================
 * SECURE GOOGLE LOGIN + REAL-TIME MULTI-DEVICE SYNC + ANTI-COPY  (secure-login.js v2)
 * ----------------------------------------------------------------------------
 * index.html-এ app.js এর ঠিক পরে:   <script src="secure-login.js"></script>
 *
 * নতুন কী আছে (v2):
 *  1. রিয়েল-টাইম সিঙ্ক: যেকোনো ডিভাইসে পরিবর্তন করলে কয়েক সেকেন্ডের মধ্যে লগইন থাকা
 *     অন্য সব ডিভাইসে নিজে থেকেই চলে আসে (প্রতি POLL_SEC সেকেন্ডে Drive পরীক্ষা করে)।
 *  2. মার্জ-ভিত্তিক সিঙ্ক: দুই ডিভাইসে একসাথে কাজ করলেও কারও ডাটা মুছে যায় না
 *     (প্রতিটি রেকর্ডের "সর্বশেষ পরিবর্তন" জিতে যায়, ডিলিটও সব ডিভাইসে পৌঁছায়)।
 *  3. প্রতিটি টেবিল আলাদা ফাইলে — তাই নম্বর/হাজিরা বদলালে ছবি-সহ শিক্ষার্থী ফাইল আবার আপলোড হয় না।
 *  4. Google-এর পপআপ আর নিজে থেকে "জোর করে" খোলে না: ব্যাকগ্রাউন্ডে শুধু নীরব (prompt:none)
 *     নবায়নের চেষ্টা হয়; না হলে স্ট্যাটাস বোতামে "পুনরায় সংযোগ" দেখায়, ক্লিক করলে তবেই পপআপ আসে।
 *  5. কোড কপি/ইনস্পেক্ট প্রতিরোধ (ডোমেইন লক, রাইট-ক্লিক/কপি/ডেভটুলস ব্লক, ফ্রেম-ব্লক)।
 * ============================================================================
 */
(function () {
  'use strict';

  /* ======================= ✏️ আপনাকে শুধু এই অংশ বদলাতে হবে ======================= */
  const CONFIG = {
    // Google Cloud Console থেকে পাওয়া OAuth Client ID (Web application)
    CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',

    // শুধু এই ইমেইল(গুলো) দিয়ে লগইন করা যাবে (ছোট হাতের অক্ষরে লিখুন)
    ALLOWED_EMAILS: ['your.email@gmail.com'],

    // কাজ না করলে এত মিনিট পর অটো লক হবে (0 = বন্ধ)
    IDLE_LOCK_MINUTES: 30,

    // পরিবর্তনের কত সেকেন্ড পর Drive-এ আপলোড শুরু হবে
    AUTO_BACKUP_DELAY_SEC: 3,

    // অন্য ডিভাইসের পরিবর্তন কত সেকেন্ড পর পর খোঁজা হবে (রিয়েল-টাইম ভাব)
    POLL_SEC: 12,

    // টোকেনের মেয়াদ ফুরানোর আগে নীরবে (পপআপ ছাড়া/ক্লিক ছাড়া) নবায়নের চেষ্টা
    SILENT_RENEW: true,

    /* ---------- কোড কপি/ইনস্পেক্ট প্রতিরোধ ---------- */
    PROTECT: {
      ENABLED: true,
      // শুধু এই ডোমেইনে অ্যাপ চলবে। যেমন: ['myschool.web.app']  ([] = সব ডোমেইন; localhost/127.0.0.1 সবসময় চলবে)
      ALLOWED_HOSTS: [],
      BLOCK_CONTEXT_MENU: true,   // রাইট ক্লিক বন্ধ
      BLOCK_COPY: true,           // ইনপুট বাদে অন্য জায়গায় কপি/সিলেক্ট/ড্র্যাগ বন্ধ
      BLOCK_SHORTCUTS: true,      // F12, Ctrl+U, Ctrl+S, Ctrl+Shift+I/J/C বন্ধ
      BLOCK_DEVTOOLS: true,       // ডেভেলপার টুলস খোলা থাকলে অ্যাপ ঢেকে দেবে (ডেস্কটপ)। নিজে ডিবাগ করতে false করুন
      BLOCK_IFRAME: true          // অন্য সাইটে iframe-এ বসিয়ে কপি করা বন্ধ
    },

    DEBUG: false                  // true দিলে window.__SERP চালু হয় (শুধু আপনার টেস্টের জন্য)
  };
  /* =================================================================================== */

  const SCOPES = 'openid email profile https://www.googleapis.com/auth/drive.appdata';
  const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
  const LEGACY_FILE = 'school_erp_backup.json';           // v1 এর একক ব্যাকআপ ফাইল (পুরোনো ডাটা আনার জন্য)
  const FILE_PREFIX = 'serp_v2_';
  const DATA_STORES = ['students', 'subjects', 'attendance', 'marks', 'qrattendance', 'fees'];
  const ALL_STORES = ['settings'].concat(DATA_STORES);
  const KEYPATH = { settings: 'id', students: 'recordId', subjects: 'id', attendance: 'id', marks: 'id', qrattendance: 'id', fees: 'id' };
  const TOMB_KEEP_MS = 90 * 24 * 3600 * 1000;
  const LS = { dirty: 'serp_sync_dirty_v2', mtime: 'serp_sync_mtime_v2', last: 'serp_sync_last_time', tomb: 'serp_tomb_v2', theme: 'serp_theme' };

  const allowed = CONFIG.ALLOWED_EMAILS.map(e => String(e).trim().toLowerCase()).filter(Boolean);
  const configOK = CONFIG.CLIENT_ID && !/^YOUR_/.test(CONFIG.CLIENT_ID) && allowed.length && !allowed.some(e => /^your\./.test(e));

  /* ----------------------------- ছোট ইউটিলিটি ----------------------------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const lsGet = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } };
  const lsDel = k => { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } };
  const jget = (k, d) => { try { const v = JSON.parse(lsGet(k)); return v == null ? d : v; } catch (e) { return d; } };
  const maskEmail = e => { const [u, d] = String(e).split('@'); return (u ? u[0] : '') + '•••' + (u && u.length > 1 ? u.slice(-1) : '') + '@' + (d || ''); };
  const fmtTime = iso => { try { return new Date(iso).toLocaleString('bn-BD'); } catch (e) { return iso || '—'; } };
  const isEditable = el => !!(el && el.closest && el.closest('input,textarea,select,[contenteditable="true"],[contenteditable=""]'));

  /* ====================================================================================
   *  কোড কপি / ইনস্পেক্ট প্রতিরোধ
   *  সত্য কথা: ব্রাউজারে যে কোড চলে তা ১০০% লুকানো যায় না — এগুলো "বাধা" (deterrent), যাতে সাধারণ মানুষ
   *  সহজে কপি করতে না পারে। আসল সুরক্ষা: ডোমেইন লক + Google লগইন + ডাটা আপনার নিজের Drive-এ।
   * ==================================================================================== */
  const Protect = {
    init() {
      const P = CONFIG.PROTECT;
      if (!P || !P.ENABLED) return true;
      const host = location.hostname;
      const local = !host || host === 'localhost' || host === '127.0.0.1' || location.protocol === 'file:';

      // ১) ডোমেইন লক — কেউ ফাইল কপি করে নিজের সাইটে চালালে অ্যাপ খুলবে না
      if (P.ALLOWED_HOSTS && P.ALLOWED_HOSTS.length && !local && !P.ALLOWED_HOSTS.includes(host)) {
        document.documentElement.innerHTML = '<body style="font:700 16px sans-serif;padding:40px;text-align:center;color:#be123c">⛔ এই ডোমেইন থেকে অ্যাপ চালানোর অনুমতি নেই।</body>';
        throw new Error('host-locked');
      }
      // ২) iframe/ক্লোন এম্বেড বন্ধ
      if (P.BLOCK_IFRAME && window.top !== window.self) {
        try { window.top.location = window.self.location; } catch (e) { /* cross-origin */ }
        document.documentElement.innerHTML = '<body style="font:700 16px sans-serif;padding:40px;text-align:center;color:#be123c">⛔ এই পেজ অন্য সাইটের ভেতরে খোলা যাবে না।</body>';
        throw new Error('framed');
      }
      // ৩) CSS: লেখা সিলেক্ট বন্ধ (ফর্মের ঘর বাদে) — প্রিন্টে কোনো প্রভাব নেই
      if (P.BLOCK_COPY) {
        const st = document.createElement('style');
        st.textContent = 'body{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}' +
          'input,textarea,select,[contenteditable]{-webkit-user-select:text;user-select:text}' +
          'img{-webkit-user-drag:none;user-drag:none}';
        (document.head || document.documentElement).appendChild(st);
      }
      if (P.BLOCK_CONTEXT_MENU) document.addEventListener('contextmenu', e => { if (!isEditable(e.target)) e.preventDefault(); }, true);
      if (P.BLOCK_COPY) {
        ['copy', 'cut', 'selectstart', 'dragstart'].forEach(ev =>
          document.addEventListener(ev, e => { if (!isEditable(e.target)) e.preventDefault(); }, true));
      }
      if (P.BLOCK_SHORTCUTS) {
        document.addEventListener('keydown', e => {
          const k = String(e.key || '').toLowerCase();
          const ctrl = e.ctrlKey || e.metaKey;
          const bad = e.key === 'F12' ||
            (ctrl && e.shiftKey && ['i', 'j', 'c', 'k'].includes(k)) ||
            (ctrl && !e.shiftKey && ['u', 's'].includes(k)) ||
            (e.metaKey && e.altKey && ['i', 'j', 'u'].includes(k));
          if (bad) { e.preventDefault(); e.stopPropagation(); }
        }, true);
      }
      if (P.BLOCK_DEVTOOLS && !(navigator.maxTouchPoints > 0)) this.watchDevtools();
      return true;
    },
    watchDevtools() {
      let veil = null;
      const open = () => {
        const dw = window.outerWidth - window.innerWidth, dh = window.outerHeight - window.innerHeight;
        return dw > 220 || dh > 480;                         // ডকড DevTools (পাশে/নিচে) ধরার জন্য নিরাপদ সীমা
      };
      setInterval(() => {
        const o = open();
        if (o && !veil) {
          veil = document.createElement('div');
          veil.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;font:700 16px sans-serif;text-align:center;padding:24px';
          veil.textContent = '🔒 নিরাপত্তার জন্য ডেভেলপার টুলস বন্ধ করুন, তারপর এই পেজ আবার ব্যবহার করুন।';
          document.body.appendChild(veil);
        } else if (!o && veil) { veil.remove(); veil = null; }
      }, 1000);
    }
  };
  Protect.init();

  /* ------------------------------ স্টাইল ------------------------------ */
  function injectStyle() {
    if ($('#serp-style')) return;
    const st = document.createElement('style');
    st.id = 'serp-style';
    st.textContent = `
      #serp-auth{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;
        background:linear-gradient(135deg,#1e3a8a 0%,#312e81 55%,#115e59 100%);font-family:'Noto Sans Bengali','Hind Siliguri',sans-serif}
      #serp-auth .card{width:100%;max-width:420px;background:#fff;color:#0f172a;border-radius:20px;padding:28px 24px;box-shadow:0 30px 70px -15px rgba(0,0,0,.55);text-align:center}
      #serp-auth .lock{width:64px;height:64px;margin:0 auto 12px;border-radius:18px;background:linear-gradient(135deg,#1d4ed8,#0d9488);display:flex;align-items:center;justify-content:center;font-size:30px}
      #serp-auth h1{font-size:19px;font-weight:800;margin:0 0 4px}
      #serp-auth p.sub{font-size:13px;color:#475569;margin:0 0 18px;line-height:1.6}
      #serp-auth button.gbtn{width:100%;display:flex;align-items:center;justify-content:center;gap:10px;padding:12px 14px;border-radius:12px;border:1.5px solid #cbd5e1;background:#fff;color:#1e293b;font-weight:700;font-size:14px;cursor:pointer;transition:.15s}
      #serp-auth button.gbtn:hover:not(:disabled){background:#f1f5f9;border-color:#2563eb}
      #serp-auth button.gbtn:disabled{opacity:.55;cursor:wait}
      #serp-auth .msg{margin-top:14px;font-size:13px;line-height:1.6;border-radius:10px;padding:10px 12px;text-align:left;display:none;white-space:pre-line}
      #serp-auth .msg.err{display:block;background:#ffe4e6;color:#9f1239;border:1px solid #fda4af}
      #serp-auth .msg.info{display:block;background:#e0f2fe;color:#075985;border:1px solid #7dd3fc}
      #serp-auth .foot{margin-top:16px;font-size:11px;color:#64748b;line-height:1.6}
      #serp-widget{position:fixed;left:12px;bottom:12px;z-index:2147482000;font-family:'Noto Sans Bengali','Hind Siliguri',sans-serif}
      #serp-pill{display:flex;align-items:center;gap:6px;background:#0f172a;color:#fff;border:1px solid #334155;border-radius:999px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 8px 20px -6px rgba(0,0,0,.45)}
      #serp-pill .dot{width:8px;height:8px;border-radius:50%;background:#94a3b8}
      #serp-pill.ok .dot{background:#34d399}#serp-pill.busy .dot{background:#fbbf24;animation:serpPulse 1s infinite}
      #serp-pill.err .dot{background:#fb7185}#serp-pill.wait .dot{background:#60a5fa}
      #serp-pill.auth{background:#9a3412;border-color:#fb923c}#serp-pill.auth .dot{background:#fdba74;animation:serpPulse 1s infinite}
      @keyframes serpPulse{50%{opacity:.25}}
      #serp-panel{display:none;position:absolute;left:0;bottom:44px;width:290px;background:#fff;color:#0f172a;border:1px solid #cbd5e1;border-radius:14px;padding:14px;box-shadow:0 18px 40px -12px rgba(0,0,0,.5);font-size:12.5px}
      #serp-panel.open{display:block}
      #serp-panel .row{margin-bottom:8px;line-height:1.5}
      #serp-panel .row b{color:#1d4ed8}
      #serp-panel button{width:100%;margin-top:6px;padding:8px 10px;border-radius:10px;border:0;font-weight:800;font-size:12.5px;cursor:pointer}
      #serp-panel .b1{background:#10b981;color:#052e16}#serp-panel .b2{background:#fbbf24;color:#451a03}
      #serp-panel .b3{background:#e2e8f0;color:#0f172a}#serp-panel .b4{background:#fecdd3;color:#881337}
      #serp-modal{position:fixed;inset:0;z-index:2147483500;background:rgba(2,6,23,.65);display:flex;align-items:center;justify-content:center;padding:16px;font-family:'Noto Sans Bengali','Hind Siliguri',sans-serif}
      #serp-modal .box{background:#fff;color:#0f172a;border-radius:16px;max-width:440px;width:100%;padding:20px}
      #serp-modal h3{margin:0 0 8px;font-size:17px;font-weight:800}
      #serp-modal p{margin:0 0 14px;font-size:13.5px;line-height:1.65;white-space:pre-line}
      #serp-modal button{display:block;width:100%;margin-top:8px;padding:10px;border:0;border-radius:10px;font-weight:800;font-size:13.5px;cursor:pointer}
      @media print{#serp-widget,#serp-auth,#serp-modal{display:none!important}}
    `;
    document.head.appendChild(st);
  }

  /* ------------------------------ সাধারণ মোডাল ------------------------------ */
  function askChoice(title, text, choices) {
    return new Promise(resolve => {
      const m = document.createElement('div');
      m.id = 'serp-modal';
      m.innerHTML = `<div class="box"><h3>${esc(title)}</h3><p>${esc(text)}</p></div>`;
      const box = m.firstChild;
      choices.forEach(c => {
        const b = document.createElement('button');
        b.textContent = c.label;
        b.style.background = c.bg || '#e2e8f0';
        b.style.color = c.fg || '#0f172a';
        b.onclick = () => { m.remove(); resolve(c.value); };
        box.appendChild(b);
      });
      document.body.appendChild(m);
    });
  }

  /* ====================================================================================
   *  মার্জ ইঞ্জিন (বিশুদ্ধ ফাংশন — UI/নেটওয়ার্ক ছাড়া, তাই সহজে টেস্ট করা যায়)
   *  নিয়ম: প্রতিটি রেকর্ডে `_u` (সর্বশেষ পরিবর্তনের সময়)। যার `_u` বেশি সে জেতে।
   *         ডিলিট হলে "কবরফলক" (tombstone) থাকে; কবরফলকের সময় ≥ রেকর্ডের `_u` হলে রেকর্ড মুছে যায়।
   * ==================================================================================== */
  const Merge = {
    u: r => (r && Number(r._u)) || 0,

    special(store, win, lose) {
      if (!lose) return win;
      if (store === 'attendance') {
        // একই মাসের হাজিরা দুই ডিভাইসে আলাদা শিক্ষার্থীর জন্য নেওয়া হলে দুটোই রাখা
        const recs = Object.assign({}, win.records || {});
        let added = false;
        Object.keys(lose.records || {}).forEach(uid => { if (!(uid in recs)) { recs[uid] = lose.records[uid]; added = true; } });
        return added ? Object.assign({}, win, { records: recs }) : win;
      }
      if (store === 'settings') {
        const out = Object.assign({}, win);
        out.sessions = Array.from(new Set([].concat(win.sessions || [], lose.sessions || []))).sort();
        return out;
      }
      return win;
    },

    /** একটি টেবিলের লোকাল ও রিমোট মার্জ */
    store(store, localRecs, localTomb, remoteRecs, remoteTomb, now) {
      const kp = KEYPATH[store];
      const L = new Map((localRecs || []).filter(Boolean).map(r => [String(r[kp]), r]));
      const R = new Map((remoteRecs || []).filter(Boolean).map(r => [String(r[kp]), r]));
      const T = {};
      [localTomb || {}, remoteTomb || {}].forEach(t => Object.keys(t).forEach(k => { T[k] = Math.max(T[k] || 0, Number(t[k]) || 0); }));

      const out = new Map(), toPut = [], toDel = [];
      let remoteChanged = false;
      const keys = new Set([...L.keys(), ...R.keys()]);

      keys.forEach(k => {
        const l = L.get(k), r = R.get(k);
        let pick, fromRemote = false;
        if (l && r) {
          const ul = this.u(l), ur = this.u(r);
          if (ur > ul) { pick = this.special(store, r, l); fromRemote = true; }
          else if (ul > ur) { pick = this.special(store, l, r); }
          else { pick = this.special(store, l, r); }
        } else if (l) { pick = l; }
        else { pick = r; fromRemote = true; }

        const t = T[k] || 0;
        if (t && t >= this.u(pick)) {                      // মুছে ফেলা হয়েছে
          if (l) toDel.push(k);
          if (r) remoteChanged = true;
          return;
        }
        out.set(k, pick);

        if (!l) toPut.push(pick);                          // শুধু রিমোটে ছিল
        else if (fromRemote) toPut.push(pick);             // রিমোট নতুন
        else if (l !== pick) toPut.push(pick);             // স্পেশাল মার্জে লোকাল বদলেছে

        if (!r) remoteChanged = true;                      // শুধু লোকালে ছিল
        else if (!fromRemote && (this.u(l) > this.u(r) || pick !== l)) remoteChanged = true;
        else if (fromRemote && pick !== r) remoteChanged = true;
      });

      // কবরফলক ছাঁটাই: জীবিত রেকর্ডের চেয়ে পুরোনো বা ৯০ দিনের বেশি পুরোনো সরানো
      const tomb = {};
      Object.keys(T).forEach(k => {
        if (out.has(k)) return;                              // রেকর্ড আবার জীবিত → কবরফলক অপ্রয়োজনীয়
        if ((now || Date.now()) - T[k] > TOMB_KEEP_MS) return;  // ৯০ দিনের বেশি পুরোনো
        tomb[k] = T[k];
      });
      Object.keys(tomb).forEach(k => { if ((remoteTomb || {})[k] == null || remoteTomb[k] < tomb[k]) remoteChanged = true; });

      return { records: Array.from(out.values()), tomb, toPut, toDel, localChanged: !!(toPut.length || toDel.length), remoteChanged };
    }
  };

  /* ====================================================================================
   *  লোকাল ট্র্যাকিং: `_u` স্ট্যাম্প + কবরফলক + "ময়লা" (dirty) চিহ্ন
   * ==================================================================================== */
  const Track = {
    last: 0,
    stamp() { const n = Date.now(); this.last = n > this.last ? n : this.last + 1; return this.last; },
    tomb: jget(LS.tomb, {}),
    saveTomb() { lsSet(LS.tomb, JSON.stringify(this.tomb)); },
    addTomb(store, key) { (this.tomb[store] = this.tomb[store] || {})[String(key)] = this.stamp(); this.saveTomb(); },
    dropTomb(store, key) { if (this.tomb[store] && this.tomb[store][String(key)] != null) { delete this.tomb[store][String(key)]; this.saveTomb(); } },
    dirtySet() { return new Set(jget(LS.dirty, [])); },
    markDirty(store) { const s = this.dirtySet(); if (s.has(store)) return; s.add(store); lsSet(LS.dirty, JSON.stringify([...s])); },
    isDirty() { return this.dirtySet().size > 0; }
  };

  // মূল (র') মেথডগুলো ধরে রাখা — সিঙ্ক নিজে লিখলে এগুলো ব্যবহার করবে (স্ট্যাম্প/ট্র্যাকিং ছাড়া)
  const RAW = {
    put: LocalDB.prototype.put, bulkPut: LocalDB.prototype.bulkPut,
    delete: LocalDB.prototype.delete, clear: LocalDB.prototype.clear
  };

  LocalDB.prototype.put = async function (store, item) {
    if (item && typeof item === 'object' && KEYPATH[store]) { item._u = Track.stamp(); Track.dropTomb(store, item[KEYPATH[store]]); }
    const r = await RAW.put.apply(this, arguments);
    Sync.markDirty(store);
    return r;
  };
  LocalDB.prototype.bulkPut = async function (store, items) {
    if (Array.isArray(items) && KEYPATH[store]) items.forEach(it => { if (it && typeof it === 'object') { it._u = Track.stamp(); Track.dropTomb(store, it[KEYPATH[store]]); } });
    const r = await RAW.bulkPut.apply(this, arguments);
    Sync.markDirty(store);
    return r;
  };
  LocalDB.prototype.delete = async function (store, key) {
    if (KEYPATH[store]) Track.addTomb(store, key);
    const r = await RAW.delete.apply(this, arguments);
    Sync.markDirty(store);
    return r;
  };
  LocalDB.prototype.clear = async function (store) {
    if (KEYPATH[store]) {
      try { (await this.getAll(store)).forEach(r => Track.addTomb(store, r[KEYPATH[store]])); } catch (e) { /* ignore */ }
    }
    const r = await RAW.clear.apply(this, arguments);
    Sync.markDirty(store);
    return r;
  };

  /* ============================== GOOGLE AUTH ============================== */
  const Auth = {
    token: null,
    expiresAt: 0,
    email: null,
    tokenClient: null,
    lastSilentTry: 0,

    loadGIS() {
      return new Promise((resolve, reject) => {
        if (window.google && google.accounts && google.accounts.oauth2) return resolve();
        let s = $('script[data-serp-gis]');
        if (!s) {
          s = document.createElement('script');
          s.src = 'https://accounts.google.com/gsi/client';
          s.async = true; s.defer = true;
          s.setAttribute('data-serp-gis', '1');
          document.head.appendChild(s);
        }
        let tries = 0;
        const t = setInterval(() => {
          if (window.google && google.accounts && google.accounts.oauth2) { clearInterval(t); resolve(); }
          else if (++tries > 100) { clearInterval(t); reject(new Error('Google লগইন লাইব্রেরি লোড হয়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।')); }
        }, 100);
      });
    },

    /**
     * টোকেন আনে এবং Google-এর tokeninfo দিয়ে যাচাই করে (ইমেইল, ক্লায়েন্ট, স্কোপ)।
     * prompt = 'select_account' → ব্যবহারকারীর ক্লিকে (ইন্টারঅ্যাকটিভ)
     * prompt = 'none'           → নীরব নবায়ন (কোনো স্ক্রিন দেখায় না; ব্যর্থ হলে error)
     */
    async acquire(prompt) {
      await this.loadGIS();
      const resp = await new Promise((resolve, reject) => {
        if (!this.tokenClient) {
          this.tokenClient = google.accounts.oauth2.initTokenClient({ client_id: CONFIG.CLIENT_ID, scope: SCOPES, callback: () => {} });
        }
        this.tokenClient.callback = r => (r && r.error) ? reject(new Error(r.error_description || r.error)) : resolve(r);
        this.tokenClient.error_callback = e => reject(new Error((e && (e.message || e.type)) || 'popup_error'));
        const opts = { prompt: prompt };
        if (this.email) opts.hint = this.email; else if (allowed.length === 1) opts.hint = allowed[0];
        this.tokenClient.requestAccessToken(opts);
      });

      if (!google.accounts.oauth2.hasGrantedAllScopes(resp, DRIVE_SCOPE)) {
        try { google.accounts.oauth2.revoke(resp.access_token, () => {}); } catch (e) { /* ignore */ }
        throw new Error('Google Drive ব্যাকআপের অনুমতি দেওয়া আবশ্যক। আবার লগইন করে সব অনুমতি টিক দিন।');
      }

      const r = await fetch('https://oauth2.googleapis.com/tokeninfo?access_token=' + encodeURIComponent(resp.access_token));
      if (!r.ok) throw new Error('টোকেন যাচাই করা যায়নি। আবার চেষ্টা করুন।');
      const info = await r.json();
      const email = String(info.email || '').toLowerCase();
      const cidOK = info.aud === CONFIG.CLIENT_ID || info.azp === CONFIG.CLIENT_ID;
      const verified = info.email_verified === true || info.email_verified === 'true';

      if (!cidOK || !verified || !email || !allowed.includes(email)) {
        try { google.accounts.oauth2.revoke(resp.access_token, () => {}); } catch (e) { /* ignore */ }
        const err = new Error(email && cidOK
          ? `এই Google অ্যাকাউন্টের (${email}) এই সিস্টেমে প্রবেশের অনুমতি নেই।\nশুধুমাত্র অনুমোদিত অ্যাকাউন্ট দিয়ে লগইন করুন।`
          : 'অ্যাকাউন্ট যাচাই ব্যর্থ হয়েছে।');
        err.denied = true;
        throw err;
      }
      if (this.email && this.email !== email) {
        try { google.accounts.oauth2.revoke(resp.access_token, () => {}); } catch (e) { /* ignore */ }
        throw new Error('সেশনের অ্যাকাউন্ট বদল হয়েছে। পুনরায় লগইন করুন।');
      }

      this.token = resp.access_token;
      this.email = email;
      this.expiresAt = Date.now() + (Number(resp.expires_in || info.expires_in || 3600) - 90) * 1000;
      return email;
    },

    /** ব্যাকগ্রাউন্ড কাজের জন্য: কখনোই ইউজারকে বিরক্ত করে এমন পপআপ/অ্যাকাউন্ট-সিলেক্ট খোলে না */
    async validToken() {
      if (this.token && Date.now() < this.expiresAt) return this.token;
      if (CONFIG.SILENT_RENEW && Date.now() - this.lastSilentTry > 120000 && !document.hidden) {
        this.lastSilentTry = Date.now();
        try { await this.acquire('none'); return this.token; } catch (e) { /* নীরব নবায়ন হয়নি */ }
      }
      const err = new Error('reauth_required');
      err.reauth = true;
      throw err;
    },

    clear() { this.token = null; this.expiresAt = 0; }
  };

  /* ============================== লগইন স্ক্রিন ============================== */
  function showLoginScreen(mode) {
    return new Promise(resolve => {
      injectStyle();
      const old = $('#serp-auth'); if (old) old.remove();
      const el = document.createElement('div');
      el.id = 'serp-auth';
      const maskedList = allowed.map(maskEmail).join(', ');
      el.innerHTML = `
        <div class="card">
          <div class="lock">🔐</div>
          <h1>${mode === 'lock' ? 'সেশন লক করা হয়েছে' : 'স্মার্ট স্কুল ইআরপি — নিরাপদ লগইন'}</h1>
          <p class="sub">${mode === 'lock' ? 'নিষ্ক্রিয় থাকায় নিরাপত্তার জন্য লক হয়েছে। আবার লগইন করুন।' : 'শুধুমাত্র অনুমোদিত Google অ্যাকাউন্ট দিয়ে প্রবেশ করা যাবে।'}<br><b>${esc(maskedList)}</b></p>
          <button class="gbtn" id="serp-login-btn" type="button">
            <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/><path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>
            <span>Google অ্যাকাউন্ট দিয়ে লগইন</span>
          </button>
          <div class="msg" id="serp-msg"></div>
          <div class="foot">🔒 লগইনের পর আপনার সব তথ্য আপনার নিজের Google Drive-এ নিরাপদে সিঙ্ক হবে এবং লগইন করা সব ডিভাইসে আপডেট থাকবে।</div>
        </div>`;
      document.body.appendChild(el);
      const btn = $('#serp-login-btn', el);
      const msg = $('#serp-msg', el);
      const show = (t, cls) => { msg.className = 'msg ' + cls; msg.textContent = t; };

      if (!configOK) {
        btn.disabled = true;
        show('⚠ সেটআপ অসম্পূর্ণ: secure-login.js ফাইলের উপরে CLIENT_ID ও ALLOWED_EMAILS সেট করুন।\n(নিরাপত্তার জন্য সেটআপ ছাড়া অ্যাপ খুলবে না।)', 'err');
        return;
      }

      btn.onclick = async () => {
        btn.disabled = true;
        show('Google-এর সাথে সংযোগ হচ্ছে…', 'info');
        try {
          await Auth.acquire('select_account');
          el.remove();
          resolve(Auth.email);
        } catch (e) {
          btn.disabled = false;
          show(e && e.message ? e.message : 'লগইন ব্যর্থ হয়েছে।', 'err');
        }
      };
    });
  }

  /* ============================== GOOGLE DRIVE ============================== */
  const Drive = {
    async req(url, opts) {
      const token = await Auth.validToken();
      const res = await fetch(url, Object.assign({}, opts, {
        headers: Object.assign({ Authorization: 'Bearer ' + token }, (opts && opts.headers) || {})
      }));
      if (res.status === 401) { Auth.expiresAt = 0; const e = new Error('reauth_required'); e.reauth = true; throw e; }
      if (!res.ok) {
        const t = await res.text().catch(() => '');
        throw new Error('Drive ত্রুটি ' + res.status + (t ? ': ' + t.slice(0, 160) : ''));
      }
      return res;
    },

    /** appDataFolder-এর সব ফাইল (নাম → সর্বশেষ ফাইল) — একটিই হালকা রিকোয়েস্ট */
    async listAll() {
      const q = encodeURIComponent('trashed=false');
      const res = await this.req(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${q}&orderBy=modifiedTime%20desc&pageSize=100&fields=files(id,name,modifiedTime,size)`);
      const j = await res.json();
      const map = {};
      (j.files || []).forEach(f => { if (!map[f.name]) map[f.name] = f; });
      return map;
    },

    async download(id) {
      const res = await this.req(`https://www.googleapis.com/drive/v3/files/${id}?alt=media`);
      return res.text();
    },

    async upload(existingId, name, jsonText) {
      const meta = existingId ? { name } : { name, parents: ['appDataFolder'] };
      const fields = 'id,modifiedTime';
      const method = existingId ? 'PATCH' : 'POST';
      const base = 'https://www.googleapis.com/upload/drive/v3/files' + (existingId ? '/' + existingId : '');
      const bytes = new Blob([jsonText]).size;

      if (bytes > 4 * 1024 * 1024) {
        const init = await this.req(`${base}?uploadType=resumable&fields=${fields}`, {
          method,
          headers: { 'Content-Type': 'application/json; charset=UTF-8', 'X-Upload-Content-Type': 'application/json' },
          body: JSON.stringify(meta)
        });
        const loc = init.headers.get('Location');
        if (loc) {
          const put = await fetch(loc, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: jsonText });
          if (!put.ok) throw new Error('Drive আপলোড ব্যর্থ ' + put.status);
          return put.json();
        }
      }
      const boundary = 'serp' + Math.random().toString(36).slice(2);
      const body = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(meta)}\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n${jsonText}\r\n--${boundary}--`;
      const res = await this.req(`${base}?uploadType=multipart&fields=${fields}`, {
        method,
        headers: { 'Content-Type': 'multipart/related; boundary=' + boundary },
        body
      });
      return res.json();
    }
  };

  /* ============================ লোকাল ডাটা পড়া/লেখা ============================ */
  async function readStore(store) {
    if (store === 'settings') { const s = await App.db.get('settings', 'main'); return s ? [s] : []; }
    return App.db.getAll(store);
  }

  async function localHasData() {
    const st = await App.db.get('settings', 'main');
    if (st && (st.nameBn || st.nameEn || st.eiin)) return true;
    for (const s of ['students', 'marks', 'attendance', 'fees', 'qrattendance']) {
      if ((await App.db.getAll(s)).length) return true;
    }
    return false;
  }

  /** মার্জের ফলাফল লোকাল IndexedDB-তে বসানো (স্ট্যাম্প/ট্র্যাকিং এড়িয়ে — মূল মেথড দিয়ে) */
  async function writeLocal(store, toPut, toDel) {
    const db = App.db;
    if (toDel.length) for (const k of toDel) await RAW.delete.call(db, store, store === 'settings' ? 'main' : k);
    if (toPut.length) {
      if (store === 'settings') {
        const cur = await db.get('settings', 'main');
        const next = Object.assign({}, toPut[0]);
        if (cur) { next.theme = cur.theme; next.activeSession = cur.activeSession; }       // এগুলো প্রতি ডিভাইসের নিজস্ব
        if (Array.isArray(next.sessions) && next.activeSession && !next.sessions.includes(next.activeSession)) next.sessions = next.sessions.concat(next.activeSession).sort();
        await RAW.put.call(db, 'settings', next);
      }
      else await RAW.bulkPut.call(db, store, toPut);
    }
  }

  /** ম্যানুয়াল সম্পূর্ণ রিস্টোর: লোকাল ডাটা Drive-এর ডাটা দিয়ে প্রতিস্থাপন */
  async function replaceLocalStore(store, records) {
    const db = App.db;
    if (store === 'settings') { if (records[0]) await RAW.put.call(db, 'settings', records[0]); return; }
    await RAW.clear.call(db, store);
    if (records.length) await RAW.bulkPut.call(db, store, records);
  }

  async function downloadLocalSnapshot(prefix) {
    const p = { meta: { app: 'SchoolERP_BD_v5', exportedAt: new Date().toISOString(), source: 'local-snapshot', schema: 2 }, settings: await App.db.get('settings', 'main') || App.settings };
    for (const s of DATA_STORES) p[s] = await App.db.getAll(s);
    const blob = new Blob([JSON.stringify(p)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prefix}_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  }

  /* ============================== সিঙ্ক ইঞ্জিন ============================== */
  const Sync = {
    enabled: false,
    appReady: false,
    paused: false,            // লক স্ক্রিনে থাকলে true
    running: false,
    again: false,
    timer: null,
    pollTimer: null,
    needAuth: false,
    state: 'idle',
    lastError: '',
    pendingUI: false,
    lastToast: 0,

    mtimes() { return jget(LS.mtime, {}); },
    setMtime(store, v) { const m = this.mtimes(); m[store] = v; lsSet(LS.mtime, JSON.stringify(m)); },

    isDirty() { return Track.isDirty(); },

    markDirty(store) {
      Track.markDirty(store);
      if (!this.enabled) return;
      this.setState('wait');
      this.schedule(CONFIG.AUTO_BACKUP_DELAY_SEC * 1000);
    },

    schedule(ms) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.cycle(), ms);
    },

    setState(s, err) {
      this.state = s;
      this.lastError = err || '';
      UI.refresh();
    },

    startPolling() {
      clearInterval(this.pollTimer);
      const tick = () => {
        if (!this.enabled || this.paused || this.needAuth || this.running) return;
        if (this.pendingUI && this.appReady && !(App.isUserEditing && App.isUserEditing())) this.refreshUI();
        this.cycle({ poll: true });
      };
      this.pollTimer = setInterval(tick, Math.max(5, CONFIG.POLL_SEC) * 1000);
    },

    /** একটি পূর্ণ সিঙ্ক রাউন্ড: Drive-এর পরিবর্তন টানা → মার্জ → লোকালে বসানো → আপলোড */
    async cycle(opts) {
      opts = opts || {};
      if (!this.enabled || this.paused) return false;
      if (this.running) { this.again = true; return false; }
      if (!navigator.onLine) { if (!opts.poll) this.setState('err', 'ইন্টারনেট নেই — সংযোগ ফিরলে অটো সিঙ্ক হবে'); return false; }
      if (this.needAuth && !opts.manual) return false;
      this.running = true;
      clearTimeout(this.timer);
      let localChanged = false;
      try {
        if (!opts.poll) this.setState('busy');
        const files = await Drive.listAll();
        this.needAuth = false;
        const mt = this.mtimes();
        const dirty = Track.dirtySet();
        const legacy = files[LEGACY_FILE];
        const hasAnyV2 = ALL_STORES.some(s => files[FILE_PREFIX + s + '.json']);
        let legacyData = null;

        // v1 এর পুরোনো একক ব্যাকআপ থেকে একবার ডাটা আনা (নতুন ফাইল এখনো নেই এমন অবস্থায়)
        if (!hasAnyV2 && legacy && !jget('serp_legacy_done', false)) {
          try { legacyData = JSON.parse(await Drive.download(legacy.id)); } catch (e) { legacyData = null; }
          if (!legacyData || !legacyData.meta || legacyData.meta.app !== 'SchoolERP_BD_v5') legacyData = null;
        }

        for (const store of ALL_STORES) {
          const name = FILE_PREFIX + store + '.json';
          const rf = files[name];
          const needPull = !!rf && rf.modifiedTime !== mt[store];
          let needPush = dirty.has(store) || !!opts.force;
          const seqDirty = dirty.has(store);

          let remoteRecs = null, remoteTomb = {};
          if (needPull) {
            const j = JSON.parse(await Drive.download(rf.id));
            if (!j || !Array.isArray(j.records)) throw new Error('Drive-এর ' + store + ' ফাইলের ফরম্যাট সঠিক নয়');
            remoteRecs = j.records; remoteTomb = j.tombstones || {};
          } else if (!rf && legacyData) {
            remoteRecs = store === 'settings' ? (legacyData.settings ? [legacyData.settings] : []) : (Array.isArray(legacyData[store]) ? legacyData[store] : []);
            needPush = true;                                       // নতুন ফরম্যাটে ফাইল তৈরি করতে হবে
          }

          const localRecs = await readStore(store);
          if (!rf && !legacyData && localRecs.length) needPush = true;   // Drive-এ নেই, লোকালে আছে

          if (!remoteRecs && !needPush) continue;                   // কিছুই করার নেই

          let outRecs = localRecs, outTomb = Track.tomb[store] || {}, remoteChanged = true;
          if (remoteRecs) {
            const m = Merge.store(store, localRecs, Track.tomb[store] || {}, remoteRecs, remoteTomb, Date.now());
            if (m.localChanged) { await writeLocal(store, m.toPut, m.toDel); localChanged = true; }
            outRecs = m.records; outTomb = m.tomb; remoteChanged = m.remoteChanged || needPush || !rf;
            Track.tomb[store] = m.tomb; Track.saveTomb();
          }

          if (remoteChanged || opts.force) {
            const payload = { schema: 2, store, savedAt: new Date().toISOString(), records: outRecs, tombstones: outTomb };
            const up = await Drive.upload(rf ? rf.id : null, name, JSON.stringify(payload));
            this.setMtime(store, up.modifiedTime);
          } else if (rf) {
            this.setMtime(store, rf.modifiedTime);
          }
          if (seqDirty) { const d = Track.dirtySet(); d.delete(store); lsSet(LS.dirty, JSON.stringify([...d])); }
        }

        if (legacyData) lsSet('serp_legacy_done', 'true');
        lsSet(LS.last, new Date().toISOString());
        // সিঙ্ক চলার সময় নতুন লেখা পড়লে (dirty ফিরে এলে) আবার শিডিউল
        if (Track.isDirty()) this.schedule(1500);
        this.setState(Track.isDirty() ? 'wait' : 'ok');
        if (localChanged) this.onRemoteChanges();
        return true;
      } catch (e) {
        this.handleError(e);
        return false;
      } finally {
        this.running = false;
        if (this.again) { this.again = false; this.schedule(800); }
      }
    },

    handleError(e) {
      const m = (e && e.message) || String(e);
      if ((e && e.reauth) || /reauth_required|popup|access_denied|immediate_failed|interaction_required|login_required|consent|অ্যাকাউন্ট বদল/i.test(m)) {
        this.needAuth = true;
        this.setState('err', 'Drive সংযোগের মেয়াদ শেষ — নিচের স্ট্যাটাস বোতামে ক্লিক করে পুনরায় সংযোগ করুন (ডাটা এই ডিভাইসে নিরাপদ আছে)');
      } else {
        this.setState('err', m);
        this.schedule(30000);
      }
    },

    /** অন্য ডিভাইসের পরিবর্তন লোকালে বসানো হয়েছে → স্ক্রিন আপডেট (কেউ গ্রিডে কাজ করছে হলে অপেক্ষা) */
    onRemoteChanges() {
      if (!this.appReady) return;
      if (App.isUserEditing && App.isUserEditing()) { this.pendingUI = true; return; }
      this.refreshUI();
    },

    async refreshUI() {
      this.pendingUI = false;
      try {
        await App.loadAllFromDB();
        App.renderSessionSelectors();
        const ae = document.activeElement;
        if (!(ae && ae.closest && ae.closest('#school-settings-form'))) App.bindSettingUI();
        App.syncAllUI();
        const fl = document.getElementById('fee-ledger-modal');
        if (fl && !fl.classList.contains('hidden') && App.renderFeeLedger) App.renderFeeLedger();
        if (App.activeTab === 'qratt' && App.renderQrAttendance && !App._qrStream) App.renderQrAttendance();
        if (App.renderFeeMultiList) { try { App.renderFeeMultiList(); } catch (e) { /* ignore */ } }
        if (Date.now() - this.lastToast > 15000 && App.toast) { this.lastToast = Date.now(); App.toast('☁ অন্য ডিভাইসের নতুন তথ্য সিঙ্ক হয়েছে'); }
      } catch (e) { console.error(e); }
    },

    /** Drive থেকে সম্পূর্ণ রিস্টোর (লোকাল প্রতিস্থাপন) — ম্যানুয়াল */
    async restoreAll() {
      const files = await Drive.listAll();
      let any = false;
      for (const store of ALL_STORES) {
        const rf = files[FILE_PREFIX + store + '.json'];
        if (!rf) continue;
        any = true;
        const j = JSON.parse(await Drive.download(rf.id));
        if (!j || !Array.isArray(j.records)) throw new Error('ব্যাকআপ ফাইলের ফরম্যাট সঠিক নয়।');
        await replaceLocalStore(store, j.records);
        Track.tomb[store] = j.tombstones || {};
        this.setMtime(store, rf.modifiedTime);
      }
      if (!any) {
        const legacy = files[LEGACY_FILE];
        if (!legacy) throw new Error('Drive-এ কোনো ব্যাকআপ পাওয়া যায়নি।');
        const data = JSON.parse(await Drive.download(legacy.id));
        if (!data || !data.meta || data.meta.app !== 'SchoolERP_BD_v5') throw new Error('ব্যাকআপ ফাইলের ফরম্যাট সঠিক নয়।');
        await replaceLocalStore('settings', data.settings ? [data.settings] : []);
        for (const s of DATA_STORES) if (Array.isArray(data[s])) await replaceLocalStore(s, data[s]);
      }
      Track.saveTomb();
      lsDel(LS.dirty);
      lsSet(LS.last, new Date().toISOString());
    },

    /** লগইনের ঠিক পর, অ্যাপ চালুর আগে একবার */
    async initialSync() {
      await App.db.init();
      this.enabled = true;
      const has = await localHasData();
      this.setState('busy');
      // নতুন ডিভাইস/খালি লোকাল: প্রথমে Drive-এর সব ডাটা টেনে আনা
      if (!has) lsDel(LS.mtime);
      await this.cycle({ manual: true });
      this.startPolling();
    },

    /** নতুন শিক্ষার্থী/রশিদ তৈরির ঠিক আগে — অন্য ডিভাইসে একই আইডি/নম্বর তৈরি হওয়া ঠেকাতে */
    async pullNow() {
      if (!this.enabled || this.paused || this.needAuth || !navigator.onLine) return;
      try {
        await Promise.race([this.cycle({ poll: true }), new Promise(r => setTimeout(r, 4000))]);
        if (this.appReady && App.loadAllFromDB) await App.loadAllFromDB();
      } catch (e) { /* ignore */ }
    }
  };

  /* ============================== ফ্লোটিং স্ট্যাটাস উইজেট ============================== */
  const UI = {
    el: null,
    mount() {
      if (this.el) return;
      injectStyle();
      const w = document.createElement('div');
      w.id = 'serp-widget';
      w.className = 'no-print';
      w.innerHTML = `
        <div id="serp-panel">
          <div class="row">👤 <b id="serp-p-mail"></b></div>
          <div class="row">☁ শেষ সিঙ্ক: <b id="serp-p-last">—</b></div>
          <div class="row" style="color:#475569">🔄 অন্য ডিভাইসের পরিবর্তন প্রতি ${Math.max(5, CONFIG.POLL_SEC)} সেকেন্ডে আসে</div>
          <div class="row" id="serp-p-err" style="color:#be123c;display:none"></div>
          <button class="b1" id="serp-b-sync" type="button">⟳ এখনই সিঙ্ক করুন</button>
          <button class="b2" id="serp-b-restore" type="button">⬇ Drive থেকে সম্পূর্ণ রিস্টোর</button>
          <button class="b3" id="serp-b-logout" type="button">⎋ লগআউট</button>
          <button class="b4" id="serp-b-wipe" type="button">🧹 লগআউট ও এই ডিভাইস থেকে ডাটা মুছুন</button>
        </div>
        <div id="serp-pill" class="wait" role="button" tabindex="0"><span class="dot"></span><span id="serp-pill-t">Drive</span></div>`;
      document.body.appendChild(w);
      this.el = w;

      const reconnect = async () => {
        try { await Auth.acquire('select_account'); Sync.needAuth = false; Sync.setState('busy'); await Sync.cycle({ manual: true }); }
        catch (e) { Sync.handleError(e); }
      };
      $('#serp-pill', w).onclick = () => {
        if (Sync.needAuth) return reconnect();                // ইউজারের ক্লিক = পপআপ খোলার অনুমতি
        $('#serp-panel', w).classList.toggle('open'); UI.refresh();
      };
      $('#serp-b-sync', w).onclick = async () => {
        if (Sync.needAuth) return reconnect();
        await Sync.cycle({ manual: true, force: true });
      };
      $('#serp-b-restore', w).onclick = async () => {
        const c = await askChoice('Drive থেকে সম্পূর্ণ রিস্টোর', 'এই ডিভাইসের বর্তমান ডাটা Drive-এর ডাটা দিয়ে সম্পূর্ণ বদলে যাবে। (আগে একটি ব্যাকআপ ফাইল ডাউনলোড হবে)', [
          { value: 'y', label: 'হ্যাঁ, রিস্টোর করুন', bg: '#f59e0b', fg: '#451a03' }, { value: 'n', label: 'বাতিল' }]);
        if (c !== 'y') return;
        try {
          if (Sync.needAuth) await Auth.acquire('select_account');
          Sync.needAuth = false;
          Sync.setState('busy');
          await downloadLocalSnapshot('Local_Before_DriveRestore');
          await Sync.restoreAll();
          await Sync.refreshUI();
          Sync.setState('ok');
          App.toast && App.toast('Drive থেকে ডাটা রিস্টোর হয়েছে!');
        } catch (e) { Sync.handleError(e); }
      };
      $('#serp-b-logout', w).onclick = () => Session.logout(false);
      $('#serp-b-wipe', w).onclick = () => Session.logout(true);
      document.addEventListener('click', ev => { if (!w.contains(ev.target)) $('#serp-panel', w).classList.remove('open'); });
    },
    refresh() {
      if (!this.el) return;
      const pill = $('#serp-pill', this.el), t = $('#serp-pill-t', this.el);
      let key = Sync.state;
      if (Sync.needAuth) key = 'auth';
      const map = {
        ok: ['ok', '☁ সিঙ্ক হয়েছে'], busy: ['busy', '☁ সিঙ্ক হচ্ছে…'], wait: ['wait', '☁ আপলোড অপেক্ষমান'],
        err: ['err', '☁ সিঙ্ক ত্রুটি'], auth: ['auth', '🔑 পুনরায় সংযোগ করুন'], idle: ['wait', '☁ Drive']
      };
      const m = map[key] || map.idle;
      pill.className = m[0]; t.textContent = m[1];
      $('#serp-p-mail', this.el).textContent = Auth.email || '';
      const last = lsGet(LS.last);
      $('#serp-p-last', this.el).textContent = last ? fmtTime(last) : '—';
      const er = $('#serp-p-err', this.el);
      er.style.display = Sync.lastError ? 'block' : 'none';
      er.textContent = Sync.lastError;
    }
  };

  /* ============================ সেশন / লক / লগআউট ============================ */
  const Session = {
    idleTimer: null,
    locked: false,

    startIdleWatch() {
      if (!CONFIG.IDLE_LOCK_MINUTES) return;
      let last = 0;
      const bump = () => {
        const n = Date.now(); if (n - last < 1000) return; last = n;
        clearTimeout(this.idleTimer);
        if (!this.locked) this.idleTimer = setTimeout(() => this.lock(), CONFIG.IDLE_LOCK_MINUTES * 60000);
      };
      ['mousemove', 'keydown', 'click', 'touchstart', 'scroll'].forEach(ev => document.addEventListener(ev, bump, { passive: true }));
      bump();
    },

    async lock() {
      if (this.locked) return;
      this.locked = true;
      Sync.paused = true;
      if (Sync.isDirty() && !Sync.needAuth) { Sync.paused = false; try { await Sync.cycle(); } catch (e) { /* ignore */ } Sync.paused = true; }
      const prev = Auth.email;
      Auth.clear();
      Auth.email = prev;               // একই অ্যাকাউন্টেই আবার খুলতে হবে
      const w = $('#serp-widget'); if (w) w.style.display = 'none';
      await showLoginScreen('lock');
      this.locked = false;
      Sync.paused = false;
      Sync.needAuth = false;
      if (w) w.style.display = '';
      UI.refresh();
      Sync.cycle({ manual: true });
      this.startIdleWatchReset();
    },
    startIdleWatchReset() { clearTimeout(this.idleTimer); if (CONFIG.IDLE_LOCK_MINUTES) this.idleTimer = setTimeout(() => this.lock(), CONFIG.IDLE_LOCK_MINUTES * 60000); },

    async logout(wipe) {
      if (wipe) {
        const c = await askChoice('⚠ ডাটা মুছে লগআউট', 'প্রথমে সব ডাটা Drive-এ সেভ করা হবে, নিশ্চিত হলে এই ডিভাইস থেকে সব ডাটা মুছে যাবে। (পাবলিক/শেয়ার্ড কম্পিউটারের জন্য উপযোগী)', [
          { value: 'y', label: 'হ্যাঁ, মুছে লগআউট করুন', bg: '#e11d48', fg: '#fff' }, { value: 'n', label: 'বাতিল' }]);
        if (c !== 'y') return;
      }
      Sync.setState('busy');
      let ok = true;
      if (Sync.isDirty() || wipe) {
        if (Sync.needAuth) { try { await Auth.acquire('select_account'); Sync.needAuth = false; } catch (e) { ok = false; } }
        if (ok) ok = await Sync.cycle({ manual: true, force: !!wipe });
      }
      if (wipe && !ok) { Sync.setState('err', 'Drive-এ সেভ করা যায়নি'); App.toast && App.toast('Drive-এ সেভ করা যায়নি — তাই ডাটা মোছা হয়নি।', 'error'); return; }
      Sync.enabled = false;
      clearInterval(Sync.pollTimer);
      if (wipe) {
        try { App.db.db && App.db.db.close(); } catch (e) { /* ignore */ }
        await new Promise(res => { const r = indexedDB.deleteDatabase(DB_NAME); r.onsuccess = r.onerror = r.onblocked = () => res(); setTimeout(res, 1500); });
        [LS.dirty, LS.mtime, LS.last, LS.tomb, LS.theme, 'serp_legacy_done'].forEach(lsDel);
      }
      try { if (Auth.token) google.accounts.oauth2.revoke(Auth.token, () => {}); } catch (e) { /* ignore */ }
      Auth.clear();
      location.reload();
    }
  };

  window.addEventListener('beforeunload', e => {
    if (Sync.enabled && Sync.isDirty() && Sync.state !== 'ok') { e.preventDefault(); e.returnValue = ''; }
  });
  window.addEventListener('online', () => { if (Sync.enabled) Sync.cycle({ manual: true }); });
  document.addEventListener('visibilitychange', () => {
    if (!Sync.enabled) return;
    if (document.hidden) { if (Sync.isDirty()) Sync.cycle(); }
    else Sync.cycle({ poll: true });                         // ট্যাবে ফিরলেই সঙ্গে সঙ্গে নতুন তথ্য আনা
  });
  window.addEventListener('focus', () => { if (Sync.enabled) Sync.cycle({ poll: true }); });

  /* ======================= App.init কে লগইনের পেছনে আটকে দেওয়া ======================= */
  const originalInit = App.init;
  let started = false;
  App.syncBeforeWrite = () => Sync.pullNow();
  App.init = async function () {
    if (started) return;
    started = true;
    injectStyle();
    try {
      await showLoginScreen('login');         // লগইন না হলে এখানেই আটকে থাকবে — অ্যাপ লোডই হবে না
      await Sync.initialSync();                // Drive ↔ লোকাল মার্জ / নতুন ডিভাইসে রিস্টোর
      await originalInit.apply(App, arguments);
      Sync.appReady = true;
      UI.mount();
      UI.refresh();
      Session.startIdleWatch();
    } catch (e) {
      console.error(e);
      document.body.insertAdjacentHTML('beforeend', '<div style="position:fixed;inset:0;z-index:2147483600;background:#fff;color:#be123c;padding:24px;font:600 15px sans-serif">অ্যাপ চালু করতে সমস্যা হয়েছে: ' + esc(e && e.message) + '<br><br><button onclick="location.reload()">আবার চেষ্টা করুন</button></div>');
    }
  };

  // ভেতরের অবজেক্ট (টোকেন-সহ) সাধারণত বাইরে খোলা থাকে না। শুধু টেস্ট/ডিবাগে চালু করুন।
  if (CONFIG.DEBUG) window.__SERP = { Sync, Auth, Drive, Merge, Track, CONFIG };
  if (window.__SERP_TEST) window.__SERP_TEST_API = { Merge, Track, KEYPATH, Sync, Auth, Drive };
})();
