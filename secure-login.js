/**
 * ============================================================================
 * SECURE GOOGLE LOGIN + GOOGLE DRIVE AUTO BACKUP  (secure-login.js)
 * ----------------------------------------------------------------------------
 * - app.js ও index.html-এর কোনো কোড বদলানো হয়নি।
 * - শুধু index.html-এ app.js এর ঠিক পরে এই একটি লাইন যোগ করতে হবে:
 *       <script src="secure-login.js"></script>
 * - শুধুমাত্র নিচের ALLOWED_EMAILS তালিকার Google অ্যাকাউন্ট দিয়ে লগইন করা যাবে।
 * - সব ডাটা (শিক্ষার্থী, নম্বর, হাজিরা, ফি, সেটিংস, ছবি) আপনার Google Drive-এর
 *   গোপন "appDataFolder"-এ অটো ব্যাকআপ হবে এবং নতুন ডিভাইসে লগইন করলে ফিরে আসবে।
 * ============================================================================
 */
(function () {
  'use strict';

  /* ======================= ✏️ আপনাকে শুধু এই অংশ বদলাতে হবে ======================= */
  const CONFIG = {
    // Google Cloud Console থেকে পাওয়া OAuth Client ID (Web application)
    CLIENT_ID: '844146152814-eonsr9nage9ajif2dojdviultqmkbafn.apps.googleusercontent.com',

    // শুধু এই ইমেইল(গুলো) দিয়ে লগইন করা যাবে (ছোট হাতের অক্ষরে লিখুন)
    ALLOWED_EMAILS: ['niloyghs2027@gmail.com'],

    // কাজ না করলে এত মিনিট পর অটো লক হবে (0 = বন্ধ)
    IDLE_LOCK_MINUTES: 30,

    // শেষ পরিবর্তনের কত সেকেন্ড পর অটো ব্যাকআপ শুরু হবে
    AUTO_BACKUP_DELAY_SEC: 6
  };
  /* =================================================================================== */

  const SCOPES = 'openid email profile https://www.googleapis.com/auth/drive.appdata';
  const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
  const BACKUP_NAME = 'school_erp_backup.json';
  const STORES = ['students', 'subjects', 'attendance', 'marks', 'qrattendance', 'fees'];
  const LS = {
    dirty: 'serp_sync_dirty',
    mtime: 'serp_sync_drive_mtime',
    last: 'serp_sync_last_time'
  };

  const allowed = CONFIG.ALLOWED_EMAILS.map(e => String(e).trim().toLowerCase()).filter(Boolean);
  const configOK = CONFIG.CLIENT_ID && !/^YOUR_/.test(CONFIG.CLIENT_ID) && allowed.length && !allowed.some(e => /^your\./.test(e));

  /* ----------------------------- ছোট ইউটিলিটি ----------------------------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const lsGet = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } };
  const lsDel = k => { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } };
  const maskEmail = e => { const [u, d] = String(e).split('@'); return (u ? u[0] : '') + '•••' + (u && u.length > 1 ? u.slice(-1) : '') + '@' + (d || ''); };
  const fmtTime = iso => { try { return new Date(iso).toLocaleString('bn-BD'); } catch (e) { return iso || '—'; } };

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

  /* ============================== GOOGLE AUTH ============================== */
  const Auth = {
    token: null,
    expiresAt: 0,
    email: null,
    tokenClient: null,

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

    /** GIS থেকে টোকেন আনে, তারপর Google-এর tokeninfo দিয়ে যাচাই করে (ইমেইল, ক্লায়েন্ট, স্কোপ) */
    async acquire(prompt) {
      await this.loadGIS();
      const resp = await new Promise((resolve, reject) => {
        if (!this.tokenClient) {
          this.tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CONFIG.CLIENT_ID,
            scope: SCOPES,
            callback: () => {}
          });
        }
        this.tokenClient.callback = r => (r && r.error) ? reject(new Error(r.error_description || r.error)) : resolve(r);
        this.tokenClient.error_callback = e => reject(new Error((e && (e.message || e.type)) || 'popup_error'));
        const opts = { prompt: prompt };
        if (allowed.length === 1) opts.hint = allowed[0];
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
      // একই সেশনে অন্য অ্যাকাউন্টে বদল হলে অস্বীকার
      if (this.email && this.email !== email) throw new Error('সেশনের অ্যাকাউন্ট বদল হয়েছে। পুনরায় লগইন করুন।');

      this.token = resp.access_token;
      this.email = email;
      this.expiresAt = Date.now() + (Number(resp.expires_in || info.expires_in || 3600) - 60) * 1000;
      return email;
    },

    async validToken() {
      if (this.token && Date.now() < this.expiresAt) return this.token;
      await this.acquire('');                 // নীরব নবায়নের চেষ্টা (সম্ভব না হলে error)
      return this.token;
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
          <div class="foot">🔒 লগইনের পর আপনার সব তথ্য আপনার নিজের Google Drive-এ নিরাপদে অটো ব্যাকআপ হবে।</div>
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
    async req(url, opts, retry) {
      const token = await Auth.validToken();
      const res = await fetch(url, Object.assign({}, opts, {
        headers: Object.assign({ Authorization: 'Bearer ' + token }, (opts && opts.headers) || {})
      }));
      if (res.status === 401 && !retry) { Auth.expiresAt = 0; return this.req(url, opts, true); }
      if (!res.ok) {
        const t = await res.text().catch(() => '');
        throw new Error('Drive ত্রুটি ' + res.status + (t ? ': ' + t.slice(0, 160) : ''));
      }
      return res;
    },

    async findFile() {
      const q = encodeURIComponent(`name='${BACKUP_NAME}' and trashed=false`);
      const res = await this.req(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${q}&orderBy=modifiedTime%20desc&pageSize=1&fields=files(id,name,modifiedTime,size)`);
      const j = await res.json();
      return (j.files && j.files[0]) || null;
    },

    async download(id) {
      const res = await this.req(`https://www.googleapis.com/drive/v3/files/${id}?alt=media`);
      return res.text();
    },

    async upload(existingId, jsonText) {
      const meta = existingId ? { name: BACKUP_NAME } : { name: BACKUP_NAME, parents: ['appDataFolder'] };
      const fields = 'id,modifiedTime';
      const method = existingId ? 'PATCH' : 'POST';
      const base = 'https://www.googleapis.com/upload/drive/v3/files' + (existingId ? '/' + existingId : '');
      const bytes = new Blob([jsonText]).size;

      if (bytes > 4 * 1024 * 1024) {
        // বড় ফাইলের জন্য resumable আপলোড
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

  /* ============================ ডাটা বিল্ড / রিস্টোর ============================ */
  async function buildPayload() {
    const db = App.db;
    const payload = {
      meta: { app: 'SchoolERP_BD_v5', exportedAt: new Date().toISOString(), source: 'drive-autosync', schema: 1 },
      settings: await db.get('settings', 'main') || App.settings
    };
    for (const s of STORES) payload[s] = await db.getAll(s);
    return payload;
  }

  async function localHasData() {
    const db = App.db;
    const st = await db.get('settings', 'main');
    if (st && (st.nameBn || st.nameEn || st.eiin)) return true;
    for (const s of ['students', 'marks', 'attendance', 'fees', 'qrattendance']) {
      if ((await db.getAll(s)).length) return true;
    }
    return false;
  }

  async function applyPayload(data) {
    if (!data || typeof data !== 'object' || !data.meta || data.meta.app !== 'SchoolERP_BD_v5') {
      throw new Error('ব্যাকআপ ফাইলের ফরম্যাট সঠিক নয়।');
    }
    Sync.suspended = true;
    try {
      if (data.settings) await App.db.put('settings', data.settings);
      for (const s of STORES) {
        if (Array.isArray(data[s])) {
          await App.db.clear(s);
          await App.db.bulkPut(s, data[s]);
        }
      }
    } finally { Sync.suspended = false; }
  }

  async function downloadLocalSnapshot(prefix) {
    const p = await buildPayload();
    const blob = new Blob([JSON.stringify(p)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prefix}_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  async function refreshUIAfterRestore() {
    await App.loadAllFromDB();
    if (App.applyTheme) App.applyTheme(App.settings.theme || 'light');
    App.renderSessionSelectors();
    App.bindSettingUI();
    App.syncAllUI();
  }

  /* ============================== সিঙ্ক ইঞ্জিন ============================== */
  const Sync = {
    suspended: false,
    enabled: false,
    timer: null,
    running: false,
    again: false,
    seq: 0,
    conflict: false,
    needAuth: false,
    state: 'idle',
    lastError: '',

    isDirty() { return lsGet(LS.dirty) === '1'; },

    markDirty() {
      if (!this.enabled || this.suspended) return;
      this.seq++;
      lsSet(LS.dirty, '1');
      this.setState('wait');
      this.schedule(CONFIG.AUTO_BACKUP_DELAY_SEC * 1000);
    },

    schedule(ms) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.push(), ms);
    },

    setState(s, err) {
      this.state = s;
      this.lastError = err || '';
      UI.refresh();
    },

    /** লোকাল → Drive */
    async push(force) {
      if (!this.enabled || this.conflict) return false;
      if (this.running) { this.again = true; return false; }
      if (!navigator.onLine) { this.setState('err', 'ইন্টারনেট নেই — সংযোগ ফিরলে অটো সিঙ্ক হবে'); return false; }
      this.running = true;
      clearTimeout(this.timer);
      const seqAtStart = this.seq;
      this.setState('busy');
      try {
        const remote = await Drive.findFile();
        const baseline = lsGet(LS.mtime);
        if (remote && baseline && remote.modifiedTime !== baseline && !force) {
          // অন্য ডিভাইস থেকে Drive-এর ডাটা বদলেছে
          this.conflict = true;
          this.running = false;
          this.setState('err', 'Drive-এ নতুন ডাটা পাওয়া গেছে (অন্য ডিভাইস থেকে)');
          await this.resolveConflict();
          return false;
        }
        const text = JSON.stringify(await buildPayload());
        const out = await Drive.upload(remote ? remote.id : null, text);
        lsSet(LS.mtime, out.modifiedTime);
        lsSet(LS.last, new Date().toISOString());
        if (this.seq === seqAtStart) lsDel(LS.dirty);
        this.needAuth = false;
        this.setState('ok');
        return true;
      } catch (e) {
        this.handleError(e);
        return false;
      } finally {
        this.running = false;
        if (this.again) { this.again = false; this.schedule(1000); }
      }
    },

    handleError(e) {
      const m = (e && e.message) || String(e);
      if (/popup|access_denied|immediate_failed|interaction_required|login_required|consent|অ্যাকাউন্ট বদল/i.test(m)) {
        this.needAuth = true;
        this.setState('err', 'Drive সংযোগ নবায়ন দরকার — নিচের বোতামে ক্লিক করুন');
      } else {
        this.setState('err', m);
        this.schedule(60000); // ১ মিনিট পর আবার চেষ্টা
      }
    },

    /** Drive → লোকাল (ম্যানুয়াল বা লগইনের সময়) */
    async pullAndApply() {
      const remote = await Drive.findFile();
      if (!remote) throw new Error('Drive-এ কোনো ব্যাকআপ পাওয়া যায়নি।');
      const data = JSON.parse(await Drive.download(remote.id));
      await applyPayload(data);
      lsSet(LS.mtime, remote.modifiedTime);
      lsSet(LS.last, new Date().toISOString());
      lsDel(LS.dirty);
      return remote;
    },

    async resolveConflict() {
      const choice = await askChoice(
        '⚠ ডাটা সংঘাত',
        'এই ডিভাইসের ডাটা এবং Google Drive-এর ডাটা ভিন্ন।\n\n• Drive-এর ডাটা নিলে এই ডিভাইসের ডাটা বদলে যাবে (বদলানোর আগে এই ডিভাইসের একটি ব্যাকআপ ফাইল ডাউনলোড হবে)।\n• এই ডিভাইসের ডাটা রাখলে Drive-এর ডাটা ওভাররাইট হবে।',
        [
          { value: 'drive', label: '☁ Drive-এর ডাটা নিন (এই ডিভাইসে রিস্টোর)', bg: '#10b981', fg: '#052e16' },
          { value: 'local', label: '💻 এই ডিভাইসের ডাটা রাখুন (Drive ওভাররাইট)', bg: '#fbbf24', fg: '#451a03' }
        ]
      );
      this.conflict = false;
      if (choice === 'drive') {
        this.setState('busy');
        try {
          await downloadLocalSnapshot('Local_Before_DriveRestore');
          await this.pullAndApply();
          await refreshUIAfterRestore();
          this.setState('ok');
          App.toast && App.toast('Drive থেকে ডাটা রিস্টোর হয়েছে!');
        } catch (e) { this.handleError(e); }
      } else {
        await this.push(true);
      }
    },

    /** লগইনের ঠিক পর, অ্যাপ চালুর আগে একবার */
    async initialSync() {
      await App.db.init();
      this.enabled = true;
      try {
        this.setState('busy');
        const remote = await Drive.findFile();
        const has = await localHasData();
        const baseline = lsGet(LS.mtime);
        const dirty = this.isDirty();

        if (!remote) {
          if (has) { lsSet(LS.dirty, '1'); }
        } else if (!has) {
          await this.pullAndApply();                       // নতুন ডিভাইস → অটো রিস্টোর
          App.__serpRestored = true;
        } else if (baseline === remote.modifiedTime) {
          /* সিঙ্কে আছে */
        } else if (!baseline || dirty) {
          // সংঘাত — ব্যবহারকারী সিদ্ধান্ত নেবেন (UI লোডের পর নয়, এখনই)
          const choice = await askChoice(
            '⚠ ডাটা সংঘাত',
            'এই ডিভাইসের ডাটা এবং Google Drive-এর ডাটা ভিন্ন। কোনটি রাখবেন?\n(Drive-এর ডাটা নিলে এই ডিভাইসের ডাটার একটি ব্যাকআপ ফাইল আগে ডাউনলোড হবে।)',
            [
              { value: 'drive', label: '☁ Drive-এর ডাটা নিন', bg: '#10b981', fg: '#052e16' },
              { value: 'local', label: '💻 এই ডিভাইসের ডাটা রাখুন (Drive ওভাররাইট)', bg: '#fbbf24', fg: '#451a03' }
            ]);
          if (choice === 'drive') {
            await downloadLocalSnapshot('Local_Before_DriveRestore');
            await this.pullAndApply();
          } else {
            lsSet(LS.mtime, remote.modifiedTime); // বেসলাইন ধরে নিয়ে ওভাররাইট
            lsSet(LS.dirty, '1');
          }
        } else {
          await this.pullAndApply();                       // Drive নতুন, লোকাল পরিষ্কার → রিস্টোর
        }
        this.setState(this.isDirty() ? 'wait' : 'ok');
        if (this.isDirty()) this.schedule(2500);
      } catch (e) {
        this.handleError(e);
      }
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
          <div class="row" id="serp-p-err" style="color:#be123c;display:none"></div>
          <button class="b1" id="serp-b-sync" type="button">⟳ এখনই Drive-এ ব্যাকআপ</button>
          <button class="b2" id="serp-b-restore" type="button">⬇ Drive থেকে রিস্টোর</button>
          <button class="b3" id="serp-b-logout" type="button">⎋ লগআউট</button>
          <button class="b4" id="serp-b-wipe" type="button">🧹 লগআউট ও এই ডিভাইস থেকে ডাটা মুছুন</button>
        </div>
        <div id="serp-pill" class="wait" role="button" tabindex="0"><span class="dot"></span><span id="serp-pill-t">Drive</span></div>`;
      document.body.appendChild(w);
      this.el = w;
      $('#serp-pill', w).onclick = () => { $('#serp-panel', w).classList.toggle('open'); UI.refresh(); };
      $('#serp-b-sync', w).onclick = async () => {
        if (Sync.needAuth) { try { await Auth.acquire('select_account'); Sync.needAuth = false; } catch (e) { Sync.handleError(e); return; } }
        await Sync.push(true);
      };
      $('#serp-b-restore', w).onclick = async () => {
        const c = await askChoice('Drive থেকে রিস্টোর', 'এই ডিভাইসের বর্তমান ডাটা Drive-এর ডাটা দিয়ে বদলে যাবে। (আগে একটি ব্যাকআপ ফাইল ডাউনলোড হবে)', [
          { value: 'y', label: 'হ্যাঁ, রিস্টোর করুন', bg: '#f59e0b', fg: '#451a03' }, { value: 'n', label: 'বাতিল' }]);
        if (c !== 'y') return;
        try {
          Sync.setState('busy');
          await downloadLocalSnapshot('Local_Before_DriveRestore');
          await Sync.pullAndApply();
          await refreshUIAfterRestore();
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
      const map = { ok: ['ok', '☁ Drive: সিঙ্ক হয়েছে'], busy: ['busy', '☁ সিঙ্ক হচ্ছে…'], wait: ['wait', '☁ ব্যাকআপ অপেক্ষমান'], err: ['err', '☁ সিঙ্ক ত্রুটি'], idle: ['wait', '☁ Drive'] };
      const m = map[Sync.state] || map.idle;
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
      if (Sync.isDirty()) { try { await Sync.push(); } catch (e) { /* ignore */ } }
      const prev = Auth.email;
      Auth.clear();
      Auth.email = prev;               // একই অ্যাকাউন্টেই আবার খুলতে হবে
      const w = $('#serp-widget'); if (w) w.style.display = 'none';
      await showLoginScreen('lock');
      this.locked = false;
      if (w) w.style.display = '';
      UI.refresh();
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
      const ok = Sync.isDirty() || wipe ? await Sync.push(true) : true;
      if (wipe && !ok) { App.toast && App.toast('Drive-এ সেভ করা যায়নি — তাই ডাটা মোছা হয়নি।', 'error'); return; }
      if (wipe) {
        try { App.db.db && App.db.db.close(); } catch (e) { /* ignore */ }
        await new Promise(res => { const r = indexedDB.deleteDatabase(DB_NAME); r.onsuccess = r.onerror = r.onblocked = () => res(); setTimeout(res, 1500); });
        [LS.dirty, LS.mtime, LS.last].forEach(lsDel);
      }
      try { if (Auth.token) google.accounts.oauth2.revoke(Auth.token, () => {}); } catch (e) { /* ignore */ }
      Auth.clear();
      location.reload();
    }
  };

  /* ================== LocalDB-এর লেখার মেথডগুলোতে "পরিবর্তন হয়েছে" ট্র্যাকিং ================== */
  ['put', 'bulkPut', 'delete', 'clear'].forEach(m => {
    const orig = LocalDB.prototype[m];
    LocalDB.prototype[m] = async function () {
      const r = await orig.apply(this, arguments);
      Sync.markDirty();
      return r;
    };
  });

  window.addEventListener('beforeunload', e => {
    if (Sync.enabled && Sync.isDirty() && !Sync.suspended && Sync.state !== 'ok') { e.preventDefault(); e.returnValue = ''; }
  });
  window.addEventListener('online', () => { if (Sync.enabled && Sync.isDirty()) Sync.schedule(1500); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && Sync.enabled && Sync.isDirty()) Sync.push(); });

  /* ======================= App.init কে লগইনের পেছনে আটকে দেওয়া ======================= */
  const originalInit = App.init;
  let started = false;
  App.init = async function () {
    if (started) return;
    started = true;
    injectStyle();
    try {
      await showLoginScreen('login');         // লগইন না হলে এখানেই আটকে থাকবে — অ্যাপ লোডই হবে না
      await Sync.initialSync();                // Drive ↔ লোকাল মেলানো / নতুন ডিভাইসে রিস্টোর
      await originalInit.apply(App, arguments);
      UI.mount();
      UI.refresh();
      Session.startIdleWatch();
    } catch (e) {
      console.error(e);
      document.body.insertAdjacentHTML('beforeend', '<div style="position:fixed;inset:0;z-index:2147483600;background:#fff;color:#be123c;padding:24px;font:600 15px sans-serif">অ্যাপ চালু করতে সমস্যা হয়েছে: ' + esc(e && e.message) + '<br><br><button onclick="location.reload()">আবার চেষ্টা করুন</button></div>');
    }
  };

  // ডিবাগ/টেস্টের জন্য (সংবেদনশীল কিছু নয়)
  window.__SERP = { Sync, Auth, Drive, CONFIG };
})();
