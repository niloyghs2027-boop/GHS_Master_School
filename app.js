/**
 * ============================================================================
 * SMART SCHOOL ERP & RESULT PROCESSING SYSTEM v5.0 PRO (FIXED EDITION)
 * FILE: app.js (PART 1 OF 3) — v5.1 SECURE/REALTIME EDITION
 * Software design & development: Niloy (নিলয়)
 * Core DB, NCTB Separate Papers (Bangla/English 1st & 2nd), Auto-Sync & Students
 * ============================================================================
 */

/* build-ref (part 2) */
const __NK2 = 'PNMlbnz3PAgf4wdskmHWw7c023aFZ8NsY+OxnN9j505iEYS63XXBFjUhv5wdURY8/6QQDA/3leCNTdFMkb0HGfiRvZzV14kBsujNAxD6E1wX9qMjlT0m/eUUzraiXTN9IADumvy9t0r8YfIftNsimTFyhw0dOGo9FaInNRr8CDr+FyPWun/LkBPujtgktkihfuONqZfIMjCDaz1qP6Mmepmp+peNTCJ9Xbb5zu4mztHpRCcLXcYH8KSW8FCXp/5LBecMT7SmV/2hS0iqgCovwJpKuSQ0cD22Gbf5Ur/Wj8yJXVM3jiRS2nutN3c25j0qqR9pYYQeCRxm1SOwG0A/UUunHT70xsC98Du56kbv/KJzLnfswAL/e3EnmZrR65PUtDgqJcl0qLPiNfNb5yeLHfhZuY686CHLaOg6hOxklqgHqUC9lLh9ADuofEw/p68q9lwWoN1sjHmDlgLRwgK4EFcPTxqEZVVn8DdNRcIcNmC+YoOjCGRpAbHy3VPEgOMo5z8JnwcK35rP/e95PSSCiFHVCX9jsV7jAOkzbdUKxYOmv0TtisFGvGq5R12I0GD5kx7FIw8rJLNCsS5767yVC9UrmpWlklBEQWUMoUzWLWmK30fnPL4optaqzS+dqupaG6pn+fK8BldzAhXcGe0uISMcIqhjrL6dIWhUrx6Covb5Z4NW3kEqYtlT7o6vZKskcOzuXGLJdNEB7GjMSr9u23JC1wdWhKXQXajcIm98YCIofoufMyGeP7SbyeTWlyk/rSrF/odngRrhKd/NkcF8i6KMAmkR1ejPjSDuq686KHdkyqcEgeQuddKhi9HSIja5Up7a/9slvF3qSmyaSf9IYt9l45dBzNTNMrfz2928MCaVMmAjk9DjuvujzLFk7YLyceqEvDmiGEd89NIP+0v/C3eWb6+JH20+ielqcqCC5F2qwLElqD8dqA8bhaVIfw94TOpQpIAtMUt79K6Kuq5b5n47l4G4BvDTgSC4kEtIMAVaf+pV5aY+mw5dVlphfCEQWTcr21j0RDnto/kOTrLsLUnDn3ZY7Kzah0tO3zoKDl7Cw3WJBg580zb3upAqLxYwKvDWGWlY8kM/EqF7xTY5r8WLiIz7bx/EbMWJoWkPgaSS0JWiCcOuh6CYHq8wNmazg3AHf8o7GX4res+cI706Skqu59fPboUYw+9ukIv1Cl1XRF21ErY89DQmxlRmVmLlqghoHk5THcei41eRBPlA3RtxN/GYRkT0pFiGGeG34cyZBqD/q/jwH2nWsh+t0pjeCg0OuwgI4cE68Z130X5eVzYFMEHd9IX3D9wi5D/q4GpK5YzX1zW+GgS46fgDhsmk3K/O1IV8VkU11lz3F5Gp/v+561mheS00PCwr0rxfjKCPZdgTweOBoomUa/WX1t0McWFIzHMiGnZBgs2+zG8+4wq/FnHvARlvRzs1nYk9QXvWMpPlDNDrZbvo5v+OzYyYLfhJdE1NLuu4q5efXu9jF2JlH05s+bONIyeDwuQp0rx8+/n/C1HcHgxg2rxupynrZ4/9OcDvvl8vvhd+aHwtVFxxXBX9IxSlkGK33Trep0MILi/t1A33VfVecm2NtvdYHyV0dJ8oUt0asx78CI8FvS80vSvKkV8lkj46t0n7JylNLXvPKUUk4GcxtY2EnEvfEI4uXLuO+LHnY1OY17LVFbBTSagdpUPE6WTFP8BSKKDWsYtzU20OZXJo6qFnMhl5nHZcQOHQs20BCd4tbs9nNb5oTVn/xM9t2G6i31hP+7/kLXTWDa/tWVjwD/atZSAkdi1pwFh/0ywWqkyI0FBpdDmePMYwz3o9ON1bZMWJ9G6u/X0qMJ488gzEXgcTaxP1n90r5U1HUnk/kDBdBAwHNWuVh5wBXcvuIFSW0H2FHOSbtS+gkbsFJz4+Gy01c/11ziCk8QhNYgS3H4uN2H7F/kR5/ejgp9y9u6SZ0W/nRD1xaZOhc+Huc0umQC6MNS3BZzDodocbW1IZxvNBWaRip8i2Z+WX4zA3JVeCSKdITJUJNRomF0GWbaZG054xNEugVypu5II7C+8C1J8HpiW/K6u4CdS7vMVUH1T5ASX9U95cdQYxaqrVpaHx/bWmFmv2';

const DB_NAME = 'SchoolERP_BD_v5';
const DB_VERSION = 3;

class LocalDB {
  constructor() {
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('settings')) db.createObjectStore('settings', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('students')) db.createObjectStore('students', { keyPath: 'recordId' });
        if (!db.objectStoreNames.contains('subjects')) db.createObjectStore('subjects', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('attendance')) db.createObjectStore('attendance', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('marks')) db.createObjectStore('marks', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('qrattendance')) db.createObjectStore('qrattendance', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('fees')) db.createObjectStore('fees', { keyPath: 'id' });
      };
      req.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(this.db);
      };
      req.onerror = (e) => reject(e.target.error);
    });
  }

  async getAll(storeName) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const req = tx.objectStore(storeName).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async get(storeName, key) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const req = tx.objectStore(storeName).get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  async put(storeName, item) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).put(item);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }

  async bulkPut(storeName, items) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(items) || !items.length) return resolve(true);
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      items.forEach(item => store.put(item));
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }

  async delete(storeName, key) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).delete(key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }

  async clear(storeName) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).clear();
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }
}

/**
 * বাংলাদেশ শিক্ষা বোর্ড ও NCTB নীতিমালা অনুযায়ী বিষয় কাঠামো
 * বাংলা ১ম পত্র (101) ও ২য় পত্র (102) এবং ইংরেজি ১ম পত্র (107) ও ২য় পত্র (108) আলাদা করা হয়েছে।
 */
const DEFAULT_NCTB_SUBJECTS = [
  // ==================== ৬ষ্ঠ থেকে ৮ম শ্রেণী (সাধারণ বিভাগ - ৪র্থ বিষয় নেই) ====================
  { id: '68_101', code: '101', name: 'বাংলা ১ম পত্র', classes: ['6','7','8'], group: 'General', cq: 70, mcq: 30, prac: 0, pairGroup: 'BANGLA', isOptionalAllowed: false },
  { id: '68_102', code: '102', name: 'বাংলা ২য় পত্র', classes: ['6','7','8'], group: 'General', cq: 35, mcq: 15, prac: 0, pairGroup: 'BANGLA', isOptionalAllowed: false },
  { id: '68_107', code: '107', name: 'ইংরেজি ১ম পত্র (English 1st)', classes: ['6','7','8'], group: 'General', cq: 100, mcq: 0, prac: 0, pairGroup: 'ENGLISH', isOptionalAllowed: false },
  { id: '68_108', code: '108', name: 'ইংরেজি ২য় পত্র (English 2nd)', classes: ['6','7','8'], group: 'General', cq: 50, mcq: 0, prac: 0, pairGroup: 'ENGLISH', isOptionalAllowed: false },
  { id: '68_109', code: '109', name: 'সাধারণ গণিত (Mathematics)', classes: ['6','7','8'], group: 'General', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: false },
  { id: '68_127', code: '127', name: 'সাধারণ বিজ্ঞান (Science)', classes: ['6','7','8'], group: 'General', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: false },
  { id: '68_150', code: '150', name: 'বাংলাদেশ ও বিশ্বপরিচয়', classes: ['6','7','8'], group: 'General', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: false },
  { id: '68_111', code: '111', name: 'ধর্ম ও নৈতিক শিক্ষা', classes: ['6','7','8'], group: 'General', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: false },
  { id: '68_154', code: '154', name: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', classes: ['6','7','8'], group: 'General', cq: 30, mcq: 20, prac: 0, isOptionalAllowed: false },

  // ==================== ৯ম ও ১০ম শ্রেণী — সকল বিভাগের আবশ্যিক বিষয় ====================
  { id: '910_101', code: '101', name: 'বাংলা ১ম পত্র', classes: ['9','10'], group: 'ALL', cq: 70, mcq: 30, prac: 0, pairGroup: 'BANGLA', isOptionalAllowed: false },
  { id: '910_102', code: '102', name: 'বাংলা ২য় পত্র', classes: ['9','10'], group: 'ALL', cq: 70, mcq: 30, prac: 0, pairGroup: 'BANGLA', isOptionalAllowed: false },
  { id: '910_107', code: '107', name: 'ইংরেজি ১ম পত্র (English 1st)', classes: ['9','10'], group: 'ALL', cq: 100, mcq: 0, prac: 0, pairGroup: 'ENGLISH', isOptionalAllowed: false },
  { id: '910_108', code: '108', name: 'ইংরেজি ২য় পত্র (English 2nd)', classes: ['9','10'], group: 'ALL', cq: 100, mcq: 0, prac: 0, pairGroup: 'ENGLISH', isOptionalAllowed: false },
  { id: '910_109', code: '109', name: 'সাধারণ গণিত (Mathematics)', classes: ['9','10'], group: 'ALL', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: false },
  { id: '910_111', code: '111', name: 'ধর্ম ও নৈতিক শিক্ষা', classes: ['9','10'], group: 'ALL', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: false },
  { id: '910_154', code: '154', name: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', classes: ['9','10'], group: 'ALL', cq: 0, mcq: 25, prac: 25, isOptionalAllowed: false },

  // ==================== ৯ম ও ১০ম শ্রেণী — বিজ্ঞান বিভাগ (Science) ====================
  { id: '910_136', code: '136', name: 'পদার্থবিজ্ঞান (Physics)', classes: ['9','10'], group: 'Science', cq: 50, mcq: 25, prac: 25, isOptionalAllowed: false },
  { id: '910_137', code: '137', name: 'রসায়ন (Chemistry)', classes: ['9','10'], group: 'Science', cq: 50, mcq: 25, prac: 25, isOptionalAllowed: false },
  { id: '910_150_S', code: '150', name: 'বাংলাদেশ ও বিশ্বপরিচয়', classes: ['9','10'], group: 'Science', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: false },
  // বিজ্ঞান বিভাগের নির্বাচনী ও ৪র্থ বিষয়সমূহ (138, 126, 134)
  { id: '910_138', code: '138', name: 'জীববিজ্ঞান (Biology)', classes: ['9','10'], group: 'Science', cq: 50, mcq: 25, prac: 25, isOptionalAllowed: true, scienceElective: true },
  { id: '910_126', code: '126', name: 'উচ্চতর গণিত (Higher Math)', classes: ['9','10'], group: 'Science', cq: 50, mcq: 25, prac: 25, isOptionalAllowed: true, scienceElective: true },
  { id: '910_134_S', code: '134', name: 'কৃষিশিক্ষা (Agriculture)', classes: ['9','10'], group: 'Science', cq: 50, mcq: 25, prac: 25, isOptionalAllowed: true, onlyOptionalInGroup: true },

  // ==================== ৯ম ও ১০ম শ্রেণী — মানবিক বিভাগ (Humanities) ====================
  { id: '910_153', code: '153', name: 'বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা', classes: ['9','10'], group: 'Humanities', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: false },
  { id: '910_110', code: '110', name: 'ভূগোল ও পরিবেশ', classes: ['9','10'], group: 'Humanities', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: false },
  { id: '910_140', code: '140', name: 'পৌরনীতি ও নাগরিকতা', classes: ['9','10'], group: 'Humanities', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: false },
  { id: '910_127_H', code: '127', name: 'সাধারণ বিজ্ঞান', classes: ['9','10'], group: 'Humanities', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: false },
  // মানবিক বিভাগের ৪র্থ বিষয়সমূহ (134, 141)
  { id: '910_134_H', code: '134', name: 'কৃষিশিক্ষা (৪র্থ বিষয়)', classes: ['9','10'], group: 'Humanities', cq: 50, mcq: 25, prac: 25, isOptionalAllowed: true, onlyOptionalInGroup: true },
  { id: '910_141_H', code: '141', name: 'অর্থনীতি (৪র্থ বিষয়)', classes: ['9','10'], group: 'Humanities', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: true, onlyOptionalInGroup: true },

  // ==================== ৯ম ও ১০ম শ্রেণী — ব্যবসায় শিক্ষা বিভাগ (Business Studies) ====================
  { id: '910_146', code: '146', name: 'হিসাববিজ্ঞান (Accounting)', classes: ['9','10'], group: 'Business Studies', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: false },
  { id: '910_152', code: '152', name: 'ফিন্যান্স ও ব্যাংকিং', classes: ['9','10'], group: 'Business Studies', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: false },
  { id: '910_143', code: '143', name: 'ব্যবসায় উদ্যোগ', classes: ['9','10'], group: 'Business Studies', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: false },
  { id: '910_127_B', code: '127', name: 'সাধারণ বিজ্ঞান', classes: ['9','10'], group: 'Business Studies', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: false },
  // ব্যবসায় শিক্ষা বিভাগের ৪র্থ বিষয়সমূহ (134, 141)
  { id: '910_134_B', code: '134', name: 'কৃষিশিক্ষা (৪র্থ বিষয়)', classes: ['9','10'], group: 'Business Studies', cq: 50, mcq: 25, prac: 25, isOptionalAllowed: true, onlyOptionalInGroup: true },
  { id: '910_141_B', code: '141', name: 'অর্থনীতি (৪র্থ বিষয়)', classes: ['9','10'], group: 'Business Studies', cq: 70, mcq: 30, prac: 0, isOptionalAllowed: true, onlyOptionalInGroup: true }
];

const CLASS_LABELS_BN = { '6': '৬ষ্ঠ শ্রেণী', '7': '৭ম শ্রেণী', '8': '৮ম শ্রেণী', '9': '৯ম শ্রেণী', '10': '১০ম শ্রেণী' };
const GROUP_LABELS_BN = { 'General': 'সাধারণ', 'Science': 'বিজ্ঞান', 'Humanities': 'মানবিক', 'Business Studies': 'ব্যবসায় শিক্ষা', 'ALL': 'সকল বিভাগ' };
const EXAM_LABELS_BN = {
  'Half-Yearly': 'অর্ধবার্ষিক পরীক্ষা',
  'Annual': 'বার্ষিক পরীক্ষা',
  'Combined': 'বার্ষিক ও অর্ধবার্ষিক সমন্বিত ফলাফল',
  'Test': 'নির্বাচনী (টেস্ট) পরীক্ষা'
};
const SHORT_DAY_NAMES_BN = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];

const App = {
  db: new LocalDB(),
  session: '2026',
  activeTab: 'dashboard',
  settings: {
    id: 'main',
    nameBn: '',
    nameEn: '',
    eiin: '',
    estd: '',
    address: '',
    pin: '',
    logo: '',
    hmSig: '',
    ecSig: '',
    lastBackup: '',
    sessions: ['2025', '2026', '2027', '2028'],
    activeSession: '2026',
    theme: 'light'
  },
  students: [],
  subjects: [],
  attendance: [],
  marks: [],
  tempStuPhoto: '',
  currentResultSubView: 'merit',
  currentCertType: 'testimonial',
  quickEditUID: null,
  selectedPromotionUIDs: new Set(),

  async init() {
    await this.db.init();
    await this.loadAllFromDB();
    let localTheme = null; try { localTheme = localStorage.getItem('serp_theme'); } catch (e) { /* ignore */ }
    this.applyTheme(localTheme || this.settings.theme || 'light');
    this.renderSessionSelectors();
    this.bindSettingUI();

    const ageDateEl = document.getElementById('age-ref-date');
    if (ageDateEl && !ageDateEl.value) {
      ageDateEl.value = new Date().toISOString().slice(0, 10);
    }

    // সকল ট্যাবের শ্রেণী -> বিভাগ ফিল্টার ইনিশিয়ালাইজ করা
    this.onStudentClassChange();
    this.syncSmartGroupFilter('filter-stu-class', 'filter-stu-group', true);
    this.syncSmartGroupFilter('id-class', 'id-group', true);
    this.syncSmartGroupFilter('att-class', 'att-group', false);
    this.syncSmartGroupFilter('as-class', 'as-group', true);
    this.syncSmartGroupFilter('qb-class', 'qb-group', true);
    this.syncSmartGroupFilter('mk-class', 'mk-group', false);
    this.syncSmartGroupFilter('smk-class', 'smk-group', true);
    this.syncSmartGroupFilter('res-class', 'res-group', false);
    this.syncSmartGroupFilter('promo-from-class', 'promo-from-group', false);
    this.syncSmartGroupFilter('age-class', 'age-group', true);
    this.syncSmartGroupFilter('cert-class', 'cert-group', true);

    if (typeof this.onMarkClassChange === 'function') {
      this.onMarkClassChange();
    }
    this.syncAllUI();
    this.initExtras();
  },

  async loadAllFromDB() {
    const savedSettings = await this.db.get('settings', 'main');
    if (savedSettings) {
      this.settings = { ...this.settings, ...savedSettings };
      if (!Array.isArray(this.settings.sessions) || !this.settings.sessions.length) {
        this.settings.sessions = ['2025', '2026', '2027', '2028'];
      }
      this.session = this.settings.activeSession || '2026';
    } else {
      this.settings.logo = this.generateDefaultLogoDataURL();
      await this.db.put('settings', this.settings);
    }

    this.subjects = await this.db.getAll('subjects');
    const hasSeparatePapers = this.subjects.some(s => s.code === '102') && this.subjects.some(s => s.code === '108');
    if (!this.subjects.length || !hasSeparatePapers) {
      await this.db.clear('subjects');
      this.subjects = [...DEFAULT_NCTB_SUBJECTS];
      await this.db.bulkPut('subjects', this.subjects);
    }

    this.students = await this.db.getAll('students');
    this.attendance = await this.db.getAll('attendance');
    this.marks = await this.db.getAll('marks');
    this.qrAtt = await this.db.getAll('qrattendance');
    this.fees = await this.db.getAll('fees');
    // ছবি না থাকলে (যেমন ব্যাকআপ/ইমপোর্ট থেকে) অটো প্লেসহোল্ডার বসানো — ভাঙা ছবি আসবে না
    this.students.forEach(s => { if (!s.photo) s.photo = this.generatePlaceholderAvatar(s.nameEn || s.nameBn || 'S'); });
  },

  /**
   * ফিক্সড ফাংশন: নির্দিষ্ট শ্রেণী ও বিভাগের জন্য প্রযোজ্য সকল বিষয়ের তালিকা রিটার্ন করে
   * (এই ফাংশনটি আগের ফাইলে মিসিং থাকায় পুরো অ্যাপ ক্র্যাশ করছিল)
   */
  /* (এই ফাংশনটি প্রোডাক্ট কি দিয়ে এনক্রিপ্টেড — secure-login.js চালুর সময় বসে) */

  /**
   * রিয়েল-টাইম অটো-সিঙ্ক ইঞ্জিন
   */
  syncAllUI() {
    this.updateDashboardKPIs();
    this.renderStudentTable();
    if (typeof this.renderSubjectConfigTable === 'function') this.renderSubjectConfigTable();

    if (this.activeTab === 'idcards' && typeof this.generateIDCards === 'function') this.generateIDCards(false);
    if (this.activeTab === 'attendance' && typeof this.loadAttendanceGrid === 'function') this.loadAttendanceGrid();
    if (this.activeTab === 'subjects') {
      if (typeof this.refreshMarkEntryView === 'function') this.refreshMarkEntryView();
      if (typeof this.populateSingleStudentDropdown === 'function') this.populateSingleStudentDropdown();
    }
    if (this.activeTab === 'results' && typeof this.processAndRenderResults === 'function') this.processAndRenderResults();
    if (this.activeTab === 'promotion' && typeof this.previewPromotion === 'function' && !this._promoEdited) this.previewPromotion();
    if (this.activeTab === 'agecalc' && typeof this.renderAgeCalculatorTable === 'function') this.renderAgeCalculatorTable();
    if (this.activeTab === 'certificates' && typeof this.populateCertificateStudents === 'function') this.populateCertificateStudents();
  },

  /**
   * ব্যবহারকারী এই মুহূর্তে কোনো গ্রিডে/ফর্মে কাজ করছেন কি? (হ্যাঁ হলে অন্য ডিভাইসের আপডেট এসে স্ক্রিন রিসেট করবে না)
   */
  isUserEditing() {
    if (this._attDirty || this._markDirty || this._promoEdited) return true;
    const m = document.getElementById('quick-mark-modal');
    if (m && !m.classList.contains('hidden')) return true;
    const ae = document.activeElement;
    if (ae && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName) && ae.closest('#bulk-mark-table, #att-table, #promo-table, #quick-modal-table, #student-form')) return true;
    return false;
  },
  /** লেখার আগে Drive থেকে সর্বশেষ ডাটা টেনে আনার হুক (secure-login.js এটি বসায়) */
  async syncBeforeWrite() { /* no-op */ },

  /* ==================== COLLAPSIBLE SIDEBAR & THEME ==================== */
  toggleSidebar() {
    document.body.classList.toggle('sidebar-collapsed');
  },

  toggleTheme() {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    this.applyTheme(next);
    this.settings.theme = next;
    // থিম প্রতিটি ডিভাইসের নিজস্ব পছন্দ — তাই Drive সিঙ্কে পাঠানো হয় না
    try { localStorage.setItem('serp_theme', next); } catch (e) { /* ignore */ }
  },

  applyTheme(mode) {
    const html = document.documentElement;
    const iconEl = document.getElementById('theme-icon');
    const textEl = document.getElementById('theme-text');
    if (mode === 'dark') {
      html.classList.add('dark');
      if (iconEl) iconEl.textContent = '☀️';
      if (textEl) textEl.textContent = 'লাইট মোড';
    } else {
      html.classList.remove('dark');
      if (iconEl) iconEl.textContent = '🌙';
      if (textEl) textEl.textContent = 'ডার্ক মোড';
    }
  },

  /* ==================== DYNAMIC SESSION MANAGER (+ / -) ==================== */
  renderSessionSelectors() {
    const sessions = [...new Set(this.settings.sessions)].sort();
    const globalSel = document.getElementById('global-session');
    const promoToSel = document.getElementById('promo-to-session');

    if (globalSel) {
      globalSel.innerHTML = sessions.map(yr => `<option value="${yr}" ${yr === this.session ? 'selected' : ''} class="text-slate-900">${yr}</option>`).join('');
    }
    if (promoToSel) {
      const nextYr = String(Number(this.session) + 1);
      const listWithNext = sessions.includes(nextYr) ? sessions : [...sessions, nextYr].sort();
      promoToSel.innerHTML = listWithNext.map(yr => `<option value="${yr}" ${yr === nextYr ? 'selected' : ''}>${yr}</option>`).join('');
    }
    document.querySelectorAll('.cur-session-label').forEach(el => { el.textContent = this.session; });
    const fromInput = document.getElementById('promo-from-session');
    if (fromInput) fromInput.value = this.session;
  },

  async addSessionPrompt() {
    const suggested = String(Math.max(...this.settings.sessions.map(Number)) + 1);
    const input = (await this.promptBox('নতুন শিক্ষাবর্ষ (Session Year) লিখুন (যেমন: 2028 বা 2029):', suggested, { title: 'নতুন শিক্ষাবর্ষ', icon: '📅', inputMode: 'numeric', confirmText: 'যুক্ত করুন' }));
    if (!input) return;
    const yr = input.trim();
    if (!/^\d{4}$/.test(yr)) {
      this.toast('অনুগ্রহ করে ৪ সংখ্যার সঠিক সাল লিখুন (যেমন: 2028)', 'error');
      return;
    }
    if (!this.settings.sessions.includes(yr)) {
      this.settings.sessions.push(yr);
      this.settings.sessions.sort();
    }
    this.session = yr;
    this.settings.activeSession = yr;
    await this.db.put('settings', this.settings);
    this.renderSessionSelectors();
    this.changeSession(yr);
    this.toast(`নতুন শিক্ষাবর্ষ ${yr} যুক্ত ও সক্রিয় করা হয়েছে!`);
  },

  async removeCurrentSession() {
    if (this.settings.sessions.length <= 1) {
      this.toast('কমপক্ষে একটি শিক্ষাবর্ষ সিস্টেমে থাকতে হবে!', 'error');
      return;
    }
    if (!(await this.confirmBox(`আপনি কি ${this.session} শিক্ষাবর্ষটি তালিকা থেকে সরাতে চান?`, { title: 'শিক্ষাবর্ষ সরান', danger: true, confirmText: 'সরান' }))) return;

    this.settings.sessions = this.settings.sessions.filter(s => s !== this.session);
    this.session = this.settings.sessions[this.settings.sessions.length - 1];
    this.settings.activeSession = this.session;
    await this.db.put('settings', this.settings);
    this.renderSessionSelectors();
    this.changeSession(this.session);
  },

  async changeSession(yr) {
    this.session = yr;
    this.settings.activeSession = yr;
    await this.db.put('settings', this.settings);
    this.renderSessionSelectors();
    this.syncAllUI();
    this.toast(`শিক্ষাবর্ষ ${yr} সক্রিয় করা হয়েছে।`);
  },

  /* ==================== SMART CASCADING CLASS ➔ GROUP FILTER ==================== */
  syncSmartGroupFilter(classSelectId, groupSelectId, allowAllOption = true) {
    const clsEl = document.getElementById(classSelectId);
    const grpEl = document.getElementById(groupSelectId);
    if (!clsEl || !grpEl) return;

    const cls = clsEl.value;
    const prevGrp = grpEl.value;

    if (['6', '7', '8'].includes(cls)) {
      grpEl.innerHTML = `<option value="General">সাধারণ (General)</option>`;
      grpEl.value = 'General';
    } else if (['9', '10'].includes(cls)) {
      grpEl.innerHTML =
        (allowAllOption ? `<option value="ALL">সকল বিভাগ (৯ম-১০ম)</option>` : '') +
        `<option value="Science">বিজ্ঞান (Science)</option>
         <option value="Humanities">মানবিক (Humanities)</option>
         <option value="Business Studies">ব্যবসায় শিক্ষা (Business Studies)</option>`;
      if (['Science', 'Humanities', 'Business Studies', ...(allowAllOption ? ['ALL'] : [])].includes(prevGrp)) {
        grpEl.value = prevGrp;
      }
    } else {
      grpEl.innerHTML = `
        <option value="ALL">সকল বিভাগ</option>
        <option value="General">সাধারণ (৬ষ্ঠ-৮ম)</option>
        <option value="Science">বিজ্ঞান (৯ম-১০ম)</option>
        <option value="Humanities">মানবিক (৯ম-১০ম)</option>
        <option value="Business Studies">ব্যবসায় শিক্ষা (৯ম-১০ম)</option>
      `;
    }
  },

  toast(msg, type = 'success') {
    const box = document.getElementById('toast-box');
    if (!box) return;
    const el = document.createElement('div');
    const bg = type === 'error'
      ? 'bg-rose-600'
      : type === 'warn'
      ? 'bg-amber-600'
      : 'bg-gradient-to-r from-blue-800 to-indigo-900 border-l-4 border-emerald-400';
    el.className = `${bg} text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl transition animate-section`;
    el.textContent = msg;
    box.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  },

  /* ---------- ওয়েবসাইট-ভিত্তিক ডায়ালগ (ব্রাউজারের confirm/prompt-এর বদলে) ---------- */
  _dlgOpen: false,
  _dialog(o) {
    return new Promise((resolve) => {
      const isPrompt = !!o.input;
      if (this._dlgOpen) { resolve(isPrompt ? null : false); return; }
      this._dlgOpen = true;
      const prevFocus = document.activeElement;
      const mk = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt !== undefined) e.textContent = txt; return e; };

      const ov = mk('div', 'sd-overlay no-print');
      const box = mk('div', 'sd-box');
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-modal', 'true');
      const head = mk('div', 'sd-head' + (o.danger ? ' sd-danger' : ''));
      head.append(mk('span', 'sd-ico', o.icon || (o.danger ? '⚠️' : (isPrompt ? '✏️' : '❓'))), mk('span', '', o.title || 'নিশ্চিত করুন'));
      const msg = mk('div', 'sd-msg', o.message || '');
      box.append(head, msg);

      let inp = null, err = null;
      if (isPrompt) {
        inp = mk('input', 'sd-input');
        inp.type = o.password ? 'password' : 'text';
        inp.value = o.defaultValue || '';
        inp.autocomplete = 'off';
        if (o.inputMode) inp.inputMode = o.inputMode;
        if (o.placeholder) inp.placeholder = o.placeholder;
        err = mk('div', 'sd-err');
        box.append(inp, err);
      }

      const actions = mk('div', 'sd-actions');
      const btnCancel = mk('button', 'sd-btn sd-cancel', o.cancelText || 'বাতিল');
      btnCancel.type = 'button';
      const btnOk = mk('button', 'sd-btn sd-ok' + (o.danger ? ' sd-danger' : ''), o.confirmText || 'ঠিক আছে');
      btnOk.type = 'button';
      actions.append(btnCancel, btnOk);
      box.append(actions);
      ov.append(box);

      const done = (val) => {
        document.removeEventListener('keydown', onKey, true);
        ov.remove();
        this._dlgOpen = false;
        try { if (prevFocus && prevFocus.focus) prevFocus.focus(); } catch (e) { /* ignore */ }
        resolve(val);
      };
      const cancelVal = isPrompt ? null : false;
      const onKey = (e) => {
        if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); done(cancelVal); return; }
        if (e.key === 'Enter' && document.activeElement !== btnCancel) { e.preventDefault(); e.stopPropagation(); btnOk.click(); return; }
        if (e.key === 'Tab') {
          const f = [inp, btnCancel, btnOk].filter(Boolean);
          const i = f.indexOf(document.activeElement);
          e.preventDefault();
          f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
        }
      };
      btnCancel.onclick = () => done(cancelVal);
      btnOk.onclick = () => done(isPrompt ? inp.value : true);
      ov.addEventListener('mousedown', (e) => { if (e.target === ov) done(cancelVal); });
      document.addEventListener('keydown', onKey, true);
      document.body.appendChild(ov);
      setTimeout(() => { if (inp) { inp.focus(); inp.select(); } else btnOk.focus(); }, 30);
    });
  },

  // হ্যাঁ/না নিশ্চিতকরণ — true বা false ফেরত দেয় (await করে ব্যবহার করুন)
  confirmBox(message, opts = {}) {
    return this._dialog({ message, ...opts });
  },

  // লেখা ইনপুট নেওয়া — লেখা (string) বা বাতিল হলে null ফেরত দেয় (await করে ব্যবহার করুন)
  promptBox(message, defaultValue = '', opts = {}) {
    return this._dialog({ message, defaultValue, input: true, ...opts });
  },

  /* ---- পিন এখন সাধারণ লেখা হিসেবে নয়, SHA-256 হ্যাশ করে সংরক্ষিত হয় ---- */
  async hashPin(pin) {
    pin = String(pin);
    if (!(window.crypto && crypto.subtle)) return pin;                 // পুরোনো/অনিরাপদ ব্রাউজারে ফলব্যাক
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('SERP|v1|' + pin));
    return 'sha256$' + Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  },
  async verifyPin(input) {
    const stored = String(this.settings.pin || '');
    if (!stored) return true;
    if (stored.startsWith('sha256$')) return (await this.hashPin(input)) === stored;
    if (input === stored) {                                            // পুরোনো প্লেইন পিন → মিলে গেলে হ্যাশে আপগ্রেড
      this.settings.pin = await this.hashPin(input);
      try { await this.db.put('settings', this.settings); } catch (e) { /* ignore */ }
      return true;
    }
    return false;
  },
  _pinFails: 0,
  _pinLockUntil: 0,
  async checkAdminPin() {
    if (!this.settings.pin) return true;
    const wait = Math.ceil((this._pinLockUntil - Date.now()) / 1000);
    if (wait > 0) { this.toast(`অনেকবার ভুল পিন! ${wait} সেকেন্ড পর আবার চেষ্টা করুন।`, 'error'); return false; }
    const input = await this.promptBox('নিরাপত্তা যাচাইকরণ: অনুগ্রহ করে অ্যাডমিন পিন (PIN) লিখুন:', '', {
      title: 'অ্যাডমিন পিন', icon: '🔒', password: true, placeholder: 'পিন নম্বর', confirmText: 'যাচাই করুন'
    });
    if (input !== null && await this.verifyPin(input)) { this._pinFails = 0; return true; }
    if (input !== null && ++this._pinFails >= 5) { this._pinFails = 0; this._pinLockUntil = Date.now() + 30000; }
    this.toast(input === null ? 'অ্যাকশন বাতিল করা হয়েছে।' : 'ভুল পিন নম্বর! অ্যাকশন বাতিল করা হয়েছে।', input === null ? 'warn' : 'error');
    return false;
  },
  async clearAdminPin() {
    if (!this.settings.pin) return this.toast('কোনো পিন সেট করা নেই।', 'warn');
    if (!(await this.checkAdminPin())) return;
    this.settings.pin = '';
    await this.db.put('settings', this.settings);
    this.bindSettingUI();
    this.toast('অ্যাডমিন পিন সরানো হয়েছে।', 'warn');
  },

  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll('.tab-section').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(`tab-${tabId}`);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('#main-tabs .side-nav-btn').forEach(btn => {
      if (btn.dataset.tab === tabId) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    this.syncAllUI();
  },

  /* ==================== QR CODE, BARCODE & IMAGE UTILITIES ==================== */
  /* QR এর ভেতরের টেক্সট ASCII-নিরাপদ করা — বাংলা অক্ষর থাকলে কিছু QR লাইব্রেরি ছবি তৈরি করতে ব্যর্থ হয় */
  qrSafe(text) {
    return String(text == null ? '' : text).replace(/[^\x20-\x7E]/g, ch => {
      try { return encodeURIComponent(ch); } catch (e) { return '?'; }
    });
  },
  bnToEnDigits(v) {
    return String(v == null ? '' : v).replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d));
  },

  generateQRDataURL(payloadText, size = 180) {
    if (typeof QRCode === 'undefined') return '';
    const make = (txt, level) => {
      const tempDiv = document.createElement('div');
      tempDiv.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.appendChild(tempDiv);
      let url = '';
      try {
        new QRCode(tempDiv, { text: txt, width: size, height: size, colorDark: '#0f172a', colorLight: '#ffffff', correctLevel: level });
        const canvas = tempDiv.querySelector('canvas');
        const img = tempDiv.querySelector('img');
        if (canvas) url = canvas.toDataURL('image/png');
        if ((!url || url === 'data:,') && img && img.src) url = img.src;
      } catch (e) { url = ''; }
      document.body.removeChild(tempDiv);
      return (url && url !== 'data:,') ? url : '';
    };
    const safe = this.qrSafe(payloadText);
    return make(safe, QRCode.CorrectLevel.M)
      || make(safe, QRCode.CorrectLevel.L)
      || make(safe.slice(0, 120), QRCode.CorrectLevel.L);
  },

  generateBarcodeSVGString(codeText, height = 20, width = 1.2) {
    if (typeof JsBarcode === 'undefined') return '';
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    try {
      JsBarcode(svg, String(codeText), {
        format: 'CODE128',
        width,
        height,
        displayValue: false,
        margin: 0,
        lineColor: '#1e3a8a'
      });
      const w = parseFloat(svg.getAttribute('width')) || 0;
      const h = parseFloat(svg.getAttribute('height')) || height;
      if (!svg.getAttribute('viewBox') && w) svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      svg.setAttribute('preserveAspectRatio', 'none');
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.setAttribute('style', 'width:100%;height:100%;display:block');
      return svg.outerHTML;
    } catch (e) {
      return '';
    }
  },

  compressImage(file, maxW = 300, maxH = 350, quality = 0.75, forcePng = false) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let w = img.width;
          let h = img.height;
          if (w > maxW || h > maxH) {
            const ratio = Math.min(maxW / w, maxH / h);
            w = Math.round(w * ratio);
            h = Math.round(h * ratio);
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (!forcePng) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, w, h);
          }
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL(forcePng ? 'image/png' : 'image/jpeg', quality));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  generateDefaultLogoDataURL() {
    const c = document.createElement('canvas');
    c.width = 160; c.height = 160;
    const ctx = c.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 160, 160);
    grad.addColorStop(0, '#1d4ed8');
    grad.addColorStop(1, '#0d9488');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(80, 80, 72, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 6; ctx.stroke();
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 30px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('বিদ্যালয়', 80, 90);
    return c.toDataURL('image/png');
  },

  generatePlaceholderAvatar(name = 'S') {
    const c = document.createElement('canvas');
    c.width = 180; c.height = 210;
    const ctx = c.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 180, 210);
    grad.addColorStop(0, '#dbeafe');
    grad.addColorStop(1, '#bfdbfe');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 180, 210);
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 68px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText((name || 'S').charAt(0).toUpperCase(), 90, 128);
    return c.toDataURL('image/jpeg', 0.8);
  },

  normalizeDateString(rawVal) {
    if (!rawVal) return '';
    if (typeof rawVal === 'number') {
      const utcDays = Math.floor(rawVal - 25569);
      const dt = new Date(utcDays * 86400 * 1000);
      if (!isNaN(dt.getTime())) return dt.toISOString().slice(0, 10);
    }
    const str = String(rawVal).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
    const parsed = new Date(str);
    if (!isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
    return str;
  },

  /* ==================== SETTINGS & INSTITUTION PROFILE ==================== */
  bindSettingUI() {
    document.getElementById('set-name-bn').value = this.settings.nameBn || '';
    document.getElementById('set-name-en').value = this.settings.nameEn || '';
    document.getElementById('set-eiin').value = this.settings.eiin || '';
    document.getElementById('set-estd').value = this.settings.estd || '';
    document.getElementById('set-address').value = this.settings.address || '';
    const pinEl = document.getElementById('set-pin');
    pinEl.value = '';                                         // হ্যাশ/পিন কখনোই ফর্মে দেখানো হয় না
    pinEl.placeholder = this.settings.pin ? '•••• (পরিবর্তন করতে নতুন পিন লিখুন, খালি রাখলে আগেরটাই থাকবে)' : 'পিন সেট করতে লিখুন (ঐচ্ছিক)';
    if (!document.getElementById('set-pin-clear')) {
      const b = document.createElement('button');
      b.type = 'button'; b.id = 'set-pin-clear';
      b.className = 'mt-1 text-[11px] font-bold text-rose-600 underline';
      b.textContent = 'বর্তমান পিন সরান';
      b.onclick = () => App.clearAdminPin();
      pinEl.insertAdjacentElement('afterend', b);
    }
    document.getElementById('set-pin-clear').style.display = this.settings.pin ? '' : 'none';

    document.getElementById('nav-school-name').textContent = this.settings.nameBn || 'প্রতিষ্ঠানের নাম সেট করুন';
    document.getElementById('nav-eiin').textContent = this.settings.eiin || '—';

    if (this.settings.logo) {
      document.getElementById('prev-logo').src = this.settings.logo;
      const navLogo = document.getElementById('nav-school-logo');
      navLogo.src = this.settings.logo;
      navLogo.classList.remove('hidden');
    }
    if (this.settings.hmSig) document.getElementById('prev-hm-sig').src = this.settings.hmSig;
    if (this.settings.ecSig) document.getElementById('prev-ec-sig').src = this.settings.ecSig;
    if (this.settings.lastBackup) {
      document.getElementById('last-backup-label').textContent = this.settings.lastBackup;
    }
  },

  async handleSettingImage(event, key) {
    const file = event.target.files[0];
    if (!file) return;
    const dataUrl = await this.compressImage(file, 320, 180, 0.9, true);
    this.settings[key] = dataUrl;
    // আগে ফর্মের না-সেভ-করা লেখা হারিয়ে যেত — এখন ছবি বদলের সাথে ফর্মের তথ্যও রেখে দেওয়া হয়
    const keep = ['set-name-bn', 'set-name-en', 'set-eiin', 'set-estd', 'set-address', 'set-pin'].map(id => [id, document.getElementById(id).value]);
    this.bindSettingUI();
    keep.forEach(([id, v]) => { if (id !== 'set-pin' || v) document.getElementById(id).value = v; });
    if (key === 'logo') { const nl = document.getElementById('nav-school-logo'); if (nl) { nl.src = dataUrl; nl.classList.remove('hidden'); } }
    this.toast('ছবি বসানো হয়েছে — "সংরক্ষণ" চাপলে স্থায়ী হবে।', 'warn');
  },

  async saveSettings(event) {
    event.preventDefault();
    this.settings.nameBn = document.getElementById('set-name-bn').value.trim();
    this.settings.nameEn = document.getElementById('set-name-en').value.trim();
    this.settings.eiin = document.getElementById('set-eiin').value.trim();
    this.settings.estd = document.getElementById('set-estd').value.trim();
    this.settings.address = document.getElementById('set-address').value.trim();
    const newPin = document.getElementById('set-pin').value.trim();
    if (newPin) {
      if (this.settings.pin && !(await this.checkAdminPin())) return;      // পিন বদলাতে পুরোনো পিন লাগবে
      this.settings.pin = await this.hashPin(newPin);
    }

    await this.db.put('settings', this.settings);
    this.bindSettingUI();
    this.syncAllUI();
    this.toast('প্রতিষ্ঠানের তথ্য ও ওয়াটারমার্ক লোগো সাথে সাথে আপডেট হয়েছে!');
  },

  updateDashboardKPIs() {
    const cur = this.students.filter(s => s.session === this.session);
    document.getElementById('stat-total-students').textContent = cur.length;
    document.getElementById('stat-6to8').textContent = cur.filter(s => ['6','7','8'].includes(s.cls)).length;
    document.getElementById('stat-sci').textContent = cur.filter(s => ['9','10'].includes(s.cls) && s.group === 'Science').length;
    document.getElementById('stat-hum').textContent = cur.filter(s => ['9','10'].includes(s.cls) && s.group === 'Humanities').length;
    document.getElementById('stat-bus').textContent = cur.filter(s => ['9','10'].includes(s.cls) && s.group === 'Business Studies').length;
  },

  /* ==================== STUDENT ADMISSION & STRICT 4TH SUBJECT LOGIC ==================== */
  onStudentClassChange() {
    this.syncSmartGroupFilter('stu-class', 'stu-group', false);
    this.populateOptionalSubjects();
    if (!document.getElementById('stu-edit-id').value) {
      const cls = document.getElementById('stu-class').value;
      document.getElementById('stu-uid').value = this.generateUniqueStudentID(cls);
    }
  },

  populateOptionalSubjects() {
    const cls = document.getElementById('stu-class').value;
    const grp = document.getElementById('stu-group').value;
    const optSelect = document.getElementById('stu-optional');
    const optWrap = document.getElementById('stu-optional-wrap');
    const sciMainWrap = document.getElementById('stu-science-main-wrap');
    const sciMainSelect = document.getElementById('stu-main-elective');

    if (['6','7','8'].includes(cls)) {
      optWrap.classList.add('hidden');
      if (sciMainWrap) sciMainWrap.classList.add('hidden');
      optSelect.innerHTML = `<option value=""></option>`;
      optSelect.value = '';
      return;
    }

    optWrap.classList.remove('hidden');

    if (grp === 'Science') {
      if (sciMainWrap) sciMainWrap.classList.remove('hidden');
      const mainElec = sciMainSelect ? sciMainSelect.value : '138';
      const candidates = this.subjects.filter(sub =>
        sub.classes.includes(cls) &&
        sub.group === 'Science' &&
        sub.isOptionalAllowed &&
        sub.code !== mainElec
      );
      const prevVal = optSelect.value;
      optSelect.innerHTML = candidates.map(c => `<option value="${c.code}">${c.code} - ${c.name}</option>`).join('');
      if (candidates.some(c => c.code === prevVal)) {
        optSelect.value = prevVal;
      } else {
        optSelect.value = mainElec === '138' ? '126' : '138';
      }
    } else {
      if (sciMainWrap) sciMainWrap.classList.add('hidden');
      const candidates = this.subjects.filter(sub =>
        sub.classes.includes(cls) &&
        sub.group === grp &&
        sub.isOptionalAllowed
      );
      const prevVal = optSelect.value;
      optSelect.innerHTML = candidates.map(c => `<option value="${c.code}">${c.code} - ${c.name}</option>`).join('');
      if (candidates.some(c => c.code === prevVal)) {
        optSelect.value = prevVal;
      } else if (candidates.length) {
        optSelect.value = candidates[0].code;
      }
    }
  },

  onScienceMainElectiveChange() {
    this.populateOptionalSubjects();
  },

  onOptionalSubjectChange() {
    const grp = document.getElementById('stu-group').value;
    const sciMainSelect = document.getElementById('stu-main-elective');
    const optSelect = document.getElementById('stu-optional');
    if (grp === 'Science' && sciMainSelect && optSelect) {
      if (sciMainSelect.value === optSelect.value) {
        sciMainSelect.value = optSelect.value === '138' ? '126' : '138';
        this.populateOptionalSubjects();
      }
    }
  },

  /* (এই ফাংশনটি প্রোডাক্ট কি দিয়ে এনক্রিপ্টেড — secure-login.js চালুর সময় বসে) */

  getStudentsTakingSubject(cls, grp, sub) {
    const list = this.getFilteredStudents(cls, grp);
    if (['6','7','8'].includes(cls) || !sub || !sub.isOptionalAllowed) {
      return list;
    }
    return list.filter(stu => {
      const stuSubs = this.getEffectiveSubjectsForStudent(stu);
      return stuSubs.some(x => x.code === sub.code);
    });
  },

  getSubjectNameByCode(code, cls = '9', grp = 'Science') {
    const found = this.subjects.find(s => s.code === code && s.classes.includes(cls) && (s.group === grp || s.group === 'ALL'))
               || this.subjects.find(s => s.code === code);
    return found ? `${found.code} - ${found.name}` : code;
  },

  generateUniqueStudentID(cls) {
    const yy = this.session.slice(-2);
    const cCode = String(cls).padStart(2, '0');
    const prefix = `${yy}${cCode}`;
    const existingSeqs = this.students
      .filter(s => s.uid && s.uid.startsWith(prefix))
      .map(s => parseInt(s.uid.slice(4), 10) || 0);
    const nextSeq = (existingSeqs.length ? Math.max(...existingSeqs) : 0) + 1;
    return `${prefix}${String(nextSeq).padStart(3, '0')}`;
  },

  async handleStudentPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    this.tempStuPhoto = await this.compressImage(file, 300, 350, 0.75, false);
    document.getElementById('stu-photo-prev').src = this.tempStuPhoto;
  },

  async saveStudent(event) {
    event.preventDefault();
    await this.syncBeforeWrite();
    const editRecordId = document.getElementById('stu-edit-id').value;
    const cls = document.getElementById('stu-class').value;
    const group = document.getElementById('stu-group').value;
    const roll = parseInt(document.getElementById('stu-roll').value, 10);
    const nameBn = document.getElementById('stu-name-bn').value.trim();
    const nameEn = document.getElementById('stu-name-en').value.trim();

    const uid = editRecordId
      ? document.getElementById('stu-uid').value
      : this.generateUniqueStudentID(cls);

    const recordId = editRecordId || `${this.session}_${uid}`;
    const existing = this.students.find(s => s.recordId === recordId);

    // একই শ্রেণী ও বিভাগে একই রোল থাকলে সতর্ক করা
    const dupRoll = this.students.find(s => s.session === this.session && s.cls === cls && s.group === group &&
      Number(s.roll) === roll && s.recordId !== recordId);
    if (dupRoll && !(await this.confirmBox(`এই শ্রেণী ও বিভাগে রোল ${roll} আগে থেকেই "${dupRoll.nameBn}" (ID: ${dupRoll.uid})-এর আছে। তবুও সংরক্ষণ করতে চান?`, { title: 'রোল নম্বর আগে থেকেই আছে', icon: '⚠️', confirmText: 'তবুও সংরক্ষণ করুন' }))) return;

    const isNineTen = ['9','10'].includes(cls);
    const optionalSubject = isNineTen ? document.getElementById('stu-optional').value : '';
    const mainElective = (isNineTen && group === 'Science')
      ? (document.getElementById('stu-main-elective')?.value || (optionalSubject === '138' ? '126' : '138'))
      : '';

    const studentObj = {
      recordId,
      uid,
      session: this.session,
      nameBn,
      nameEn,
      cls,
      group,
      roll,
      father: document.getElementById('stu-father').value.trim(),
      mother: document.getElementById('stu-mother').value.trim(),
      dob: document.getElementById('stu-dob').value,
      blood: document.getElementById('stu-blood').value,
      mobile: document.getElementById('stu-mobile').value.trim(),
      mainElective,
      optionalSubject,
      photo: this.tempStuPhoto || (existing ? existing.photo : this.generatePlaceholderAvatar(nameEn))
    };

    await this.db.put('students', studentObj);
    this.students = await this.db.getAll('students');
    this.resetStudentForm();
    this.syncAllUI();
    this.toast(`শিক্ষার্থী ${nameBn} (ID: ${uid}) সংরক্ষিত ও সকল মডিউলে আপডেট হয়েছে!`);
  },

  resetStudentForm() {
    document.getElementById('student-form').reset();
    document.getElementById('stu-edit-id').value = '';
    this.tempStuPhoto = '';
    document.getElementById('stu-photo-prev').src = '';
    this.onStudentClassChange();
  },

  editStudent(recordId) {
    const s = this.students.find(x => x.recordId === recordId);
    if (!s) return;
    document.getElementById('stu-edit-id').value = s.recordId;
    document.getElementById('stu-uid').value = s.uid;
    document.getElementById('stu-name-bn').value = s.nameBn;
    document.getElementById('stu-name-en').value = s.nameEn;
    document.getElementById('stu-class').value = s.cls;
    this.syncSmartGroupFilter('stu-class', 'stu-group', false);
    document.getElementById('stu-group').value = s.group;

    if (['9','10'].includes(s.cls) && s.group === 'Science') {
      const sciEl = document.getElementById('stu-main-elective');
      if (sciEl) sciEl.value = s.mainElective || (s.optionalSubject === '138' ? '126' : '138');
    }
    this.populateOptionalSubjects();
    if (['9','10'].includes(s.cls)) {
      document.getElementById('stu-optional').value = s.optionalSubject || '';
    }

    document.getElementById('stu-roll').value = s.roll;
    document.getElementById('stu-father').value = s.father;
    document.getElementById('stu-mother').value = s.mother;
    document.getElementById('stu-dob').value = s.dob || '';
    document.getElementById('stu-blood').value = s.blood || '';
    document.getElementById('stu-mobile').value = s.mobile || '';
    this.tempStuPhoto = s.photo || '';
    document.getElementById('stu-photo-prev').src = this.tempStuPhoto;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  async deleteStudent(recordId) {
    if (!(await this.checkAdminPin())) return;
    if (!(await this.confirmBox('আপনি কি নিশ্চিতভাবে এই শিক্ষার্থীর তথ্য মুছে ফেলতে চান?', { title: 'শিক্ষার্থী মুছুন', danger: true, confirmText: 'মুছে ফেলুন' }))) return;
    await this.db.delete('students', recordId);
    this.students = await this.db.getAll('students');
    this.syncAllUI();
    this.toast('শিক্ষার্থীর রেকর্ড মুছে ফেলা হয়েছে।', 'warn');
  },

  getFilteredStudents(clsFilter, grpFilter, search = '') {
    return this.students
      .filter(s => s.session === this.session)
      .filter(s => !clsFilter || clsFilter === 'ALL' || s.cls === clsFilter)
      .filter(s => !grpFilter || grpFilter === 'ALL' || s.group === grpFilter)
      .filter(s => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          s.nameBn.toLowerCase().includes(q) ||
          s.nameEn.toLowerCase().includes(q) ||
          s.uid.toLowerCase().includes(q) ||
          String(s.roll) === q
        );
      })
      .sort((a, b) => Number(a.cls) - Number(b.cls) || a.roll - b.roll);
  },

  stuPage: 1,
  stuPageSize: 25,
  _stuSig: '',

  renderStudentTable() {
    const cls = document.getElementById('filter-stu-class')?.value || 'ALL';
    const grp = document.getElementById('filter-stu-group')?.value || 'ALL';
    const q = (document.getElementById('filter-stu-search')?.value || '').trim();
    const list = this.getFilteredStudents(cls, grp, q);

    const showOptCol = !['6','7','8'].includes(cls);
    const thOpt = document.getElementById('th-optional-col');
    if (thOpt) thOpt.style.display = showOptCol ? '' : 'none';

    const badge = document.getElementById('stu-count-badge');
    if (badge) badge.textContent = list.length;
    const tbody = document.getElementById('student-table-body');
    if (!tbody) return;

    // ---- পেজ সিস্টেম ----
    const sizeSel = document.getElementById('stu-page-size');
    if (sizeSel) this.stuPageSize = parseInt(sizeSel.value, 10) || 25;
    const sig = [cls, grp, q, this.stuPageSize, this.session].join('|');
    if (sig !== this._stuSig) { this._stuSig = sig; this.stuPage = 1; }
    const total = list.length;
    const pages = Math.max(1, Math.ceil(total / this.stuPageSize));
    if (this.stuPage > pages) this.stuPage = pages;
    if (this.stuPage < 1) this.stuPage = 1;
    const startIdx = (this.stuPage - 1) * this.stuPageSize;
    const pageList = list.slice(startIdx, startIdx + this.stuPageSize);
    this.renderStudentPager(total, pages, startIdx, pageList.length);

    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="9" class="text-center py-10 text-slate-400">এই ফিল্টারে কোনো শিক্ষার্থী পাওয়া যায়নি। উপরের ফর্ম থেকে নতুন শিক্ষার্থী ভর্তি করুন অথবা Excel থেকে ইমপোর্ট করুন।</td></tr>`;
      return;
    }

    const todayStr = new Date().toISOString().slice(0, 10);

    tbody.innerHTML = pageList.map(s => {
      const ageObj = this.calculateExactAge ? this.calculateExactAge(s.dob, todayStr) : null;
      const ageBadge = ageObj && ageObj.valid
        ? `<span class="text-emerald-700 dark:text-emerald-300 font-bold">বয়স: ${ageObj.years}ব ${ageObj.months}মা ${ageObj.days}দি</span>`
        : `<span class="text-slate-400">জন্মতারিখ নেই</span>`;

      const isNineTen = ['9','10'].includes(s.cls);
      const optLabel = isNineTen && s.optionalSubject
        ? this.getSubjectNameByCode(s.optionalSubject, s.cls, s.group)
        : '-';
      const mainElecLabel = (isNineTen && s.group === 'Science')
        ? `<div class="text-[10px] text-violet-600 dark:text-violet-300 font-bold mt-0.5">আবশ্যিক: ${this.getSubjectNameByCode(s.mainElective || (s.optionalSubject === '138' ? '126' : '138'), s.cls, s.group)}</div>`
        : '';

      return `
        <tr class="hover:bg-blue-500/5 transition">
          <td><img src="${s.photo || ''}" class="w-10 h-12 object-cover rounded-lg border shadow-sm" /></td>
          <td class="font-mono font-extrabold text-blue-700 dark:text-blue-400">${s.uid}</td>
          <td class="font-extrabold text-center text-sm">${s.roll}</td>
          <td>
            <div class="font-bold">${this.esc(s.nameBn)}</div>
            <div class="text-slate-500 text-[11px]">${this.esc(s.nameEn)}</div>
          </td>
          <td>
            <span class="font-bold">${CLASS_LABELS_BN[s.cls]}</span><br/>
            <span class="text-indigo-600 dark:text-indigo-400 font-semibold">${GROUP_LABELS_BN[s.group]}</span>
          </td>
          <td>
            <div>পিতা: ${this.esc(s.father)}</div>
            <div>মাতা: ${this.esc(s.mother)}</div>
          </td>
          <td>
            <div class="font-mono font-semibold">📞 ${this.esc(s.mobile)}</div>
            <div class="text-rose-500 font-bold text-[11px]">রক্ত: ${s.blood || '-'} | জন্ম: ${s.dob || '-'}</div>
            <div class="text-[11px]">${ageBadge}</div>
          </td>
          <td style="display:${showOptCol ? '' : 'none'}">
            ${isNineTen
              ? `<span class="bg-amber-500/15 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded font-bold inline-block">৪র্থ: ${optLabel}</span>${mainElecLabel}`
              : '<span class="text-slate-400">প্রযোজ্য নয়</span>'}
          </td>
          <td class="text-center space-x-1 whitespace-nowrap">
            <button onclick="App.editStudent('${s.recordId}')" class="bg-amber-500 hover:bg-amber-400 text-white px-2.5 py-1 rounded-md font-bold">এডিট</button>
            <button onclick="App.deleteStudent('${s.recordId}')" class="bg-rose-600 hover:bg-rose-500 text-white px-2.5 py-1 rounded-md font-bold">ডিলিট</button>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderStudentPager(total, pages, startIdx, shown) {
    const el = document.getElementById('stu-pager');
    if (!el) return;
    if (!total) { el.innerHTML = ''; return; }
    const cur = this.stuPage;
    const nums = [];
    const add = (n) => { if (!nums.includes(n) && n >= 1 && n <= pages) nums.push(n); };
    add(1); add(2);
    for (let i = cur - 2; i <= cur + 2; i++) add(i);
    add(pages - 1); add(pages);
    nums.sort((a, b) => a - b);
    let btns = '';
    let prev = 0;
    nums.forEach(n => {
      if (prev && n - prev > 1) btns += `<span class="px-1 text-slate-400">…</span>`;
      btns += `<button onclick="App.goStudentPage(${n})" class="pg-btn ${n === cur ? 'pg-active' : ''}">${this.bnNum(n)}</button>`;
      prev = n;
    });
    el.innerHTML = `
      <div class="text-xs font-bold text-slate-600 dark:text-slate-300">
        দেখানো হচ্ছে <span class="text-blue-700 dark:text-blue-300">${this.bnNum(startIdx + 1)}–${this.bnNum(startIdx + shown)}</span> / মোট ${this.bnNum(total)} জন
        <span class="text-slate-400 font-normal">• পেজ ${this.bnNum(cur)} / ${this.bnNum(pages)}</span>
      </div>
      <div class="flex flex-wrap items-center gap-1">
        <button onclick="App.goStudentPage(1)" class="pg-btn" ${cur === 1 ? 'disabled' : ''} title="প্রথম পেজ">«</button>
        <button onclick="App.goStudentPage(${cur - 1})" class="pg-btn" ${cur === 1 ? 'disabled' : ''} title="আগের পেজ">‹ আগে</button>
        ${btns}
        <button onclick="App.goStudentPage(${cur + 1})" class="pg-btn" ${cur === pages ? 'disabled' : ''} title="পরের পেজ">পরে ›</button>
        <button onclick="App.goStudentPage(${pages})" class="pg-btn" ${cur === pages ? 'disabled' : ''} title="শেষ পেজ">»</button>
      </div>`;
  },

  goStudentPage(n) {
    this.stuPage = Math.max(1, Number(n) || 1);
    this.renderStudentTable();
    const box = document.getElementById('student-table-body');
    if (box) box.closest('.modern-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  /* ==== মডিউল ২: ফিল্টার করা শিক্ষার্থী তালিকা A4 প্রিন্ট (শ্রেণী অনুযায়ী আলাদা পেজ) ==== */
  printStudentList() {
    const cls = document.getElementById('filter-stu-class')?.value || 'ALL';
    const grp = document.getElementById('filter-stu-group')?.value || 'ALL';
    const q = (document.getElementById('filter-stu-search')?.value || '').trim();
    const withPhoto = document.getElementById('stu-print-photo')?.checked !== false;
    const landscape = (document.getElementById('stu-print-orient')?.value || 'portrait') === 'landscape';

    // পেজিনেশন নয় — ফিল্টারের সকল শিক্ষার্থী প্রিন্ট হবে
    const list = this.getFilteredStudents(cls, grp, q);
    if (!list.length) {
      this.toast('প্রিন্ট করার মতো কোনো শিক্ষার্থী পাওয়া যায়নি!', 'error');
      return;
    }

    const esc = (v) => this.esc(v);
    const grpOrder = { General: 0, Science: 1, Humanities: 2, 'Business Studies': 3 };
    const byCls = {};
    list.forEach(s => { (byCls[s.cls] = byCls[s.cls] || []).push(s); });
    const clsKeys = Object.keys(byCls).sort((a, b) => Number(a) - Number(b));
    const logo = this.settings.logo;
    const fs = landscape ? 10.5 : (withPhoto ? 9 : 9.5);

    const sections = clsKeys.map((c, idx) => {
      const rows = byCls[c].slice().sort((a, b) =>
        (grpOrder[a.group] ?? 9) - (grpOrder[b.group] ?? 9) || Number(a.roll) - Number(b.roll));
      const upper = ['9', '10'].includes(c);
      const grpTitle = (grp !== 'ALL' && upper) ? ` (${GROUP_LABELS_BN[grp] || esc(grp)})` : '';
      const qTitle = q ? ` — অনুসন্ধান: ${esc(q)}` : '';

      const body = rows.map((s, i) => `
        <tr>
          <td class="c nw">${this.bnNum(i + 1)}</td>
          ${withPhoto ? `<td class="c"><img class="stl-ph" src="${s.photo || ''}" alt="" /></td>` : ''}
          <td class="nw mono">${esc(s.uid)}</td>
          <td class="c nw"><b>${esc(s.roll)}</b></td>
          <td><b>${esc(s.nameBn)}</b><div class="en">${esc(s.nameEn)}</div></td>
          ${upper ? `<td>${GROUP_LABELS_BN[s.group] || esc(s.group)}</td>` : ''}
          <td>${esc(s.father)}</td>
          <td>${esc(s.mother)}</td>
          <td class="nw mono">${esc(s.mobile)}</td>
          <td class="nw">${esc(s.dob || '-')}</td>
          <td class="c nw">${esc(s.blood || '-')}</td>
          ${upper ? `<td>${s.optionalSubject ? esc(this.getSubjectNameByCode(s.optionalSubject, s.cls, s.group)) : '-'}</td>` : ''}
        </tr>`).join('');

      return `
      <div class="stl-sec ${idx > 0 ? 'stl-break' : ''}" style="--stl-fs:${fs}px">
        <div class="stl-head">
          ${logo ? `<img src="${logo}" alt="" />` : ''}
          <div>
            <div class="sn">${esc(this.settings.nameBn)}</div>
            <div class="sa">${esc(this.settings.address)}${this.settings.eiin ? ' | EIIN: ' + esc(this.settings.eiin) : ''}</div>
          </div>
        </div>
        <div class="stl-title"><span>শিক্ষার্থী তালিকা — ${CLASS_LABELS_BN[c]}${grpTitle} | শিক্ষাবর্ষ: ${esc(this.session)}${qTitle}</span></div>
        <table class="stl-table">
          <thead>
            <tr>
              <th class="c">ক্রম</th>
              ${withPhoto ? '<th class="c">ছবি</th>' : ''}
              <th>আইডি</th>
              <th class="c">রোল</th>
              <th>নাম (বাংলা / English)</th>
              ${upper ? '<th>বিভাগ</th>' : ''}
              <th>পিতার নাম</th>
              <th>মাতার নাম</th>
              <th>মোবাইল</th>
              <th>জন্ম তারিখ</th>
              <th class="c">রক্ত</th>
              ${upper ? '<th>৪র্থ বিষয়</th>' : ''}
            </tr>
          </thead>
          <tbody>${body}</tbody>
        </table>
        <div class="stl-foot">
          <div>মোট শিক্ষার্থী: ${this.bnNum(rows.length)} জন</div>
          <div class="sg">
            ${this.settings.hmSig ? `<img src="${this.settings.hmSig}" alt="" />` : '<div style="height:9mm"></div>'}
            <div class="ln">প্রধান শিক্ষক</div>
          </div>
        </div>
      </div>`;
    }).join('');

    this.printHTML(sections, landscape);
  },

  downloadStudentTemplate() {
    const sample = [
      {
        UniqueID: '2606001',
        NameBn: 'মোঃ তানভীর আহমেদ',
        NameEn: 'Md. Tanvir Ahmed',
        Class: '6',
        Group: 'General',
        Roll: 1,
        FatherName: 'মোঃ রফিকুল ইসলাম',
        MotherName: 'রোকেয়া বেগম',
        DOB: '2014-05-12',
        BloodGroup: 'O+',
        Mobile: '01711000001',
        MainElectiveCode: '',
        OptionalSubjectCode: ''
      },
      {
        UniqueID: '2609001',
        NameBn: 'নুসরাত জাহান সারা',
        NameEn: 'Nusrat Jahan Sara',
        Class: '9',
        Group: 'Science',
        Roll: 1,
        FatherName: 'আব্দুল করিম',
        MotherName: 'সালমা খাতুন',
        DOB: '2011-01-19',
        BloodGroup: 'AB+',
        Mobile: '01819001122',
        MainElectiveCode: '138',
        OptionalSubjectCode: '126'
      }
    ];
    const ws = XLSX.utils.json_to_sheet(sample);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students_Template');
    XLSX.writeFile(wb, `Student_Import_Template_${this.session}.xlsx`);
  },

  importStudentsExcel(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const wb = XLSX.read(data, { type: 'array' });
      const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      const toSave = [];
      for (const r of rows) {
        const cls = String(r.Class || '6').trim();
        const group = String(r.Group || (['6','7','8'].includes(cls) ? 'General' : 'Science')).trim();
        const uid = String(r.UniqueID || this.generateUniqueStudentID(cls)).trim();
        const nameEn = String(r.NameEn || r.NameBn || 'Student').trim();
        const isNineTen = ['9','10'].includes(cls);
        const optCode = isNineTen ? String(r.OptionalSubjectCode || (group === 'Science' ? '126' : '134')).trim() : '';
        const mainElec = (isNineTen && group === 'Science')
          ? String(r.MainElectiveCode || (optCode === '138' ? '126' : '138')).trim()
          : '';

        const obj = {
          recordId: `${this.session}_${uid}`,
          uid,
          session: this.session,
          nameBn: String(r.NameBn || nameEn).trim(),
          nameEn,
          cls,
          group,
          roll: parseInt(r.Roll || 1, 10),
          father: String(r.FatherName || '').trim(),
          mother: String(r.MotherName || '').trim(),
          dob: this.normalizeDateString(r.DOB),
          blood: String(r.BloodGroup || '').trim(),
          mobile: String(r.Mobile || '').trim(),
          mainElective: mainElec,
          optionalSubject: optCode,
          photo: this.generatePlaceholderAvatar(nameEn)
        };
        toSave.push(obj);
        this.students.push(obj);
      }
      await this.db.bulkPut('students', toSave);
      this.students = await this.db.getAll('students');
      this.syncAllUI();
      this.toast(`${toSave.length} জন শিক্ষার্থী Excel থেকে সফলভাবে ইমপোর্ট হয়েছে!`);
      event.target.value = '';
    };
    reader.readAsArrayBuffer(file);
  },

  exportStudentsExcel() {
    const cls = document.getElementById('filter-stu-class').value;
    const grp = document.getElementById('filter-stu-group').value;
    const list = this.getFilteredStudents(cls, grp);
    const rows = list.map(s => ({
      Session: s.session,
      UniqueID: s.uid,
      Class: s.cls,
      Group: s.group,
      Roll: s.roll,
      NameBn: s.nameBn,
      NameEn: s.nameEn,
      FatherName: s.father,
      MotherName: s.mother,
      DOB: s.dob,
      BloodGroup: s.blood,
      Mobile: s.mobile,
      MainElectiveCode: s.mainElective || '',
      OptionalSubjectCode: s.optionalSubject || ''
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, `Students_${this.session}_Class_${cls}.xlsx`);
  }
};
/**
 * ============================================================================
 * SMART SCHOOL ERP & RESULT PROCESSING SYSTEM v5.0 PRO (FIXED EDITION)
 * FILE: app.js (PART 2 OF 3)
 * ID Cards, Attendance Grid, Admit/Seat Plans & 4-Step Strict Mark Entry
 * ============================================================================
 */

Object.assign(App, {

  /* ==================== MODULE 3: ROYAL SMART ID CARD ==================== */
  generateIDCards(triggerPrint = false) {
    const cls = document.getElementById('id-class').value;
    const grp = document.getElementById('id-group').value;
    const singleQuery = document.getElementById('id-single-uid').value.trim();
    const perPage = parseInt(document.getElementById('id-density').value, 10);

    const list = this.getFilteredStudents(cls, grp, singleQuery);
    const previewBox = document.getElementById('idcard-preview-box');
    if (!previewBox) return;

    if (!list.length) {
      previewBox.innerHTML = `<p class="text-center text-slate-400 text-sm py-10">নির্বাচিত শ্রেণী ও বিভাগে কোনো শিক্ষার্থী পাওয়া যায়নি।</p>`;
      if (triggerPrint) this.toast('প্রিন্ট করার মতো কোনো শিক্ষার্থী পাওয়া যায়নি!', 'error');
      return;
    }

    // h = কার্ডের উচ্চতা (mm) — কার্ড এখন পুরো ঘর না ভরে নিজের মাপে থাকে, তাই ভেতরে/উপরে-নিচে সাদা জায়গা থাকে না
    const LAYOUTS = {
      6:  { cols: 2, rows: 3, h: 74, fs: 11.6, qr: 30, pw: 27 },
      8:  { cols: 2, rows: 4, h: 58, fs: 9.6,  qr: 24, pw: 22 },
      10: { cols: 2, rows: 5, h: 47, fs: 8,    qr: 19, pw: 18 }
    };
    const L = LAYOUTS[perPage] || LAYOUTS[8];
    const esc = (v) => this.esc(v);

    const cell = (s) => {
      // ছোট payload = বড় ঘরের QR = দ্রুত স্ক্যান। মডিউল ১১ এই "ID:" ফরম্যাট পড়ে।
      const qrPayload = `ID:${s.uid}|N:${s.nameEn}|C:${s.cls}|R:${s.roll}`;
      const qrDataUrl = this.generateQRDataURL(qrPayload, 300);
      const barcodeSvg = this.generateBarcodeSVGString(s.uid, 24, 1.4);
      const logo = this.settings.logo;
      return `
        <div class="idc" style="--fs:${L.fs}px;--qr:${L.qr}mm;--pw:${L.pw}mm">
          ${logo ? `<img class="idc-wm" src="${logo}" alt="" />` : ''}
          <div class="idc-head">
            ${logo ? `<img src="${logo}" alt="" />` : ''}
            <div class="idc-hd">
              <div class="idc-school">${esc(this.settings.nameBn)}</div>
              <div class="idc-sub">EIIN: ${esc(this.settings.eiin)} • শিক্ষাবর্ষ: ${esc(s.session)}</div>
            </div>
            <span class="idc-badge">STUDENT ID</span>
          </div>
          <div class="idc-body">
            <img class="idc-photo" src="${s.photo || ''}" alt="" />
            <div class="idc-info">
              <div>
                <div class="idc-name">${esc(s.nameBn)}</div>
                <div class="idc-en">${esc(s.nameEn)}</div>
              </div>
              <div class="idc-uid">ID: ${esc(s.uid)}</div>
              <div class="idc-row"><b>শ্রেণী:</b> ${CLASS_LABELS_BN[s.cls]} &nbsp;|&nbsp; <b>রোল:</b> <span class="idc-roll">${esc(s.roll)}</span></div>
              <div class="idc-row"><b>বিভাগ:</b> ${GROUP_LABELS_BN[s.group] || esc(s.group)}</div>
              <div class="idc-row"><b>পিতা:</b> ${esc(s.father)}</div>
              <div class="idc-row idc-mob">📞 ${esc(s.mobile)}</div>
            </div>
            <div class="idc-side">
              <div class="idc-qr">
                ${qrDataUrl ? `<img src="${qrDataUrl}" alt="QR" />` : `<div class="idc-noqr">QR</div>`}
                <span>SCAN QR</span>
              </div>
              ${s.blood ? `<span class="idc-blood">রক্ত: ${esc(s.blood)}</span>` : `<span></span>`}
            </div>
          </div>
          <div class="idc-foot">
            <div style="flex:1;min-width:0">
              <div class="idc-bc">${barcodeSvg}</div>
              <div class="idc-mono">${esc(s.uid)} • DOB: ${esc(s.dob || 'N/A')}</div>
            </div>
            <div style="text-align:center;flex:none">
              ${this.settings.hmSig ? `<img src="${this.settings.hmSig}" class="idc-sig" alt="" />` : `<div style="height:1.9em"></div>`}
              <div class="idc-sign">প্রধান শিক্ষক</div>
            </div>
          </div>
        </div>`;
    };

    const html = this.buildSheets(list, L.cols, L.rows, cell, { rowH: L.h + 2.4 });
    previewBox.innerHTML = html;
    this.fitPreview(previewBox, false);
    if (triggerPrint) this.printHTML(html, false);
  },

  /* ==================== MODULE 4: MONTHLY ATTENDANCE (AUTO FRI/SAT OFF) ==================== */
  isFridayOrSaturday(year, month, day) {
    const dt = new Date(Number(year), Number(month) - 1, Number(day));
    if (dt.getMonth() !== Number(month) - 1) return { validDate: false, isWeekend: false, dayName: '' };
    const dow = dt.getDay(); // 5 = Friday, 6 = Saturday
    return {
      validDate: true,
      isWeekend: dow === 5 || dow === 6,
      dayName: SHORT_DAY_NAMES_BN[dow]
    };
  },

  loadAttendanceGrid() {
    const cls = document.getElementById('att-class').value;
    const grp = document.getElementById('att-group').value;
    const month = document.getElementById('att-month').value;
    const list = this.getFilteredStudents(cls, grp);
    const container = document.getElementById('attendance-grid-container');
    if (!container) return;

    if (!list.length) {
      container.innerHTML = `<p class="text-center py-6 text-slate-400 text-sm">এই শ্রেণী ও বিভাগে কোনো শিক্ষার্থী নেই।</p>`;
      return;
    }

    const attId = `${this.session}_${cls}_${grp}_${month}`;
    const existingRecord = this.attendance.find(a => a.id === attId) || { id: attId, records: {} };

    let daysHeader = '';
    for (let d = 1; d <= 31; d++) {
      const info = this.isFridayOrSaturday(this.session, month, d);
      if (!info.validDate) {
        daysHeader += `<th class="text-center text-[9px] w-6 opacity-40">${d}<br/>-</th>`;
      } else {
        const wkBadge = info.isWeekend ? 'bg-purple-700 text-amber-200' : '';
        daysHeader += `<th class="text-center text-[9.5px] w-6 ${wkBadge}" title="${info.dayName}">${d}<br/><span class="text-[8px] font-normal">${info.dayName}</span></th>`;
      }
    }

    const rowsHtml = list.map(s => {
      const stuDays = existingRecord.records[s.uid] || {};
      let dayCells = '';
      let pCount = 0;
      let workDays = 0;

      for (let d = 1; d <= 31; d++) {
        const info = this.isFridayOrSaturday(this.session, month, d);
        if (!info.validDate) {
          dayCells += `<td class="bg-slate-200 dark:bg-slate-800 text-center text-[10px] text-slate-400 select-none">-</td>`;
          continue;
        }

        const status = stuDays[d] !== undefined ? stuDays[d] : (info.isWeekend ? 'W' : '');

        if (status === 'P' || status === 'A') workDays++;
        if (status === 'P') pCount++;

        const color =
          status === 'P' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold' :
          status === 'A' ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300 font-extrabold' :
          status === 'L' ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 font-extrabold' :
          status === 'W' ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300 font-bold' : '';

        dayCells += `
          <td onclick="App.toggleAttCell(this)" data-uid="${s.uid}" data-day="${d}" data-weekend="${info.isWeekend ? '1' : '0'}"
              class="att-cell cursor-pointer text-center text-[11px] select-none ${color}"
              title="ক্লিক করে পরিবর্তন করুন (P / A / L / W)">${status}</td>
        `;
      }

      return `
        <tr data-uid="${s.uid}">
          <td class="font-bold text-center">${s.roll}</td>
          <td class="whitespace-nowrap font-semibold">${this.esc(s.nameBn)}</td>
          ${dayCells}
          <td class="text-center font-bold stu-work-days">${workDays}</td>
          <td class="text-center font-extrabold text-emerald-600 stu-pres-days">${pCount}</td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <table class="w-full text-xs border-collapse formal-table" id="att-table">
        <thead>
          <tr>
            <th>রোল</th>
            <th>শিক্ষার্থীর নাম</th>
            ${daysHeader}
            <th>কার্যদিবস</th>
            <th>উপস্থিতি (P)</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    `;
  },

  toggleAttCell(td) {
    const order = ['P', 'A', 'L', 'W', ''];
    const cur = td.textContent.trim();
    const next = order[(order.indexOf(cur) + 1) % order.length];
    td.textContent = next;
    this._attDirty = true;
    td.className = `att-cell cursor-pointer text-center text-[11px] select-none ` +
      (next === 'P' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold' :
       next === 'A' ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300 font-extrabold' :
       next === 'L' ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 font-extrabold' :
       next === 'W' ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300 font-bold' : '');

    this.recalcAttendanceRow(td.closest('tr'));
  },

  recalcAttendanceRow(tr) {
    let w = 0, p = 0;
    tr.querySelectorAll('.att-cell').forEach(c => {
      const v = c.textContent.trim();
      if (v === 'P' || v === 'A') w++;
      if (v === 'P') p++;
    });
    tr.querySelector('.stu-work-days').textContent = w;
    tr.querySelector('.stu-pres-days').textContent = p;
  },

  markAllWorkingDaysPresent() {
    document.querySelectorAll('#att-table tbody tr').forEach(tr => {
      tr.querySelectorAll('.att-cell').forEach(td => {
        const isWk = td.dataset.weekend === '1';
        if (!isWk) {
          td.textContent = 'P';
          td.className = 'att-cell cursor-pointer text-center text-[11px] select-none bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold';
        }
      });
      this.recalcAttendanceRow(tr);
    });
    this.toast('শুক্র ও শনিবার (W) বাদে সকল কর্মদিবসে সবাইকে উপস্থিত (P) দেওয়া হয়েছে!');
  },

  async saveAttendanceGrid() {
    const cls = document.getElementById('att-class').value;
    const grp = document.getElementById('att-group').value;
    const month = document.getElementById('att-month').value;
    const attId = `${this.session}_${cls}_${grp}_${month}`;

    const records = {};
    document.querySelectorAll('#att-table tbody tr').forEach(tr => {
      const uid = tr.dataset.uid;
      records[uid] = {};
      tr.querySelectorAll('.att-cell').forEach(td => {
        const val = td.textContent.trim();
        records[uid][td.dataset.day] = val;
      });
    });

    await this.db.put('attendance', { id: attId, session: this.session, cls, grp, month, records });
    this._attDirty = false;
    this.attendance = await this.db.getAll('attendance');
    this.syncAllUI();
    this.toast('মাসিক হাজিরা সফলভাবে সংরক্ষিত ও সিঙ্ক হয়েছে!');
  },

  /**
   * ফিক্সড: বিভাগ 'ALL' থাকলেও শিক্ষার্থীর নিজস্ব হাজিরা সঠিকভাবে খুঁজে বের করবে
   */
  getStudentYearlyAttendance(uid, cls, grp) {
    const relevant = this.attendance.filter(a =>
      a.session === this.session &&
      a.cls === cls &&
      (!grp || grp === 'ALL' || a.grp === grp) &&
      a.records &&
      a.records[uid]
    );
    let working = 0, present = 0, absent = 0, leave = 0;
    relevant.forEach(a => {
      const days = (a.records && a.records[uid]) || {};
      Object.values(days).forEach(v => {
        if (v === 'P') { working++; present++; }
        else if (v === 'A') { working++; absent++; }
        else if (v === 'L') { leave++; }
      });
    });
    const rate = working > 0 ? ((present / working) * 100).toFixed(1) : '0.0';
    return { working, present, absent, leave, rate };
  },

  exportAttendanceExcel() {
    const table = document.getElementById('att-table');
    if (!table) return;
    const wb = XLSX.utils.table_to_book(table, { sheet: 'Attendance' });
    XLSX.writeFile(wb, `Attendance_${this.session}.xlsx`);
  },

  importAttendanceExcel(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const wb = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
      const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      const cls = document.getElementById('att-class').value;
      const grp = document.getElementById('att-group').value;
      const month = document.getElementById('att-month').value;
      const list = this.getFilteredStudents(cls, grp);
      const records = {};

      rows.forEach(r => {
        const roll = parseInt(r['রোল'] || r.Roll, 10);
        const stu = list.find(s => s.roll === roll);
        if (stu) {
          records[stu.uid] = {};
          for (let d = 1; d <= 31; d++) {
            if (r[d] !== undefined) records[stu.uid][d] = String(r[d]).trim().toUpperCase();
          }
        }
      });
      const attId = `${this.session}_${cls}_${grp}_${month}`;
      await this.db.put('attendance', { id: attId, session: this.session, cls, grp, month, records });
      this.attendance = await this.db.getAll('attendance');
      this.loadAttendanceGrid();
      this.toast('হাজিরা শিট Excel থেকে সফলভাবে ইমপোর্ট হয়েছে!');
      event.target.value = '';
    };
    reader.readAsArrayBuffer(file);
  },

  printAttendanceSheet() {
    const container = document.getElementById('attendance-grid-container');
    if (!container || !container.innerHTML) return;
    const cls = document.getElementById('att-class').value;
    const grp = document.getElementById('att-group').value;
    const month = document.getElementById('att-month').value;
    const header = this.buildPrintSchoolHeader(`মাসিক হাজিরা রেজিস্টার - মাস: ${month}/${this.session} | ${CLASS_LABELS_BN[cls]} (${GROUP_LABELS_BN[grp]})`);
    this.printHTML(header + container.innerHTML, true);
  },

  /* ==================== MODULE 5: ADMIT & SEAT PLAN ==================== */
  generateAdmitCards(triggerPrint = false) {
    const exam = document.getElementById('as-exam').value;
    const cls = document.getElementById('as-class').value;
    const grp = document.getElementById('as-group').value;
    const perPage = parseInt(document.getElementById('admit-density').value, 10);

    const list = this.getFilteredStudents(cls, grp);
    if (!list.length) {
      this.toast('এই শ্রেণীতে কোনো শিক্ষার্থী পাওয়া যায়নি!', 'error');
      return;
    }

    const LAYOUTS = {
      4: { cols: 2, rows: 2, fs: 12.5, qr: 36, notes: true },
      6: { cols: 2, rows: 3, fs: 10.5, qr: 28, notes: false },
      8: { cols: 2, rows: 4, fs: 9,    qr: 22, notes: false }
    };
    const L = LAYOUTS[perPage] || LAYOUTS[6];
    const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    const cell = (s) => {
      // "ID:" দিয়ে শুরু — তাই মডিউল ১১ (QR স্ক্যান হাজিরা) এই কোড সরাসরি পড়তে পারবে।
      const qrUrl = this.generateQRDataURL(`ID:${s.uid}|ADMIT|${exam}-${this.session}|N:${s.nameEn}|C:${s.cls}|R:${s.roll}`, 320);
      const bcSvg = this.generateBarcodeSVGString(s.uid, 24, 1.4);
      const fourth = ['9', '10'].includes(s.cls)
        ? `<div><b>৪র্থ বিষয়:</b> ${esc(this.getSubjectNameByCode(s.optionalSubject, s.cls, s.group))}</div>`
        : `<div><b>জন্ম তারিখ:</b> ${esc(s.dob || '-')}</div>`;
      return `
        <div class="adm" style="--fs:${L.fs}px;--qr:${L.qr}mm">
          ${this.settings.logo ? `<img class="adm-wm" src="${this.settings.logo}" alt="" />` : ''}
          <div class="adm-head">
            ${this.settings.logo ? `<img class="logo" src="${this.settings.logo}" alt="" />` : `<div class="logo"></div>`}
            <div class="ctr">
              <div class="adm-school">${esc(this.settings.nameBn)}</div>
              <div class="adm-addr">${esc(this.settings.address)} | EIIN: ${esc(this.settings.eiin)}</div>
              <div class="adm-title">প্রবেশপত্র (ADMIT CARD) — ${EXAM_LABELS_BN[exam]} ${this.session}</div>
            </div>
            <img class="photo" src="${s.photo || ''}" alt="" />
          </div>
          <div class="adm-main">
            <div class="adm-grid">
              <div style="grid-column:1/-1"><b>শিক্ষার্থীর নাম:</b> <span class="adm-name">${esc(s.nameBn)}</span></div>
              <div><b>ইউনিক আইডি:</b> <span class="adm-uid">${esc(s.uid)}</span></div>
              <div><b>শ্রেণী রোল:</b> <span class="adm-roll">${esc(s.roll)}</span></div>
              <div><b>শ্রেণী:</b> ${CLASS_LABELS_BN[s.cls]}</div>
              <div><b>বিভাগ:</b> ${GROUP_LABELS_BN[s.group] || esc(s.group)}</div>
              ${fourth}
              <div><b>পিতা:</b> ${esc(s.father)}</div>
              <div style="grid-column:1/-1"><b>মাতা:</b> ${esc(s.mother)}</div>
            </div>
            ${L.notes ? `
            <ol class="adm-notes">
              <li>প্রবেশপত্র ও স্মার্ট আইডি কার্ড অবশ্যই সঙ্গে আনতে হবে।</li>
              <li>পরীক্ষা শুরুর ১৫ মিনিট আগে কক্ষে উপস্থিত হতে হবে।</li>
              <li>মোবাইল ফোন ও অনুচিত উপকরণ সঙ্গে আনা সম্পূর্ণ নিষেধ।</li>
              <li>প্রবেশের সময় ও বের হওয়ার সময় QR কোড স্ক্যান করতে হবে।</li>
            </ol>` : ''}
          </div>
          <div class="adm-foot">
            <div class="adm-qr">
              <img src="${qrUrl}" alt="QR" />
              <div>পরীক্ষার হাজিরা — স্ক্যান করুন</div>
            </div>
            <div class="adm-mid">
              <div class="adm-bc">${bcSvg}</div>
              <div class="idc-mono">${esc(s.uid)}</div>
              <div class="adm-sigs">
                <div class="adm-sig">
                  ${this.settings.ecSig ? `<img src="${this.settings.ecSig}" alt="" />` : `<div class="sp"></div>`}
                  <div class="ln">পরীক্ষা নিয়ন্ত্রক</div>
                </div>
                <div class="adm-sig">
                  ${this.settings.hmSig ? `<img src="${this.settings.hmSig}" alt="" />` : `<div class="sp"></div>`}
                  <div class="ln">প্রধান শিক্ষক</div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    };

    const html = this.buildSheets(list, L.cols, L.rows, cell, {});
    const box = document.getElementById('admitseat-preview-box');
    box.innerHTML = html;
    this.fitPreview(box, false);
    if (triggerPrint) this.printHTML(html, false);
  },

  generateSeatPlans(triggerPrint = false) {
    const exam = document.getElementById('as-exam').value;
    const cls = document.getElementById('as-class').value;
    const grp = document.getElementById('as-group').value;
    const density = parseInt(document.getElementById('seat-density').value, 10);

    const list = this.getFilteredStudents(cls, grp);
    if (!list.length) {
      this.toast('এই শ্রেণীতে কোনো শিক্ষার্থী পাওয়া যায়নি!', 'error');
      return;
    }

    // h = স্লিপের উচ্চতা (mm) — ভেতরের অংশ (ছবি/নাম/রোল) পুরো উচ্চতা জুড়ে বসে, ফাঁকা থাকে না
    const LAYOUTS = {
      10: { cols: 2, rows: 5, h: 47, fs: 11,   pw: 23 },
      12: { cols: 3, rows: 4, h: 54, fs: 10.4, pw: 21 },
      15: { cols: 3, rows: 5, h: 44, fs: 9.4,  pw: 18 },
      18: { cols: 3, rows: 6, h: 37, fs: 8.4,  pw: 15 }
    };
    const L = LAYOUTS[density] || LAYOUTS[15];
    const esc = (v) => this.esc(v);

    const cell = (s) => `
      <div class="seat" style="--fs:${L.fs}px;--sw:${L.pw}mm">
        ${this.settings.logo ? `<img class="seat-wm" src="${this.settings.logo}" alt="" />` : ''}
        <div class="seat-head">
          <div class="t1">${esc(this.settings.nameBn)}</div>
          <div class="t2">${EXAM_LABELS_BN[exam]} - ${this.session} • আসন বিন্যাস</div>
        </div>
        <div class="seat-body">
          <img src="${s.photo || ''}" alt="" />
          <div class="seat-info">
            <div class="nm">${esc(s.nameBn)}</div>
            <div class="trunc"><b>শ্রেণী:</b> ${CLASS_LABELS_BN[s.cls]}</div>
            <div class="trunc"><b>বিভাগ:</b> ${GROUP_LABELS_BN[s.group] || esc(s.group)}</div>
            <div class="uid">ID: ${esc(s.uid)}</div>
          </div>
          <div class="seat-roll"><div class="lb">রোল</div><div class="no">${esc(s.roll)}</div></div>
        </div>
        <div class="seat-foot"><span>কক্ষ নং: ________</span><span>আসন নং: ________</span></div>
      </div>`;

    const html = this.buildSheets(list, L.cols, L.rows, cell, { rowH: L.h + 2.4 });
    const box = document.getElementById('admitseat-preview-box');
    box.innerHTML = html;
    this.fitPreview(box, false);
    if (triggerPrint) this.printHTML(html, false);
  },

  /* ==================== MODULE 6: 4-STEP SUBJECT & MARK ENTRY ==================== */
  /* (এই ফাংশনটি প্রোডাক্ট কি দিয়ে এনক্রিপ্টেড — secure-login.js চালুর সময় বসে) */

  switchMarkSubTab(sub) {
    ['blank','bulk','single','config'].forEach(k => {
      document.getElementById(`mark-view-${k}`)?.classList.add('hidden');
      const btn = document.getElementById(`subtab-btn-${k}`);
      if (btn) {
        btn.className = 'p-3 rounded-xl text-left transition bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200';
      }
    });

    const activeClass = 'p-3 rounded-xl text-left transition bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md';
    const bar = document.getElementById('mark-selector-bar');

    if (sub === 'blank-sheet') {
      bar.classList.remove('hidden');
      document.getElementById('mark-view-blank').classList.remove('hidden');
      document.getElementById('subtab-btn-blank').className = activeClass;
      this.refreshMarkEntryView();
    } else if (sub === 'bulk-entry') {
      bar.classList.remove('hidden');
      document.getElementById('mark-view-bulk').classList.remove('hidden');
      document.getElementById('subtab-btn-bulk').className = activeClass;
      this.refreshMarkEntryView();
    } else if (sub === 'single-entry') {
      bar.classList.add('hidden');
      document.getElementById('mark-view-single').classList.remove('hidden');
      document.getElementById('subtab-btn-single').className = activeClass;
      this.populateSingleStudentDropdown();
    } else {
      bar.classList.add('hidden');
      document.getElementById('mark-view-config').classList.remove('hidden');
      document.getElementById('subtab-btn-config').className = activeClass;
      this.renderSubjectConfigTable();
    }
  },

  onMarkClassChange() {
    this.syncSmartGroupFilter('mk-class', 'mk-group', false);
    this.populateMarkSubjectsDropdown();
  },

  populateMarkSubjectsDropdown() {
    const cls = document.getElementById('mk-class')?.value || '6';
    const grp = document.getElementById('mk-group')?.value || 'General';
    const subs = this.getSubjectsForClassGroup(cls, grp);
    const subEl = document.getElementById('mk-subject');
    if (!subEl) return;
    subEl.innerHTML = subs.map(s => `<option value="${s.id}">${s.code} - ${s.name} (পূর্ণমান: ${s.cq + s.mcq + s.prac})</option>`).join('');
    this.refreshMarkEntryView();
  },

  refreshMarkEntryView() {
    this.renderBlankTeacherSheet();
    this.renderBulkMarkEntryGrid();
    this.updateSubjectPassFailBanner();
  },

  updateSubjectPassFailBanner() {
    const subId = document.getElementById('mk-subject')?.value;
    const sub = this.subjects.find(s => s.id === subId);
    const banner = document.getElementById('subject-limit-banner');
    if (!sub || !banner) return;

    const cqPass = this.getPassMarkLimit(sub.cq);
    const mcqPass = this.getPassMarkLimit(sub.mcq);
    const pracPass = this.getPassMarkLimit(sub.prac);
    const full = sub.cq + sub.mcq + sub.prac;

    let passCount = 0;
    let failCount = 0;
    let enteredCount = 0;

    document.querySelectorAll('#bulk-mark-table tbody tr').forEach(tr => {
      const cqVal = tr.querySelector('.mk-cq')?.value ?? '';
      const mcqVal = tr.querySelector('.mk-mcq')?.value ?? '';
      const pracVal = tr.querySelector('.mk-prac')?.value ?? '';
      if (cqVal !== '' || mcqVal !== '' || pracVal !== '') {
        enteredCount++;
        if (sub.pairGroup) {
          const stuB = this.students.find(x => x.session === this.session && x.uid === tr.dataset.uid);
          const bExam = document.getElementById('mk-exam')?.value || 'Half-Yearly';
          const pair = this.getPairStatusForEntry(stuB, bExam, sub, { cq: cqVal, mcq: mcqVal, prac: pracVal });
          if (pair) {
            if (pair.complete) { if (pair.passed) passCount++; else failCount++; }
            return;
          }
        }
        const ev = this.evaluateSubjectMark(sub, cqVal, mcqVal, pracVal, true);
        if (ev.passed) passCount++;
        else failCount++;
      }
    });

    banner.innerHTML = `
      <div class="bg-blue-500/10 border border-blue-500/20 p-2.5 rounded-xl">
        <div class="text-slate-500 text-[10px]">বিষয় ও পূর্ণমান</div>
        <div class="font-extrabold text-blue-800 dark:text-blue-300">${sub.code} - মোট: ${full}${sub.pairGroup ? ' • সমন্বিত পাস' : ''}</div>
      </div>
      <div class="bg-indigo-500/10 border border-indigo-500/20 p-2.5 rounded-xl">
        <div class="text-slate-500 text-[10px]">লিখিত/CQ লিমিট</div>
        <div class="font-extrabold text-indigo-800 dark:text-indigo-300">${sub.cq > 0 ? `পূর্ণমান: ${sub.cq} | পাস: ${cqPass}` : 'প্রযোজ্য নয়'}</div>
      </div>
      <div class="bg-violet-500/10 border border-violet-500/20 p-2.5 rounded-xl">
        <div class="text-slate-500 text-[10px]">MCQ/ব্যাকরণ লিমিট</div>
        <div class="font-extrabold text-violet-800 dark:text-violet-300">${sub.mcq > 0 ? `পূর্ণমান: ${sub.mcq} | পাস: ${mcqPass}` : 'প্রযোজ্য নয়'}</div>
      </div>
      <div class="bg-teal-500/10 border border-teal-500/20 p-2.5 rounded-xl">
        <div class="text-slate-500 text-[10px]">ব্যবহারিক লিমিট</div>
        <div class="font-extrabold text-teal-800 dark:text-teal-300">${sub.prac > 0 ? `পূর্ণমান: ${sub.prac} | পাস: ${pracPass}` : 'প্রযোজ্য নয়'}</div>
      </div>
      <div class="bg-emerald-500/15 border border-emerald-500/30 p-2.5 rounded-xl">
        <div class="text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">উত্তীর্ণ (Pass)</div>
        <div class="font-extrabold text-lg text-emerald-700 dark:text-emerald-300">${passCount} জন <span class="text-[10px] font-normal">/ ${enteredCount}</span></div>
      </div>
      <div class="bg-rose-500/15 border border-rose-500/30 p-2.5 rounded-xl">
        <div class="text-rose-700 dark:text-rose-300 text-[10px] font-bold">অকৃতকার্য (Fail)</div>
        <div class="font-extrabold text-lg text-rose-600 dark:text-rose-300">${failCount} জন <span class="text-[10px] font-normal">/ ${enteredCount}</span></div>
      </div>
      ${sub.pairGroup ? `<div class="col-span-full bg-sky-500/10 border border-sky-500/30 p-2.5 rounded-xl text-[11px] font-bold text-sky-800 dark:text-sky-300">${this.pairRuleTextBn(sub)}</div>` : ''}
    `;
  },

  /**
   * ফিক্সড: ফাঁকা নম্বর সংগ্রহ শিটে ৯ম-১০ম শ্রেণীর শিক্ষার্থীদের ৪র্থ বিষয়ের অটো ব্যাজ যুক্ত করা হয়েছে
   */
  renderBlankTeacherSheet() {
    const exam = document.getElementById('mk-exam')?.value || 'Half-Yearly';
    const cls = document.getElementById('mk-class')?.value || '6';
    const grp = document.getElementById('mk-group')?.value || 'General';
    const subId = document.getElementById('mk-subject')?.value;
    const sub = this.subjects.find(s => s.id === subId);
    const list = this.getStudentsTakingSubject(cls, grp, sub);
    const box = document.getElementById('blank-sheet-preview');
    if (!box) return;

    if (!sub || !list.length) {
      box.innerHTML = `<p class="text-center py-6 text-slate-400 text-sm">এই বিষয়ে কোনো শিক্ষার্থী নেই।</p>`;
      return;
    }

    const cqPass = this.getPassMarkLimit(sub.cq);
    const mcqPass = this.getPassMarkLimit(sub.mcq);
    const pracPass = this.getPassMarkLimit(sub.prac);

    const header = this.buildPrintSchoolHeader(
      `বিষয়ভিত্তিক ফাঁকা নম্বর সংগ্রহ শিট (শিক্ষক কপি) — ${EXAM_LABELS_BN[exam]} ${this.session}<br/>
       ${CLASS_LABELS_BN[cls]} | বিভাগ: ${GROUP_LABELS_BN[grp]} | বিষয়: ${sub.code} - ${sub.name}`
    );

    const rows = list.map(s => {
      const isOpt = sub.isOptionalAllowed && this.getStudentOptionalCode(s) === sub.code;
      return `
        <tr class="h-8">
          <td class="text-center font-bold">${s.roll}</td>
          <td class="font-mono text-center">${s.uid}</td>
          <td class="font-semibold">
            ${s.nameBn}
            ${isOpt ? `<span style="background:#fef3c7;color:#92400e;border:1px solid #f59e0b;padding:1px 5px;border-radius:4px;font-size:9px;margin-left:4px;font-weight:700;">৪র্থ বিষয়</span>` : ''}
          </td>
          <td class="w-24 text-center text-slate-300">${sub.cq === 0 ? '×' : ''}</td>
          <td class="w-24 text-center text-slate-300">${sub.mcq === 0 ? '×' : ''}</td>
          <td class="w-24 text-center text-slate-300">${sub.prac === 0 ? '×' : ''}</td>
          <td class="w-24"></td>
          <td class="w-32"></td>
        </tr>
      `;
    }).join('');

    box.innerHTML = `
      <div id="printable-blank-sheet">
        ${header}
        <table class="w-full text-xs border-collapse formal-table mt-2">
          <thead>
            <tr>
              <th class="w-14">রোল</th>
              <th class="w-28">ইউনিক আইডি</th>
              <th>শিক্ষার্থীর নাম</th>
              <th>লিখিত (পূর্ণমান:${sub.cq} | পাস:${cqPass})</th>
              <th>MCQ/ব্যাকরণ (পূর্ণমান:${sub.mcq} | পাস:${mcqPass})</th>
              <th>ব্যবহারিক (পূর্ণমান:${sub.prac} | পাস:${pracPass})</th>
              <th>প্রাপ্ত মোট</th>
              <th>শিক্ষকের স্বাক্ষর</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <div class="flex justify-between mt-10 text-xs pt-4">
          <div class="border-t border-slate-800 px-4 pt-1 font-bold">বিষয় শিক্ষকের পূর্ণ স্বাক্ষর ও তারিখ</div>
          <div class="border-t border-slate-800 px-4 pt-1 font-bold">কম্পিউটার অপারেটরের স্বাক্ষর</div>
          <div class="border-t border-slate-800 px-4 pt-1 font-bold">প্রধান শিক্ষক / পরীক্ষা নিয়ন্ত্রক</div>
        </div>
      </div>
    `;
  },

  printBlankTeacherSheet() {
    const el = document.getElementById('printable-blank-sheet');
    if (!el) return;
    this.printHTML(el.innerHTML, false);
  },

  renderBulkMarkEntryGrid() {
    const exam = document.getElementById('mk-exam')?.value || 'Half-Yearly';
    const cls = document.getElementById('mk-class')?.value || '6';
    const grp = document.getElementById('mk-group')?.value || 'General';
    const subId = document.getElementById('mk-subject')?.value;
    const sub = this.subjects.find(s => s.id === subId);
    const list = this.getStudentsTakingSubject(cls, grp, sub);
    const box = document.getElementById('bulk-mark-grid');
    if (!box) return;

    if (!sub || !list.length) {
      box.innerHTML = `<p class="text-center py-6 text-slate-400 text-sm">এই বিষয়ে কোনো শিক্ষার্থী নেই।</p>`;
      return;
    }

    const cqPass = this.getPassMarkLimit(sub.cq);
    const mcqPass = this.getPassMarkLimit(sub.mcq);
    const pracPass = this.getPassMarkLimit(sub.prac);

    const rows = list.map(s => {
      const mkId = `${this.session}_${exam}_${s.uid}_${sub.code}`;
      const saved = this.marks.find(m => m.id === mkId) || { cq: '', mcq: '', prac: '' };
      const hasEntry = saved.cq !== '' || saved.mcq !== '' || saved.prac !== '';
      const evalRes = this.evaluateSubjectMark(sub, saved.cq, saved.mcq, saved.prac);
      const isOpt = sub.isOptionalAllowed && this.getStudentOptionalCode(s) === sub.code;

      return `
        <tr data-uid="${s.uid}" class="hover:bg-blue-500/5">
          <td class="text-center font-extrabold">${s.roll}</td>
          <td class="font-mono text-xs font-bold text-blue-700 dark:text-blue-400">${s.uid}</td>
          <td class="font-semibold">
            ${s.nameBn}
            ${isOpt ? '<span class="bg-amber-500/20 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded text-[10px] font-bold ml-1">৪র্থ বিষয়</span>' : ''}
          </td>
          <td class="text-center">
            <input type="number" min="0" max="${sub.cq}" data-max="${sub.cq}" data-pass="${cqPass}" data-label="লিখিত" value="${saved.cq}"
              ${sub.cq === 0 ? 'disabled' : ''}
              oninput="App.onStrictMarkInput(this, 'bulk')" onkeydown="App.handleEnterKeyNav(event, '#bulk-mark-table')"
              class="mk-cq w-24 modern-input text-center font-extrabold ${hasEntry && !evalRes.cqPass ? 'border-rose-500 text-rose-600 bg-rose-50' : ''}"
              placeholder="${sub.cq > 0 ? `0-${sub.cq}` : '×'}" />
          </td>
          <td class="text-center">
            <input type="number" min="0" max="${sub.mcq}" data-max="${sub.mcq}" data-pass="${mcqPass}" data-label="MCQ" value="${saved.mcq}"
              ${sub.mcq === 0 ? 'disabled' : ''}
              oninput="App.onStrictMarkInput(this, 'bulk')" onkeydown="App.handleEnterKeyNav(event, '#bulk-mark-table')"
              class="mk-mcq w-24 modern-input text-center font-extrabold ${hasEntry && !evalRes.mcqPass ? 'border-rose-500 text-rose-600 bg-rose-50' : ''}"
              placeholder="${sub.mcq > 0 ? `0-${sub.mcq}` : '×'}" />
          </td>
          <td class="text-center">
            <input type="number" min="0" max="${sub.prac}" data-max="${sub.prac}" data-pass="${pracPass}" data-label="ব্যবহারিক" value="${saved.prac}"
              ${sub.prac === 0 ? 'disabled' : ''}
              oninput="App.onStrictMarkInput(this, 'bulk')" onkeydown="App.handleEnterKeyNav(event, '#bulk-mark-table')"
              class="mk-prac w-24 modern-input text-center font-extrabold ${hasEntry && !evalRes.pracPass ? 'border-rose-500 text-rose-600 bg-rose-50' : ''}"
              placeholder="${sub.prac > 0 ? `0-${sub.prac}` : '×'}" />
          </td>
          <td class="mk-total text-center font-extrabold text-sm">${hasEntry ? evalRes.total : '-'}</td>
          <td class="mk-lg text-center font-extrabold">
            ${!hasEntry ? '<span class="text-slate-400">এন্ট্রি হয়নি</span>' : this.evalBadgeHTML(evalRes, sub, this.getPairStatusForEntry(s, exam, sub, saved))}
          </td>
        </tr>
      `;
    }).join('');

    box.innerHTML = `
      <table class="w-full text-xs border-collapse formal-table" id="bulk-mark-table" data-subid="${sub.id}">
        <thead>
          <tr>
            <th>রোল</th>
            <th>ইউনিক আইডি</th>
            <th>শিক্ষার্থীর নাম</th>
            <th>লিখিত (সর্বোচ্চ: ${sub.cq} | পাস: ${cqPass})</th>
            <th>MCQ (সর্বোচ্চ: ${sub.mcq} | পাস: ${mcqPass})</th>
            <th>ব্যবহারিক (সর্বোচ্চ: ${sub.prac} | পাস: ${pracPass})</th>
            <th>প্রাপ্ত মোট (${sub.cq + sub.mcq + sub.prac})</th>
            <th>গ্রেড ও স্ট্যাটাস</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  },

  onStrictMarkInput(inputEl, mode = 'bulk') {
    if (mode === 'bulk') this._markDirty = true;
    const maxAllowed = Number(inputEl.dataset.max || 0);
    const passLimit = Number(inputEl.dataset.pass || 0);
    const label = inputEl.dataset.label || 'নম্বর';

    if (inputEl.value !== '') {
      let num = Number(inputEl.value);
      if (num < 0) {
        inputEl.value = 0;
        num = 0;
      }
      if (num > maxAllowed) {
        inputEl.value = maxAllowed;
        num = maxAllowed;
        inputEl.classList.add('input-error-shake');
        setTimeout(() => inputEl.classList.remove('input-error-shake'), 600);
        this.toast(`সতর্কতা: ${label}-এ সর্বোচ্চ পূর্ণমান ${maxAllowed}-এর বেশি দেওয়া যাবে না!`, 'error');
      }

      if (num < passLimit) {
        inputEl.classList.add('border-rose-500', 'text-rose-600');
      } else {
        inputEl.classList.remove('border-rose-500', 'text-rose-600');
      }
    }

    const tr = inputEl.closest('tr');
    if (mode === 'bulk') {
      const table = tr.closest('table');
      const sub = this.subjects.find(s => s.id === table.dataset.subid);
      if (!sub) return;
      const cq = tr.querySelector('.mk-cq').value;
      const mcq = tr.querySelector('.mk-mcq').value;
      const prac = tr.querySelector('.mk-prac').value;
      const res = this.evaluateSubjectMark(sub, cq, mcq, prac);
      const anyVal = cq !== '' || mcq !== '' || prac !== '';
      tr.querySelector('.mk-total').textContent = anyVal ? res.total : '-';
      if (!anyVal) {
        tr.querySelector('.mk-lg').innerHTML = '<span class="text-slate-400">এন্ট্রি হয়নি</span>';
      } else {
        const stuB = this.students.find(x => x.session === this.session && x.uid === tr.dataset.uid);
        const bExam = document.getElementById('mk-exam')?.value || 'Half-Yearly';
        const pair = this.getPairStatusForEntry(stuB, bExam, sub, { cq, mcq, prac });
        tr.querySelector('.mk-lg').innerHTML = this.evalBadgeHTML(res, sub, pair);
      }
      this.updateSubjectPassFailBanner();
    } else {
      const sub = this.subjects.find(s => s.id === tr.dataset.subid);
      if (!sub) return;
      const cq = tr.querySelector('.smk-cq').value;
      const mcq = tr.querySelector('.smk-mcq').value;
      const prac = tr.querySelector('.smk-prac').value;
      const res = this.evaluateSubjectMark(sub, cq, mcq, prac);
      const anyVal = cq !== '' || mcq !== '' || prac !== '';
      tr.querySelector('.smk-total').textContent = anyVal ? res.total : '-';
      if (!anyVal) {
        tr.querySelector('.smk-lg').innerHTML = '-';
      } else {
        const sUid = document.getElementById('smk-student')?.value;
        const sExam = document.getElementById('smk-exam')?.value || 'Half-Yearly';
        const stuS = this.students.find(x => x.session === this.session && x.uid === sUid);
        const pair = this.getPairStatusForEntry(stuS, sExam, sub, { cq, mcq, prac });
        tr.querySelector('.smk-lg').innerHTML = this.evalBadgeHTML(res, sub, pair);
      }
    }
  },

  handleEnterKeyNav(e, tableSelector) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputs = Array.from(document.querySelectorAll(`${tableSelector} input:not([disabled])`));
      const idx = inputs.indexOf(e.target);
      if (idx >= 0 && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
        inputs[idx + 1].select();
      }
    }
  },

  async saveBulkMarks() {
    if (!(await this.checkAdminPin())) return;
    const exam = document.getElementById('mk-exam').value;
    const subId = document.getElementById('mk-subject').value;
    const sub = this.subjects.find(s => s.id === subId);
    if (!sub) return;

    const items = [];
    const clearIds = [];
    document.querySelectorAll('#bulk-mark-table tbody tr').forEach(tr => {
      const uid = tr.dataset.uid;
      const cq = tr.querySelector('.mk-cq').value;
      const mcq = tr.querySelector('.mk-mcq').value;
      const prac = tr.querySelector('.mk-prac').value;
      if (cq === '' && mcq === '' && prac === '') {
        // ঘর ফাঁকা করলে আগের সংরক্ষিত নম্বরও মুছে যাবে
        const oldId = `${this.session}_${exam}_${uid}_${sub.code}`;
        if (this.marks.some(m => m.id === oldId)) clearIds.push(oldId);
      }
      if (cq !== '' || mcq !== '' || prac !== '') {
        items.push({
          id: `${this.session}_${exam}_${uid}_${sub.code}`,
          session: this.session,
          exam,
          uid,
          subCode: sub.code,
          cq: Math.min(sub.cq, Math.max(0, Number(cq || 0))),
          mcq: Math.min(sub.mcq, Math.max(0, Number(mcq || 0))),
          prac: Math.min(sub.prac, Math.max(0, Number(prac || 0)))
        });
      }
    });

    for (const id of clearIds) await this.db.delete('marks', id);
    await this.db.bulkPut('marks', items);
    this.marks = await this.db.getAll('marks');
    this._markDirty = false;
    this.updateSubjectPassFailBanner();
    this.syncAllUI();
    this.toast(`${items.length} জন শিক্ষার্থীর নম্বর সফলভাবে সংরক্ষিত ও সিঙ্ক হয়েছে!`);
  },

  populateSingleStudentDropdown() {
    const cls = document.getElementById('smk-class')?.value || '6';
    const grp = document.getElementById('smk-group')?.value || 'ALL';
    const list = this.getFilteredStudents(cls, grp);
    const sel = document.getElementById('smk-student');
    if (!sel) return;
    sel.innerHTML = list.map(s => `<option value="${s.uid}">রোল ${s.roll} - ${this.esc(s.nameBn)} (${GROUP_LABELS_BN[s.group]})</option>`).join('');
    this.loadSingleStudentMarks();
  },

  loadSingleStudentMarks() {
    const exam = document.getElementById('smk-exam')?.value || 'Half-Yearly';
    const uid = document.getElementById('smk-student')?.value;
    const stu = this.students.find(s => s.session === this.session && s.uid === uid);
    const box = document.getElementById('single-student-mark-grid');
    if (!box) return;

    if (!stu) {
      box.innerHTML = `<p class="text-center py-4 text-slate-400 text-sm">এই শ্রেণীতে কোনো শিক্ষার্থী পাওয়া যায়নি।</p>`;
      return;
    }

    const subs = this.getEffectiveSubjectsForStudent(stu);
    const rows = subs.map(sub => {
      const mkId = `${this.session}_${exam}_${stu.uid}_${sub.code}`;
      const saved = this.marks.find(m => m.id === mkId) || { cq: '', mcq: '', prac: '' };
      const hasEntry = saved.cq !== '' || saved.mcq !== '' || saved.prac !== '';
      const res = this.evaluateSubjectMark(sub, saved.cq, saved.mcq, saved.prac);
      const isOpt = sub.isOptionalAllowed && this.getStudentOptionalCode(stu) === sub.code;

      const cqPass = this.getPassMarkLimit(sub.cq);
      const mcqPass = this.getPassMarkLimit(sub.mcq);
      const pracPass = this.getPassMarkLimit(sub.prac);

      return `
        <tr data-subid="${sub.id}" data-subcode="${sub.code}">
          <td class="font-mono font-bold text-center">${sub.code}</td>
          <td class="font-semibold">
            ${sub.name}
            ${isOpt ? '<span class="bg-amber-500/20 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-bold ml-1">৪র্থ বিষয়</span>' : ''}
          </td>
          <td class="text-center text-[11px] font-semibold text-slate-500">
            লিখিত:${sub.cq}(${cqPass}) | MCQ:${sub.mcq}(${mcqPass}) | Prac:${sub.prac}(${pracPass})
          </td>
          <td class="text-center">
            <input type="number" min="0" max="${sub.cq}" data-max="${sub.cq}" data-pass="${cqPass}" data-label="${sub.name} লিখিত" value="${saved.cq}"
              ${sub.cq === 0 ? 'disabled' : ''}
              oninput="App.onStrictMarkInput(this, 'single')" onkeydown="App.handleEnterKeyNav(event, '#single-stu-mark-table')"
              class="smk-cq w-20 modern-input text-center font-extrabold" placeholder="0-${sub.cq}" />
          </td>
          <td class="text-center">
            <input type="number" min="0" max="${sub.mcq}" data-max="${sub.mcq}" data-pass="${mcqPass}" data-label="${sub.name} MCQ" value="${saved.mcq}"
              ${sub.mcq === 0 ? 'disabled' : ''}
              oninput="App.onStrictMarkInput(this, 'single')" onkeydown="App.handleEnterKeyNav(event, '#single-stu-mark-table')"
              class="smk-mcq w-20 modern-input text-center font-extrabold" placeholder="0-${sub.mcq}" />
          </td>
          <td class="text-center">
            <input type="number" min="0" max="${sub.prac}" data-max="${sub.prac}" data-pass="${pracPass}" data-label="${sub.name} ব্যবহারিক" value="${saved.prac}"
              ${sub.prac === 0 ? 'disabled' : ''}
              oninput="App.onStrictMarkInput(this, 'single')" onkeydown="App.handleEnterKeyNav(event, '#single-stu-mark-table')"
              class="smk-prac w-20 modern-input text-center font-extrabold" placeholder="0-${sub.prac}" />
          </td>
          <td class="smk-total text-center font-extrabold">${hasEntry ? res.total : '-'}</td>
          <td class="smk-lg text-center">
            ${!hasEntry ? '-' : this.evalBadgeHTML(res, sub, this.getPairStatusForEntry(stu, exam, sub, saved))}
          </td>
        </tr>
      `;
    }).join('');

    box.innerHTML = `
      <table class="w-full text-xs border-collapse formal-table" id="single-stu-mark-table">
        <thead>
          <tr>
            <th>কোড</th>
            <th>বিষয়ের নাম</th>
            <th>পূর্ণমান ও পাস লিমিট</th>
            <th>লিখিত</th>
            <th>MCQ</th>
            <th>ব্যবহারিক</th>
            <th>প্রাপ্ত মোট</th>
            <th>গ্রেড ও স্ট্যাটাস</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  },

  async saveSingleStudentMarks() {
    if (!(await this.checkAdminPin())) return;
    const exam = document.getElementById('smk-exam').value;
    const uid = document.getElementById('smk-student').value;
    if (!uid) return;

    const items = [];
    document.querySelectorAll('#single-stu-mark-table tbody tr').forEach(tr => {
      const sub = this.subjects.find(s => s.id === tr.dataset.subid);
      const subCode = tr.dataset.subcode;
      const cq = tr.querySelector('.smk-cq').value;
      const mcq = tr.querySelector('.smk-mcq').value;
      const prac = tr.querySelector('.smk-prac').value;
      if (sub && (cq !== '' || mcq !== '' || prac !== '')) {
        items.push({
          id: `${this.session}_${exam}_${uid}_${subCode}`,
          session: this.session,
          exam,
          uid,
          subCode,
          cq: Math.min(sub.cq, Math.max(0, Number(cq || 0))),
          mcq: Math.min(sub.mcq, Math.max(0, Number(mcq || 0))),
          prac: Math.min(sub.prac, Math.max(0, Number(prac || 0)))
        });
      }
    });
    await this.db.bulkPut('marks', items);
    this.marks = await this.db.getAll('marks');
    this.loadSingleStudentMarks();
    this.syncAllUI();
    this.toast('শিক্ষার্থীর সকল বিষয়ের নম্বর সফলভাবে সংরক্ষিত ও সিঙ্ক হয়েছে!');
  },

  renderSubjectConfigTable() {
    const box = document.getElementById('subject-config-table');
    if (!box) return;
    box.innerHTML = `
      <table class="w-full text-xs border-collapse formal-table">
        <thead>
          <tr>
            <th>কোড</th>
            <th>বিষয়ের নাম</th>
            <th>শ্রেণীসমূহ</th>
            <th>বিভাগ / পেয়ার</th>
            <th>লিখিত (পাস)</th>
            <th>MCQ (পাস)</th>
            <th>ব্যবহারিক (পাস)</th>
            <th>মোট পূর্ণমান</th>
            <th>অ্যাকশন</th>
          </tr>
        </thead>
        <tbody>
          ${this.subjects.map(s => `
            <tr>
              <td class="font-mono font-bold text-center">${s.code}</td>
              <td class="font-semibold">${s.name}</td>
              <td class="text-center">${s.classes.join(', ')}</td>
              <td>${GROUP_LABELS_BN[s.group] || s.group} ${s.pairGroup ? `<span class="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-[10px] font-bold ml-1">${s.pairGroup}</span>` : ''}</td>
              <td class="text-center">${s.cq} (পাস: ${this.getPassMarkLimit(s.cq)})</td>
              <td class="text-center">${s.mcq} (পাস: ${this.getPassMarkLimit(s.mcq)})</td>
              <td class="text-center">${s.prac} (পাস: ${this.getPassMarkLimit(s.prac)})</td>
              <td class="text-center font-extrabold text-blue-700">${s.cq + s.mcq + s.prac}</td>
              <td class="text-center">
                <button onclick="App.deleteSubject('${s.id}')" class="text-rose-500 font-bold hover:underline">মুছুন</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  },

  async addCustomSubject(e) {
    e.preventDefault();
    const code = document.getElementById('sub-code').value.trim();
    const name = document.getElementById('sub-name').value.trim();
    const classes = document.getElementById('sub-classes').value.split(',').map(x => x.trim()).filter(Boolean);
    const group = document.getElementById('sub-group').value;
    const cq = parseInt(document.getElementById('sub-cq').value, 10) || 0;
    const mcq = parseInt(document.getElementById('sub-mcq').value, 10) || 0;
    const prac = parseInt(document.getElementById('sub-prac').value, 10) || 0;

    const pairGroup = ['101', '102'].includes(code) ? 'BANGLA' : ['107', '108'].includes(code) ? 'ENGLISH' : undefined;

    const newSub = {
      id: `custom_${Date.now()}`,
      code,
      name,
      classes,
      group,
      cq,
      mcq,
      prac,
      ...(pairGroup ? { pairGroup } : {}),
      // শুধু "ঐচ্ছিক / ৪র্থ বিষয়" নির্বাচন করলেই ঐচ্ছিক হবে (আগে ৯ম-১০ম-এর সব কাস্টম বিষয় ভুলবশত ঐচ্ছিক হয়ে হারিয়ে যেত)
      isOptionalAllowed: (classes.includes('9') || classes.includes('10')) && (document.getElementById('sub-type')?.value === 'optional')
    };
    await this.db.put('subjects', newSub);
    this.subjects = await this.db.getAll('subjects');
    e.target.reset();
    this.renderSubjectConfigTable();
    this.onMarkClassChange();
    this.syncAllUI();
    this.toast('নতুন বিষয় সফলভাবে যুক্ত হয়েছে!');
  },

  async deleteSubject(id) {
    if (!(await this.confirmBox('আপনি কি এই বিষয়টি তালিকা থেকে মুছে ফেলতে চান?', { title: 'বিষয় মুছুন', danger: true, confirmText: 'মুছে ফেলুন' }))) return;
    await this.db.delete('subjects', id);
    this.subjects = await this.db.getAll('subjects');
    this.renderSubjectConfigTable();
    this.onMarkClassChange();
    this.syncAllUI();
  },

  async resetDefaultSubjects() {
    if (!(await this.confirmBox('ডিফল্ট NCTB বিষয় তালিকায় রিসেট করতে চান?', { title: 'ডিফল্টে রিসেট', icon: '♻️', danger: true, confirmText: 'রিসেট করুন' }))) return;
    await this.db.clear('subjects');
    await this.db.bulkPut('subjects', DEFAULT_NCTB_SUBJECTS);
    this.subjects = await this.db.getAll('subjects');
    this.renderSubjectConfigTable();
    this.onMarkClassChange();
    this.syncAllUI();
    this.toast('ডিফল্ট বাংলা ১ম/২য় ও ইংরেজি ১ম/২য় পত্রযুক্ত NCTB কারিকুলাম রিসেট সম্পন্ন হয়েছে।');
  },

  exportMarksExcel() {
    const exam = document.getElementById('mk-exam').value;
    const cls = document.getElementById('mk-class').value;
    const grp = document.getElementById('mk-group').value;
    const subId = document.getElementById('mk-subject').value;
    const sub = this.subjects.find(s => s.id === subId);
    if (!sub) return;
    const list = this.getStudentsTakingSubject(cls, grp, sub);

    const rows = list.map(s => {
      const mk = this.marks.find(m => m.id === `${this.session}_${exam}_${s.uid}_${sub.code}`) || {};
      return {
        Roll: s.roll,
        UniqueID: s.uid,
        StudentName: s.nameBn,
        SubjectCode: sub.code,
        CQ_Max: sub.cq,
        CQ: mk.cq ?? '',
        MCQ_Max: sub.mcq,
        MCQ: mk.mcq ?? '',
        Practical_Max: sub.prac,
        Practical: mk.prac ?? ''
      };
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Marks');
    XLSX.writeFile(wb, `Marks_${this.session}_${exam}_Class${cls}_${sub.code}.xlsx`);
  },

  importMarksExcel(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const wb = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
      const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      const exam = document.getElementById('mk-exam').value;
      const subId = document.getElementById('mk-subject').value;
      const sub = this.subjects.find(s => s.id === subId);
      const toSave = [];

      rows.forEach(r => {
        const uid = String(r.UniqueID || '').trim();
        const isBlank = v => v === undefined || v === null || String(v).trim() === '';
        if (uid && sub && !(isBlank(r.CQ) && isBlank(r.MCQ) && isBlank(r.Practical))) {
          const clean = (v, mx) => { const n = Number(v); return Math.min(mx, Math.max(0, Number.isFinite(n) ? n : 0)); };
          toSave.push({
            id: `${this.session}_${exam}_${uid}_${sub.code}`,
            session: this.session,
            exam,
            uid,
            subCode: sub.code,
            cq: clean(r.CQ, sub.cq),
            mcq: clean(r.MCQ, sub.mcq),
            prac: clean(r.Practical, sub.prac)
          });
        }
      });
      await this.db.bulkPut('marks', toSave);
      this.marks = await this.db.getAll('marks');
      this.renderBulkMarkEntryGrid();
      this.updateSubjectPassFailBanner();
      this.syncAllUI();
      this.toast(`${toSave.length}টি নম্বর Excel থেকে সফলভাবে ইমপোর্ট ও সিঙ্ক হয়েছে!`);
      event.target.value = '';
    };
    reader.readAsArrayBuffer(file);
  }

});

/**
 * ============================================================================
 * SMART SCHOOL ERP & RESULT PROCESSING SYSTEM v5.0 PRO (FIXED EDITION)
 * FILE: app.js (PART 3 OF 3)
 * Board Grading (Combined 1st/2nd Papers), Watermark A4 Marksheet, Quick Edit,
 * Selective Roll Promotion, Age Calculator, Certificates & Demo Seeder
 * ============================================================================
 */

Object.assign(App, {

  /* ==================== MODULE 7: BOARD GRADING & WATERMARK A4 MARKSHEET ==================== */
  /* ---------- ছোট হেল্পার ---------- */
  _n(v) {
    const x = Number(v);
    return Number.isFinite(x) && x > 0 ? x : 0;
  },

  /**
   * ৯ম-১০ম শ্রেণীর শিক্ষার্থীর ৪র্থ (ঐচ্ছিক) বিষয়ের কোড।
   * getEffectiveSubjectsForStudent()-এর সাথে হুবহু মিল রাখা হয়েছে:
   * মানবিক/ব্যবসায় শিক্ষায় কোড ফাঁকা থাকলে ডিফল্ট 134 ধরা হয় (আগে এটি আবশ্যিক বিষয় হিসেবে ভুলভাবে গণনা হতো)।
   */
  getStudentOptionalCode(stu) {
    if (!stu || !['9', '10'].includes(String(stu.cls))) return '';
    const opt = String(stu.optionalSubject || '').trim();
    if (opt) return opt;
    return stu.group === 'Science' ? '' : '134';
  },

  /* ---------- একক বিষয়ের মূল্যায়ন (CQ / MCQ / Practical অংশভিত্তিক ৩৩%) ----------
   * standalone = false (ডিফল্ট) হলে বাংলা/ইংরেজির ১ম/২য় পত্র "পত্র-পর্যায়" ফলাফল পায় (ফেল ধরা হয় না);
   * কারণ এই দুই বিষয়ে পাস-ফেল দুই পত্র মিলিয়ে (evaluatePairCombined) নির্ধারিত হয়।
   */
  /* (এই ফাংশনটি প্রোডাক্ট কি দিয়ে এনক্রিপ্টেড — secure-login.js চালুর সময় বসে) */

  /**
   * শতকরা → GP/Grade। passed=false হলে সবসময় F।
   * passed=true হলে ন্যূনতম D (১.০০) — পাস/ফেলের সিদ্ধান্ত কলারের (অংশভিত্তিক বা সমন্বিত নিয়মে)।
   */
  /* (এই ফাংশনটি প্রোডাক্ট কি দিয়ে এনক্রিপ্টেড — secure-login.js চালুর সময় বসে) */

  /* (এই ফাংশনটি প্রোডাক্ট কি দিয়ে এনক্রিপ্টেড — secure-login.js চালুর সময় বসে) */

  getPerformanceRemarkBn(gpa, passed) {
    if (!passed) return 'অকৃতকার্য — বিশেষ যত্ন ও অধিক মনোযোগ প্রয়োজন';
    if (gpa >= 5.00) return 'অসাধারণ ও কৃতিত্বপূর্ণ ফলাফল (Outstanding)';
    if (gpa >= 4.00) return 'অত্যন্ত সন্তোষজনক ফলাফল (Very Good)';
    if (gpa >= 3.50) return 'ভালো ফলাফল, আরও উন্নতি সম্ভব (Good)';
    if (gpa >= 3.00) return 'সন্তোষজনক ফলাফল (Satisfactory)';
    return 'উত্তীর্ণ — পড়াশোনায় আরও অধিক প্রচেষ্টা প্রয়োজন';
  },

  /**
   * ১ম ও ২য় পত্রের সমন্বিত পাস/গ্রেড:
   *  • BANGLA  : CQ-যোগফল ≥ ৩৩% (মোট CQ-এর) এবং MCQ-যোগফল ≥ ৩৩% (মোট MCQ-এর) [ব্যবহারিক থাকলে তাও];
   *              CQ/MCQ আলাদা না থাকলে মোট নম্বর ≥ ৩৩%।
   *  • ENGLISH : দুই পত্রের মোট ≥ ৩৩% (এক পত্রে কম হলেও অন্য পত্র দিয়ে পূরণ হলে পাস)।
   *  • GP/Grade : (মোট প্রাপ্ত / মোট পূর্ণমান)×১০০ থেকে একটি মাত্র গ্রেড ও GP।
   * items = [{ sub, cq, mcq, prac }, ...]
   */
  evaluatePairCombined(items) {
    const pg = items[0].sub.pairGroup;
    let tCq = 0, tMcq = 0, tPrac = 0, mCq = 0, mMcq = 0, mPrac = 0;
    items.forEach(it => {
      const s = it.sub;
      mCq += this._n(s.cq); mMcq += this._n(s.mcq); mPrac += this._n(s.prac);
      tCq += Math.min(this._n(s.cq), this._n(it.cq));
      tMcq += Math.min(this._n(s.mcq), this._n(it.mcq));
      tPrac += Math.min(this._n(s.prac), this._n(it.prac));
    });
    const full = mCq + mMcq + mPrac;
    const total = tCq + tMcq + tPrac;

    let cqPass = true, mcqPass = true, pracPass = true, passed, failReason = '';
    const partwise = pg === 'BANGLA' && (mMcq > 0 || mPrac > 0);

    if (full === 0) {
      passed = false; failReason = 'পূর্ণমান নেই';
    } else if (partwise) {
      cqPass = mCq === 0 || tCq >= this.getPassMarkLimit(mCq);
      mcqPass = mMcq === 0 || tMcq >= this.getPassMarkLimit(mMcq);
      pracPass = mPrac === 0 || tPrac >= this.getPassMarkLimit(mPrac);
      passed = cqPass && mcqPass && pracPass;
      const f = [];
      if (!cqPass) f.push('সমন্বিত লিখিত');
      if (!mcqPass) f.push('সমন্বিত MCQ');
      if (!pracPass) f.push('সমন্বিত ব্যবহারিক');
      failReason = f.join('+');
    } else {
      passed = total >= this.getPassMarkLimit(full);
      cqPass = passed;
      failReason = passed ? '' : 'সমন্বিত <33%';
    }

    const pct = full > 0 ? (total * 100) / full : 0;
    const g = this.pctToGPAndGrade(pct, passed);
    return { passed, total, full, pct, gp: g.gp, lg: g.lg, failReason,
             cq: tCq, mcq: tMcq, prac: tPrac, cqPass, mcqPass, pracPass };
  },

  /** মার্ক-এন্ট্রি স্ক্রিনে একটি পত্রের সাথে অপর পত্র মিলিয়ে সমন্বিত অবস্থা (পেয়ার না হলে null) */
  getPairStatusForEntry(stu, exam, sub, curVals) {
    if (!stu || !sub || !sub.pairGroup) return null;
    const sibs = this.getEffectiveSubjectsForStudent(stu).filter(x => x.pairGroup === sub.pairGroup);
    if (sibs.length < 2) return null;
    const cur = curVals || {};
    const has = v => v !== undefined && v !== null && String(v) !== '';
    let complete = true;
    const items = sibs.map(x => {
      if (x.id === sub.id) {
        if (!(has(cur.cq) || has(cur.mcq) || has(cur.prac))) complete = false;
        return { sub: x, cq: cur.cq, mcq: cur.mcq, prac: cur.prac };
      }
      const mk = this.marks.find(m => m.id === `${this.session}_${exam}_${stu.uid}_${x.code}`);
      if (!mk) { complete = false; return { sub: x, cq: 0, mcq: 0, prac: 0 }; }
      return { sub: x, cq: mk.cq, mcq: mk.mcq, prac: mk.prac };
    });
    const pc = this.evaluatePairCombined(items);
    pc.complete = complete;
    pc.label = sub.pairGroup === 'BANGLA' ? 'বাংলা' : 'ইংরেজি';
    return pc;
  },

  /** বাংলা/ইংরেজি পত্রের পাস-নিয়মের বর্ণনা (ব্যানারে দেখানোর জন্য) */
  pairRuleTextBn(sub) {
    const sibs = this.subjects.filter(x => x.pairGroup === sub.pairGroup && x.group === sub.group &&
      x.classes.some(c => sub.classes.includes(c)));
    const list = sibs.length ? sibs : [sub];
    const mCq = list.reduce((a, x) => a + this._n(x.cq), 0);
    const mMcq = list.reduce((a, x) => a + this._n(x.mcq), 0);
    const mPrac = list.reduce((a, x) => a + this._n(x.prac), 0);
    const full = mCq + mMcq + mPrac;
    if (sub.pairGroup === 'BANGLA' && (mMcq > 0 || mPrac > 0)) {
      return `বাংলা ১ম+২য় পত্র একটি সমন্বিত বিষয়: লিখিত যোগফল ${mCq}-এ কমপক্ষে ${this.getPassMarkLimit(mCq)}` +
        (mMcq > 0 ? `, MCQ যোগফল ${mMcq}-এ কমপক্ষে ${this.getPassMarkLimit(mMcq)}` : '') +
        (mPrac > 0 ? `, ব্যবহারিক যোগফল ${mPrac}-এ কমপক্ষে ${this.getPassMarkLimit(mPrac)}` : '') +
        ' পেলে পাস। এক পত্রে আলাদা পাস বাধ্যতামূলক নয়।';
    }
    const nm = sub.pairGroup === 'BANGLA' ? 'বাংলা' : 'ইংরেজি';
    return `${nm} ১ম+২য় পত্র একটি সমন্বিত বিষয়: মোট ${full}-এ কমপক্ষে ${this.getPassMarkLimit(full)} (৩৩%) পেলে পাস। এক পত্রে কম হলেও অন্য পত্র দিয়ে পূরণ হলে চলবে।`;
  },

  /** গ্রেড/স্ট্যাটাস ব্যাজ (পেয়ার পত্র হলে সমন্বিত ফলাফল দেখায়) */
  evalBadgeHTML(res, sub, pair) {
    const base = 'px-2.5 py-0.5 rounded-full font-bold';
    if (sub && sub.pairGroup && pair) {
      if (!pair.complete) {
        return `<span class="bg-sky-500/15 text-sky-700 dark:text-sky-300 ${base}">${pair.label} সমন্বিত: অপর পত্রের নম্বরের অপেক্ষায়</span>`;
      }
      return pair.passed
        ? `<span class="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ${base}">সমন্বিত ${pair.total}/${pair.full}: ${pair.lg} (${pair.gp.toFixed(2)}) • পাস</span>`
        : `<span class="bg-rose-500/15 text-rose-600 dark:text-rose-300 ${base}">সমন্বিত ${pair.total}/${pair.full}: F (0.00) • ফেল (${pair.failReason})</span>`;
    }
    if (res.isPaper) {
      return `<span class="bg-sky-500/15 text-sky-700 dark:text-sky-300 ${base}">পত্র-নম্বর (সমন্বিত পাস প্রযোজ্য)</span>`;
    }
    return res.passed
      ? `<span class="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ${base}">${res.lg} (${res.gp.toFixed(2)}) • পাস</span>`
      : `<span class="bg-rose-500/15 text-rose-600 dark:text-rose-300 ${base}">F (0.00) • ফেল (${res.failReason})</span>`;
  },

  /**
   * বোর্ড গ্রেডিং ইঞ্জিন (সংশোধিত):
   *  • বাংলা ১ম+২য় ও ইংরেজি ১ম+২য় = ১টি করে সমন্বিত বিষয় (GP/Grade/Divisor সব ১টি)।
   *  • অন্যান্য বিষয়: CQ/MCQ/Practical প্রতিটি অংশে আলাদা ৩৩%।
   *  • ৪র্থ বিষয়: Bonus = max(0, GP − 2); ফেল করলে ফলাফলে কোনো প্রভাব নেই; Divisor-এ যুক্ত হয় না।
   *  • মেধাক্রম: পাস → চূড়ান্ত GPA → GPA(৪র্থ ছাড়া) → মোট নম্বর → রোল।
   */
  computeClassResults(cls, grp, mode) {
    const students = this.getFilteredStudents(cls, grp);
    const allGroupSubs = this.getSubjectsForClassGroup(cls, grp);

    const highestBySub = {};
    allGroupSubs.forEach(sub => { highestBySub[sub.code] = 0; });
    let highestClassTotal = 0;

    const rawStudentEval = students.map(stu => {
      const optCode = this.getStudentOptionalCode(stu);
      const stuSubs = this.getEffectiveSubjectsForStudent(stu);

      const subDetails = stuSubs.map(sub => {
        const isOptional = !!(sub.isOptionalAllowed && optCode && sub.code === optCode);
        if (mode === 'Combined') {
          const hy = this.marks.find(m => m.id === `${this.session}_Half-Yearly_${stu.uid}_${sub.code}`) || { cq: 0, mcq: 0, prac: 0 };
          const an = this.marks.find(m => m.id === `${this.session}_Annual_${stu.uid}_${sub.code}`) || { cq: 0, mcq: 0, prac: 0 };
          const avgCq = Math.round((this._n(hy.cq) + this._n(an.cq)) / 2);
          const avgMcq = Math.round((this._n(hy.mcq) + this._n(an.mcq)) / 2);
          const avgPrac = Math.round((this._n(hy.prac) + this._n(an.prac)) / 2);
          const ev = this.evaluateSubjectMark(sub, avgCq, avgMcq, avgPrac);
          const hyTotal = this._n(hy.cq) + this._n(hy.mcq) + this._n(hy.prac);
          const anTotal = this._n(an.cq) + this._n(an.mcq) + this._n(an.prac);
          if (ev.total > (highestBySub[sub.code] || 0)) highestBySub[sub.code] = ev.total;
          return { sub, isOptional, hyTotal, anTotal, ...ev };
        } else {
          const mk = this.marks.find(m => m.id === `${this.session}_${mode}_${stu.uid}_${sub.code}`) || { cq: 0, mcq: 0, prac: 0 };
          const ev = this.evaluateSubjectMark(sub, mk.cq, mk.mcq, mk.prac);
          if (ev.total > (highestBySub[sub.code] || 0)) highestBySub[sub.code] = ev.total;
          return { sub, isOptional, hyTotal: ev.total, anTotal: ev.total, ...ev };
        }
      });

      subDetails.sort((a, b) => {
        if (a.isOptional !== b.isOptional) return a.isOptional ? 1 : -1;
        return Number(a.sub.code) - Number(b.sub.code);
      });

      const compulsoryRaw = subDetails.filter(d => !d.isOptional);
      const optionalSub = subDetails.find(d => d.isOptional);

      const processedPairs = new Set();
      const compulsoryUnits = [];

      compulsoryRaw.forEach(d => {
        const pg = d.sub.pairGroup;
        if (pg) {
          if (processedPairs.has(pg)) return;
          const pairItems = compulsoryRaw.filter(x => x.sub.pairGroup === pg);
          if (pairItems.length >= 2) {
            processedPairs.add(pg);
            const pc = this.evaluatePairCombined(pairItems.map(x => ({ sub: x.sub, cq: x.cq, mcq: x.mcq, prac: x.prac })));
            pairItems.forEach((item, idx) => {
              item.isPaired = true;
              item.isPairFirst = idx === 0;
              item.pairSpan = pairItems.length;
              item.pairTotal = pc.total;
              item.pairFull = pc.full;
              item.pairPct = pc.pct;
              item.pairGP = pc.gp;
              item.pairLG = pc.lg;
              item.pairPassed = pc.passed;
              item.pairFailReason = pc.failReason;
              // প্রদর্শনের জন্য পত্র-স্তরের ফ্ল্যাগও সমন্বিত ফলাফলের সাথে মিলিয়ে দেওয়া হলো
              item.passed = pc.passed; item.gp = pc.gp; item.lg = pc.lg;
              item.cqPass = pc.cqPass; item.mcqPass = pc.mcqPass; item.pracPass = pc.pracPass;
            });
            compulsoryUnits.push({ code: pg, gp: pc.gp, lg: pc.lg, passed: pc.passed });
            return;
          }
          // একটি মাত্র পত্র থাকলে সাধারণ একক বিষয়ের মতো কঠোর মূল্যায়ন
          Object.assign(d, this.evaluateSubjectMark(d.sub, d.cq, d.mcq, d.prac, true));
        }
        compulsoryUnits.push({ code: d.sub.code, gp: d.gp, lg: d.lg, passed: d.passed });
      });

      const failedCompulsory = compulsoryUnits.filter(u => !u.passed).length;
      const totalMarks = subDetails.reduce((acc, d) => acc + d.total, 0);
      const totalFullMarks = subDetails.reduce((acc, d) => acc + d.fullMarks, 0);
      const percentage = totalFullMarks > 0 ? ((totalMarks * 100) / totalFullMarks).toFixed(1) : '0.0';

      if (totalMarks > highestClassTotal) highestClassTotal = totalMarks;

      const unitCount = compulsoryUnits.length;
      const passed = failedCompulsory === 0 && unitCount > 0;
      const compulsoryGP = compulsoryUnits.reduce((acc, u) => acc + u.gp, 0);

      // ৪র্থ বিষয়: পাস করে GP > 2 হলে (GP − 2) বোনাস; ফেল হলে ০ — কোনোভাবেই ফেল ঘটায় না
      const optionalBonus = (optionalSub && optionalSub.passed && optionalSub.gp > 2.00) ? (optionalSub.gp - 2.00) : 0;

      const gpaWithout4th = passed ? compulsoryGP / unitCount : 0;
      const finalGPA = passed ? Math.min(5.00, (compulsoryGP + optionalBonus) / unitCount) : 0;
      const finalLG = passed ? this.gpToLetterGrade(Number(finalGPA.toFixed(2))) : 'F';

      return {
        stu,
        subDetails,
        compulsoryUnits,
        compulsoryCount: unitCount,
        failedCount: failedCompulsory,
        totalMarks,
        totalFullMarks,
        percentage,
        gpaWithout4th: Number(gpaWithout4th.toFixed(2)),
        optionalBonus: Number(optionalBonus.toFixed(2)),
        optionalGP: optionalSub ? optionalSub.gp : 0,
        optionalPassed: optionalSub ? !!optionalSub.passed : false,
        gpa: Number(finalGPA.toFixed(2)),
        lg: finalLG,
        passed
      };
    });

    const rollNum = x => { const n = Number(x.stu.roll); return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER; };
    const sortedForMerit = [...rawStudentEval].sort((a, b) => {
      if (a.passed !== b.passed) return a.passed ? -1 : 1;
      if (a.passed) {
        if (b.gpa !== a.gpa) return b.gpa - a.gpa;                           // ২. চূড়ান্ত GPA (৪র্থ সহ)
        if (b.gpaWithout4th !== a.gpaWithout4th) return b.gpaWithout4th - a.gpaWithout4th; // ৩. GPA (৪র্থ ছাড়া)
        if (b.totalMarks !== a.totalMarks) return b.totalMarks - a.totalMarks;   // ৪. মোট নম্বর
        return rollNum(a) - rollNum(b);                                         // ৫. রোল
      }
      // ফেল করা শিক্ষার্থী: কম বিষয়ে ফেল আগে → বেশি মোট নম্বর → ছোট রোল
      if (a.failedCount !== b.failedCount) return a.failedCount - b.failedCount;
      if (b.totalMarks !== a.totalMarks) return b.totalMarks - a.totalMarks;
      return rollNum(a) - rollNum(b);
    });

    let meritCounter = 0;
    sortedForMerit.forEach((item, idx) => {
      item.meritPos = item.passed ? ++meritCounter : null;
      item.overallRank = idx + 1;
      item.highestClassTotal = highestClassTotal;
    });

    return { results: sortedForMerit, highestBySub, allSubs: allGroupSubs, highestClassTotal };
  },

  showResultSubView(viewName) {
    this.currentResultSubView = viewName;
    this.processAndRenderResults();
  },

  processAndRenderResults() {
    const mode = document.getElementById('res-mode')?.value || 'Half-Yearly';
    const cls = document.getElementById('res-class')?.value || '6';
    const grp = document.getElementById('res-group')?.value || 'General';
    const { results, highestBySub, allSubs } = this.computeClassResults(cls, grp, mode);

    const total = results.length;
    const passed = results.filter(r => r.passed).length;
    const failed = total - passed;
    const gpa5 = results.filter(r => r.gpa === 5.00).length;
    const passRate = total ? ((passed / total) * 100).toFixed(1) : '0.0';

    const kpiStrip = document.getElementById('result-kpi-strip');
    if (kpiStrip) {
      kpiStrip.innerHTML = `
        <div class="modern-card p-3.5 border-l-4 border-l-blue-600"><div class="text-xs text-slate-500">মোট পরীক্ষার্থী</div><div class="text-2xl font-extrabold text-blue-700">${total}</div></div>
        <div class="modern-card p-3.5 border-l-4 border-l-emerald-500"><div class="text-xs text-slate-500">উত্তীর্ণ (Passed)</div><div class="text-2xl font-extrabold text-emerald-600">${passed}</div></div>
        <div class="modern-card p-3.5 border-l-4 border-l-rose-500"><div class="text-xs text-slate-500">অকৃতকার্য (Failed)</div><div class="text-2xl font-extrabold text-rose-600">${failed}</div></div>
        <div class="modern-card p-3.5 border-l-4 border-l-amber-500"><div class="text-xs text-slate-500">জিপিএ ৫.০০ (A+)</div><div class="text-2xl font-extrabold text-amber-500">${gpa5}</div></div>
        <div class="modern-card p-3.5 border-l-4 border-l-indigo-500"><div class="text-xs text-slate-500">পাশের হার</div><div class="text-2xl font-extrabold text-indigo-600">${passRate}%</div></div>
        <div class="modern-card p-3.5 flex items-center justify-center">
          <button onclick="App.printCurrentResultView()" class="bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold px-3 py-2.5 rounded-xl w-full shadow">🖨 বর্তমান ভিউ প্রিন্ট (A4)</button>
        </div>
      `;
    }

    const container = document.getElementById('result-display-container');
    if (!container) return;

    if (!results.length) {
      container.innerHTML = `<p class="text-center py-8 text-slate-400 text-sm">এই শ্রেণী ও বিভাগে কোনো শিক্ষার্থী বা ফলাফল পাওয়া যায়নি।</p>`;
      return;
    }

    if (this.currentResultSubView === 'tabulation') {
      container.innerHTML = this.buildTabulationHTML(cls, grp, mode, results, highestBySub, allSubs);
    } else {
      container.innerHTML = this.buildMeritListHTML(cls, grp, mode, results);
    }
  },

  buildMeritListHTML(cls, grp, mode, results) {
    const isNineTen = ['9','10'].includes(cls);
    const header = this.buildPrintSchoolHeader(
      `মেধাক্রম তালিকা (Merit List) — ${EXAM_LABELS_BN[mode]} ${this.session}<br/>${CLASS_LABELS_BN[cls]} | বিভাগ: ${GROUP_LABELS_BN[grp]}`
    );

    const rows = results.map(r => {
      const att = this.getStudentYearlyAttendance(r.stu.uid, r.stu.cls, r.stu.group);
      return `
        <tr class="${r.passed ? 'hover:bg-blue-500/5' : 'bg-rose-500/10'}">
          <td class="text-center font-extrabold text-sm ${r.passed ? 'text-emerald-600' : 'text-rose-600'}">
            ${r.passed ? `🏆 মেধাক্রম #${r.meritPos}` : `অকৃতকার্য (${r.failedCount} বিষয়ে)`}
          </td>
          <td class="text-center font-bold">${r.stu.roll}</td>
          <td class="font-mono font-bold text-blue-700 dark:text-blue-400">${r.stu.uid}</td>
          <td class="font-bold">${this.esc(r.stu.nameBn)}</td>
          <td class="text-center font-extrabold">${r.totalMarks} / ${r.totalFullMarks} (${r.percentage}%)</td>
          ${isNineTen ? `<td class="text-center">${r.gpaWithout4th.toFixed(2)}</td>` : ''}
          <td class="text-center font-extrabold text-sm">${r.gpa.toFixed(2)}</td>
          <td class="text-center font-bold ${r.lg === 'F' ? 'text-rose-500' : 'text-emerald-600'}">${r.lg}</td>
          <td class="text-center font-semibold">${att.present}/${att.working} (${att.rate}%)</td>
          <td class="text-center space-x-1 no-print whitespace-nowrap">
            <button onclick="App.openQuickMarkModal('${r.stu.uid}')" class="bg-amber-500 hover:bg-amber-400 text-white px-2.5 py-1 rounded-md font-bold text-xs shadow">✏️ নম্বর এডিট</button>
            <button onclick="App.previewMarksheet('${r.stu.uid}')" class="bg-teal-700 hover:bg-teal-600 text-white px-2.5 py-1 rounded-md font-bold text-xs shadow">👁 প্রিভিউ</button>
            <button onclick="App.printSingleMarksheet('${r.stu.uid}')" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3 py-1 rounded-md font-bold text-xs shadow">📄 মার্কশিট প্রিন্ট</button>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div id="printable-result-view">
        ${header}
        <table class="w-full text-xs border-collapse formal-table mt-3">
          <thead>
            <tr>
              <th>মেধাক্রম (Merit)</th>
              <th>রোল</th>
              <th>ইউনিক আইডি</th>
              <th>শিক্ষার্থীর নাম</th>
              <th>মোট নম্বর ও হার</th>
              ${isNineTen ? `<th>GPA (৪র্থ ছাড়া)</th>` : ''}
              <th>চূড়ান্ত GPA</th>
              <th>লেটার গ্রেড</th>
              <th>হাজিরা</th>
              <th class="no-print text-center">কুইক এডিট ও প্রিন্ট</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  },

  buildTabulationHTML(cls, grp, mode, results, highestBySub, allSubs) {
    const header = this.buildPrintSchoolHeader(
      `এক নজরে ফলাফল / ট্যাবুলেশন শিট (Tabulation Sheet) — ${EXAM_LABELS_BN[mode]} ${this.session}<br/>${CLASS_LABELS_BN[cls]} | বিভাগ: ${GROUP_LABELS_BN[grp]}`
    );

    const subHeaders = allSubs.map(s => `
      <th class="text-center text-[10px]">
        <div>${s.code}</div>
        <div>${s.name}</div>
        <div class="text-amber-300">সর্বোচ্চ: ${highestBySub[s.code] || 0}</div>
      </th>
    `).join('');

    const rows = [...results].sort((a, b) => a.stu.roll - b.stu.roll).map(r => {
      const att = this.getStudentYearlyAttendance(r.stu.uid, r.stu.cls, r.stu.group);
      const cells = allSubs.map(s => {
        const d = r.subDetails.find(x => x.sub.code === s.code);
        if (!d) return `<td class="text-center text-slate-400 select-none">-</td>`;
        return `
          <td class="text-center text-[10px] ${d.lg === 'F' ? 'bg-rose-500/10 text-rose-600 font-bold' : ''}">
            <div class="font-bold">${d.total}</div>
            <div>${d.lg} (${d.gp.toFixed(1)})</div>
            ${d.isPaired ? '<div class="text-[8px] text-indigo-600">সমন্বিত</div>' : ''}
          </td>
        `;
      }).join('');

      return `
        <tr>
          <td class="text-center font-bold">${r.stu.roll}</td>
          <td class="font-semibold whitespace-nowrap">
            ${this.esc(r.stu.nameBn)}<div class="font-mono text-[9px] text-slate-500">${r.stu.uid}</div>
            <button onclick="App.openQuickMarkModal('${r.stu.uid}')" class="no-print text-blue-600 dark:text-blue-400 font-extrabold text-[10px] underline ml-1">✏️ এডিট</button>
          </td>
          ${cells}
          <td class="text-center font-extrabold">${r.totalMarks} (${r.percentage}%)</td>
          <td class="text-center font-extrabold">${r.gpa.toFixed(2)}</td>
          <td class="text-center font-bold ${r.lg === 'F' ? 'text-rose-500' : 'text-emerald-600'}">${r.lg}</td>
          <td class="text-center font-semibold">${att.present}/${att.working}</td>
          <td class="text-center font-bold">${r.passed ? `#${r.meritPos}` : 'F'}</td>
        </tr>
      `;
    }).join('');

    return `
      <div id="printable-result-view">
        ${header}
        <table class="w-full text-[11px] border-collapse formal-table mt-2">
          <thead>
            <tr>
              <th>রোল</th>
              <th>শিক্ষার্থীর নাম ও আইডি</th>
              ${subHeaders}
              <th>মোট নম্বর ও হার</th>
              <th>GPA</th>
              <th>গ্রেড</th>
              <th>হাজিরা</th>
              <th>মেধাক্রম</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  },

  /* ==================== QUICK MARK EDIT MODAL ENGINE ==================== */
  openQuickMarkModal(uid, overrideExam = null) {
    const stu = this.students.find(s => s.session === this.session && s.uid === uid);
    if (!stu) return;
    this.quickEditUID = uid;

    const currentResMode = document.getElementById('res-mode')?.value || 'Half-Yearly';
    const exam = overrideExam || (currentResMode === 'Combined' ? 'Annual' : currentResMode);

    document.getElementById('qmm-title').textContent = `নম্বরের দ্রুত পরিবর্তন (Quick Edit) — ${stu.nameBn} (রোল: ${stu.roll})`;
    document.getElementById('qmm-subtitle').textContent = `ইউনিক আইডি: ${stu.uid} | শ্রেণী: ${CLASS_LABELS_BN[stu.cls]} (${GROUP_LABELS_BN[stu.group]})`;

    const subs = this.getEffectiveSubjectsForStudent(stu);

    const body = document.getElementById('qmm-body');
    body.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3 bg-blue-50 dark:bg-slate-800 p-2.5 rounded-xl border border-blue-200 dark:border-slate-700 text-xs">
        <div class="font-bold text-blue-900 dark:text-blue-300">যে পরীক্ষার নম্বর এডিট করতে চান তা নির্বাচন করুন:</div>
        <select id="qmm-exam-select" onchange="App.openQuickMarkModal('${uid}', this.value)" class="modern-input font-extrabold text-xs">
          <option value="Half-Yearly" ${exam === 'Half-Yearly' ? 'selected' : ''}>অর্ধবার্ষিক পরীক্ষা (Half-Yearly)</option>
          <option value="Annual" ${exam === 'Annual' ? 'selected' : ''}>বার্ষিক পরীক্ষা (Annual)</option>
          <option value="Test" ${exam === 'Test' ? 'selected' : ''}>নির্বাচনী / টেস্ট পরীক্ষা (Test)</option>
        </select>
      </div>
      <table class="w-full text-xs border-collapse formal-table" id="quick-modal-table" data-uid="${uid}" data-exam="${exam}">
        <thead>
          <tr>
            <th>কোড</th>
            <th>বিষয়ের নাম</th>
            <th>পূর্ণমান</th>
            <th>লিখিত (CQ)</th>
            <th>MCQ</th>
            <th>ব্যবহারিক</th>
            <th>প্রাপ্ত মোট</th>
            <th>গ্রেড ও স্ট্যাটাস</th>
          </tr>
        </thead>
        <tbody>
          ${subs.map(sub => {
            const mkId = `${this.session}_${exam}_${uid}_${sub.code}`;
            const saved = this.marks.find(m => m.id === mkId) || { cq: '', mcq: '', prac: '' };
            const ev = this.evaluateSubjectMark(sub, saved.cq, saved.mcq, saved.prac);
            const cqPass = this.getPassMarkLimit(sub.cq);
            const mcqPass = this.getPassMarkLimit(sub.mcq);
            const pracPass = this.getPassMarkLimit(sub.prac);
            const isOpt = sub.isOptionalAllowed && this.getStudentOptionalCode(stu) === sub.code;

            return `
              <tr data-subcode="${sub.code}" data-subid="${sub.id}">
                <td class="font-mono font-bold text-center">${sub.code}</td>
                <td class="font-semibold">
                  ${sub.name}
                  ${isOpt ? '<span class="bg-amber-500/20 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-bold ml-1">৪র্থ বিষয়</span>' : ''}
                </td>
                <td class="text-center text-slate-500">${sub.cq + sub.mcq + sub.prac}</td>
                <td class="text-center">
                  <input type="number" min="0" max="${sub.cq}" data-max="${sub.cq}" data-pass="${cqPass}" data-label="লিখিত" value="${saved.cq}"
                    ${sub.cq === 0 ? 'disabled' : ''} oninput="App.onQuickModalInput(this)" onkeydown="App.handleEnterKeyNav(event, '#quick-modal-table')" class="qmm-cq w-20 modern-input text-center font-extrabold" />
                </td>
                <td class="text-center">
                  <input type="number" min="0" max="${sub.mcq}" data-max="${sub.mcq}" data-pass="${mcqPass}" data-label="MCQ" value="${saved.mcq}"
                    ${sub.mcq === 0 ? 'disabled' : ''} oninput="App.onQuickModalInput(this)" onkeydown="App.handleEnterKeyNav(event, '#quick-modal-table')" class="qmm-mcq w-20 modern-input text-center font-extrabold" />
                </td>
                <td class="text-center">
                  <input type="number" min="0" max="${sub.prac}" data-max="${sub.prac}" data-pass="${pracPass}" data-label="ব্যবহারিক" value="${saved.prac}"
                    ${sub.prac === 0 ? 'disabled' : ''} oninput="App.onQuickModalInput(this)" onkeydown="App.handleEnterKeyNav(event, '#quick-modal-table')" class="qmm-prac w-20 modern-input text-center font-extrabold" />
                </td>
                <td class="qmm-total text-center font-extrabold text-blue-900 dark:text-blue-300">${saved.cq !== '' || saved.mcq !== '' || saved.prac !== '' ? ev.total : '-'}</td>
                <td class="qmm-lg text-center font-extrabold">
                  ${saved.cq !== '' || saved.mcq !== '' || saved.prac !== ''
                    ? this.evalBadgeHTML(ev, sub, this.getPairStatusForEntry(stu, exam, sub, saved))
                    : '-'}
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;

    document.getElementById('quick-mark-modal').classList.remove('hidden');
  },

  closeQuickMarkModal() {
    document.getElementById('quick-mark-modal').classList.add('hidden');
    this.quickEditUID = null;
  },

  onQuickModalInput(inputEl) {
    const maxAllowed = Number(inputEl.dataset.max || 0);
    const passLimit = Number(inputEl.dataset.pass || 0);
    if (inputEl.value !== '') {
      let num = Number(inputEl.value);
      if (!Number.isFinite(num) || num < 0) { inputEl.value = 0; num = 0; }
      if (num > maxAllowed) {
        inputEl.value = maxAllowed;
        num = maxAllowed;
        inputEl.classList.add('input-error-shake');
        setTimeout(() => inputEl.classList.remove('input-error-shake'), 600);
      }
      if (num < passLimit) inputEl.classList.add('border-rose-500', 'text-rose-600');
      else inputEl.classList.remove('border-rose-500', 'text-rose-600');
    }

    const tr = inputEl.closest('tr');
    const sub = this.subjects.find(s => s.id === tr.dataset.subid);
    if (!sub) return;
    const cq = tr.querySelector('.qmm-cq').value;
    const mcq = tr.querySelector('.qmm-mcq').value;
    const prac = tr.querySelector('.qmm-prac').value;
    const res = this.evaluateSubjectMark(sub, cq, mcq, prac);

    const anyVal = cq !== '' || mcq !== '' || prac !== '';
    tr.querySelector('.qmm-total').textContent = anyVal ? res.total : '-';
    if (!anyVal) {
      tr.querySelector('.qmm-lg').innerHTML = '-';
    } else {
      const qTable = document.getElementById('quick-modal-table');
      const stuQ = this.students.find(x => x.session === this.session && x.uid === qTable?.dataset.uid);
      const pair = this.getPairStatusForEntry(stuQ, qTable?.dataset.exam, sub, { cq, mcq, prac });
      tr.querySelector('.qmm-lg').innerHTML = this.evalBadgeHTML(res, sub, pair);
    }
  },

  async saveQuickModalMarks() {
    if (!this.quickEditUID) return;
    if (!(await this.checkAdminPin())) return;
    const table = document.getElementById('quick-modal-table');
    const uid = table.dataset.uid;
    const exam = table.dataset.exam;

    const items = [];
    table.querySelectorAll('tbody tr').forEach(tr => {
      const subCode = tr.dataset.subcode;
      const sub = this.subjects.find(s => s.id === tr.dataset.subid);
      const cq = tr.querySelector('.qmm-cq').value;
      const mcq = tr.querySelector('.qmm-mcq').value;
      const prac = tr.querySelector('.qmm-prac').value;

      if (sub && (cq !== '' || mcq !== '' || prac !== '')) {
        items.push({
          id: `${this.session}_${exam}_${uid}_${subCode}`,
          session: this.session,
          exam,
          uid,
          subCode,
          cq: Math.min(sub.cq, Math.max(0, Number(cq || 0))),
          mcq: Math.min(sub.mcq, Math.max(0, Number(mcq || 0))),
          prac: Math.min(sub.prac, Math.max(0, Number(prac || 0)))
        });
      }
    });

    await this.db.bulkPut('marks', items);
    this.marks = await this.db.getAll('marks');
    this.closeQuickMarkModal();
    this.syncAllUI();
    this.toast('নম্বর সফলভাবে পরিবর্তিত হয়েছে এবং ফলাফল ও মেধাক্রম স্বয়ংক্রিয়ভাবে আপডেট হয়েছে!');
  },

  buildMarksheetCardHTML(r, cls, grp, mode, highestBySub, totalStudentsInClass = 1) {
    const s = r.stu;
    const isNineTen = ['9','10'].includes(s.cls);
    const att = this.getStudentYearlyAttendance(s.uid, s.cls, s.group);
    const isCombined = mode === 'Combined';
    const remarkBn = this.getPerformanceRemarkBn(r.gpa, r.passed);

    const qrVerifyUrl = this.generateQRDataURL(
      `RESULT|EIIN:${this.settings.eiin}|ID:${s.uid}|Name:${s.nameEn}|Class:${s.cls}|Roll:${s.roll}|Exam:${mode}-${this.session}|GPA:${r.gpa.toFixed(2)}|Grade:${r.lg}|Total:${r.totalMarks}`,
      360
    );
    const barcodeSvg = this.generateBarcodeSVGString(s.uid, 18, 1.15);

    const subRows = r.subDetails.map((d, idx) => {
      const showPairCells = !d.isPaired || d.isPairFirst;
      const rowspanAttr = d.isPaired && d.isPairFirst ? `rowspan="${d.pairSpan}"` : '';
      const dispLG = d.isPaired ? d.pairLG : d.lg;
      const dispGP = d.isPaired ? d.pairGP : d.gp;

      return `
        <tr style="background: ${idx % 2 === 0 ? 'rgba(255,255,255,0.35)' : 'rgba(224,242,245,0.5)'};">
          <td class="text-center font-mono font-bold text-blue-900">${d.sub.code}</td>
          <td class="font-bold text-slate-900">
            ${d.sub.name}
            ${d.isOptional ? '<span style="background:#fef3c7;color:#92400e;border:1px solid #f59e0b;padding:1px 5px;border-radius:4px;font-size:9px;margin-left:4px;">৪র্থ বিষয় (ঐচ্ছিক)</span>' : ''}
          </td>
          <td class="text-center font-semibold">${d.fullMarks}</td>
          <td class="text-center font-bold text-indigo-700">${highestBySub[d.sub.code] || 0}</td>
          ${isCombined ? `<td class="text-center">${d.hyTotal}</td><td class="text-center">${d.anTotal}</td>` : ''}
          <td class="text-center ${!d.cqPass ? 'text-rose-600 font-extrabold' : ''}">${d.sub.cq > 0 ? d.cq : '-'}</td>
          <td class="text-center ${!d.mcqPass ? 'text-rose-600 font-extrabold' : ''}">${d.sub.mcq > 0 ? d.mcq : '-'}</td>
          <td class="text-center ${!d.pracPass ? 'text-rose-600 font-extrabold' : ''}">${d.sub.prac > 0 ? d.prac : '-'}</td>
          <td class="text-center font-extrabold text-blue-950">
            ${d.total}
            ${d.isPaired && d.isPairFirst ? `<div class="text-[8.5px] text-indigo-700 font-bold">(সমন্বিত: ${d.pairTotal}/${d.pairFull}${d.pairPassed ? '' : ' • ফেল: ' + d.pairFailReason})</div>` : ''}
          </td>
          ${showPairCells ? `
            <td ${rowspanAttr} class="text-center font-extrabold align-middle ${dispLG === 'F' ? 'text-rose-600' : 'text-emerald-700'}">${dispLG}</td>
            <td ${rowspanAttr} class="text-center font-extrabold align-middle">${dispGP.toFixed(2)}</td>
          ` : ''}
        </tr>
      `;
    }).join('');

    return `
      <div class="page-break avoid-break marksheet-a4 ms-a4-full text-[11px] leading-snug" style="--row-pad:${r.subDetails.length <= 8 ? 9 : r.subDetails.length <= 10 ? 7 : r.subDetails.length <= 12 ? 5 : 4}px">
        ${this.settings.logo ? `<img src="${this.settings.logo}" class="marksheet-watermark" alt="Watermark" />` : ''}

        <div class="marksheet-content space-y-2">
          <div class="flex items-center justify-between border-b-2 border-blue-800 pb-2 gap-3">
            <div class="flex flex-col items-center">
              ${this.settings.logo ? `<img src="${this.settings.logo}" class="ms-logo" />` : `<div class="w-16"></div>`}
              <span class="ms-eiin">EIIN: ${this.esc(this.settings.eiin)}</span>
            </div>

            <div class="text-center flex-1 px-2">
              <h1 class="ms-school-name">${this.esc(this.settings.nameBn)}</h1>
              <p class="ms-school-en">${this.esc(this.settings.nameEn)}</p>
              <p class="ms-school-addr">${this.esc(this.settings.address)} • স্থাপিত: ${this.esc(this.settings.estd)}</p>

              <div class="ms-title">
                <div class="font-extrabold text-[15px] text-amber-200 tracking-wide">একাডেমিক ট্রান্সক্রিপ্ট ও প্রগতিপত্র</div>
                <div class="text-[11px] font-bold uppercase tracking-widest text-blue-100">ACADEMIC TRANSCRIPT — ${EXAM_LABELS_BN[mode]} (${this.session})</div>
              </div>
            </div>

            <table class="text-[9.5px] border-collapse ms-table leading-tight">
              <thead>
                <tr><th>নম্বর পরিসর (%)</th><th>গ্রেড</th><th>পয়েন্ট</th></tr>
              </thead>
              <tbody>
                <tr><td>80 - 100</td><td class="text-center font-bold text-emerald-700">A+</td><td class="text-center font-bold">5.00</td></tr>
                <tr><td>70 - 79</td><td class="text-center font-bold">A</td><td class="text-center">4.00</td></tr>
                <tr><td>60 - 69</td><td class="text-center font-bold">A-</td><td class="text-center">3.50</td></tr>
                <tr><td>50 - 59</td><td class="text-center font-bold">B</td><td class="text-center">3.00</td></tr>
                <tr><td>40 - 49</td><td class="text-center font-bold">C</td><td class="text-center">2.00</td></tr>
                <tr><td>33 - 39</td><td class="text-center font-bold">D</td><td class="text-center">1.00</td></tr>
                <tr><td>00 - 32</td><td class="text-center font-bold text-rose-600">F</td><td class="text-center text-rose-600">0.00</td></tr>
              </tbody>
            </table>
          </div>

          <div style="background: rgba(255,255,255,0.55);"
               class="flex justify-between items-center gap-3 p-2 border border-blue-300 rounded-xl">
            <div class="grid grid-cols-3 gap-x-4 gap-y-1.5 flex-1 text-[12.5px]">
              <div><strong>শিক্ষার্থীর নাম:</strong> <span class="font-extrabold text-blue-950">${this.esc(s.nameBn)}</span></div>
              <div><strong>Name (English):</strong> <span class="font-bold text-slate-800">${this.esc(s.nameEn)}</span></div>
              <div><strong>ইউনিক আইডি:</strong> <span class="font-mono font-extrabold text-blue-700">${s.uid}</span></div>
              <div><strong>পিতার নাম:</strong> ${this.esc(s.father)}</div>
              <div><strong>মাতার নাম:</strong> ${this.esc(s.mother)}</div>
              <div><strong>শ্রেণী ও বিভাগ:</strong> <span class="font-bold text-indigo-900">${CLASS_LABELS_BN[s.cls]} (${GROUP_LABELS_BN[s.group]})</span></div>
              <div><strong>শ্রেণী রোল:</strong> <span class="font-extrabold bg-amber-200 text-slate-950 px-2 py-0.2 rounded">${s.roll}</span></div>
              <div><strong>জন্ম তারিখ ও রক্ত:</strong> ${s.dob || '-'} ${s.blood ? `(${this.esc(s.blood)})` : ''}</div>
              <div><strong>মেধাক্রম (Merit):</strong> <span class="font-extrabold ${r.passed ? 'text-emerald-700' : 'text-rose-600'}">${r.passed ? `মেধাক্রম #${r.meritPos} (মোট ${totalStudentsInClass} জনে)` : 'অকৃতকার্য (Failed)'}</span></div>
            </div>
            <img src="${s.photo || ''}" class="w-[76px] h-[92px] object-cover border-2 border-blue-800 rounded-lg shadow-sm bg-white" />
          </div>

          <table class="w-full text-[11.5px] border-collapse ms-table ms-main">
            <thead>
              <tr>
                <th class="w-12">কোড</th>
                <th class="text-left">বিষয়ের নাম</th>
                <th>পূর্ণমান</th>
                <th>সর্বোচ্চ</th>
                ${isCombined ? `<th>অর্ধবার্ষিক</th><th>বার্ষিক</th>` : ''}
                <th>লিখিত</th>
                <th>MCQ</th>
                <th>ব্যবহারিক</th>
                <th>প্রাপ্ত মোট</th>
                <th>লেটার গ্রেড</th>
                <th>গ্রেড পয়েন্ট (GP)</th>
              </tr>
            </thead>
            <tbody>${subRows}</tbody>
            <tfoot>
              <tr style="background: rgba(214,241,244,0.7); font-weight: 800;">
                <td colspan="${isCombined ? 9 : 7}" class="text-right text-blue-950">সর্বমোট প্রাপ্ত নম্বর (${r.totalFullMarks}-এর মধ্যে), শতকরা হার ও চূড়ান্ত ফলাফল:</td>
                <td class="text-center text-xs text-blue-950">${r.totalMarks} (${r.percentage}%)</td>
                <td class="text-center text-xs ${r.lg === 'F' ? 'text-rose-600' : 'text-emerald-700'}">${r.lg}</td>
                <td class="text-center text-xs text-blue-950">GPA: ${r.gpa.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <div class="grid grid-cols-2 gap-2 text-[10px]">
            <div class="border border-emerald-300 rounded-xl p-2 bg-emerald-50/50">
              <div class="font-extrabold text-emerald-950 border-b border-emerald-200 pb-1 mb-1 flex items-center justify-between">
                <span>📅 হাজিরা ও উপস্থিতি প্রতিবেদন</span>
                <span class="bg-emerald-600 text-white px-2 py-0.2 rounded-full text-[9.5px]">উপস্থিতি: ${att.rate}%</span>
              </div>
              <div class="grid grid-cols-4 gap-1 text-center">
                <div class="bg-white border rounded p-1"><div class="text-slate-500 text-[9px]">কার্যদিবস</div><div class="font-extrabold text-xs">${att.working} দিন</div></div>
                <div class="bg-white border rounded p-1"><div class="text-emerald-700 text-[9px]">উপস্থিত (P)</div><div class="font-extrabold text-xs text-emerald-700">${att.present} দিন</div></div>
                <div class="bg-white border rounded p-1"><div class="text-rose-600 text-[9px]">অনুপস্থিত (A)</div><div class="font-extrabold text-xs text-rose-600">${att.absent} দিন</div></div>
                <div class="bg-white border rounded p-1"><div class="text-amber-700 text-[9px]">ছুটি (L)</div><div class="font-extrabold text-xs text-amber-700">${att.leave} দিন</div></div>
              </div>
            </div>

            <div class="border border-blue-300 rounded-xl p-2 bg-blue-50/50">
              <div class="font-extrabold text-blue-950 border-b border-blue-200 pb-1 mb-1 flex items-center justify-between">
                <span>🏆 ফলাফল বিশ্লেষণ</span>
                <span class="${r.passed ? 'bg-emerald-600' : 'bg-rose-600'} text-white px-2 py-0.2 rounded-full text-[9.5px]">${r.passed ? 'PASSED' : 'FAILED'}</span>
              </div>
              <div class="grid grid-cols-4 gap-1 text-center">
                <div class="bg-white border rounded p-1"><div class="text-slate-500 text-[9px]">সর্বোচ্চ</div><div class="font-extrabold text-xs text-indigo-700">${r.highestClassTotal}</div></div>
                <div class="bg-white border rounded p-1"><div class="text-slate-500 text-[9px]">${isNineTen ? '৪র্থ বোনাস' : 'শতকরা হার'}</div><div class="font-extrabold text-xs text-amber-700">${isNineTen ? `+${r.optionalBonus.toFixed(2)}` : `${r.percentage}%`}</div></div>
                <div class="bg-white border rounded p-1"><div class="text-blue-800 text-[9px]">GPA</div><div class="font-extrabold text-xs text-blue-800">${r.gpa.toFixed(2)}</div></div>
                <div class="bg-white border rounded p-1"><div class="text-emerald-800 text-[9px]">মেধাক্রম</div><div class="font-extrabold text-xs text-emerald-800">${r.passed ? `#${r.meritPos}` : 'N/A'}</div></div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between bg-amber-50/70 border border-amber-300 rounded-lg px-3 py-1 text-[10px]">
            <div><strong>শিক্ষকের মন্তব্য:</strong> <span class="font-extrabold text-blue-950 ml-1">${remarkBn}</span></div>
            <div>${barcodeSvg}</div>
          </div>

          <div class="flex justify-between items-end pt-2 px-1 text-[10px]">
            <div class="flex items-center gap-2">
              <img src="${qrVerifyUrl}" alt="QR" class="ms-qr" />
              <div class="text-[11px] text-slate-700 leading-snug">
                <div class="font-extrabold text-blue-950 text-[12px]">ডিজিটাল ভেরিফিকেশন QR</div><div>স্ক্যান করে ফলাফল যাচাই করুন</div>
                <div>প্রিন্ট: ${new Date().toLocaleDateString('bn-BD')}</div>
              </div>
            </div>

            <div class="text-center"><div class="h-10"></div><div class="border-t border-blue-900 px-3 pt-0.5 font-bold">অভিভাবক</div></div>
            <div class="text-center"><div class="h-10"></div><div class="border-t border-blue-900 px-3 pt-0.5 font-bold">শ্রেণী শিক্ষক</div></div>
            <div class="text-center">
              ${this.settings.ecSig ? `<img src="${this.settings.ecSig}" class="h-10 mx-auto object-contain" />` : `<div class="h-10"></div>`}
              <div class="border-t border-blue-900 px-3 pt-0.5 font-bold">পরীক্ষা নিয়ন্ত্রক</div>
            </div>
            <div class="text-center">
              ${this.settings.hmSig ? `<img src="${this.settings.hmSig}" class="h-10 mx-auto object-contain" />` : `<div class="h-10"></div>`}
              <div class="border-t border-blue-900 px-3 pt-0.5 font-bold">প্রধান শিক্ষক</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  _resultCtxFor(uid) {
    const stu = this.students.find(s => s.session === this.session && s.uid === uid);
    return {
      mode: document.getElementById('res-mode').value,
      cls: stu ? stu.cls : document.getElementById('res-class').value,
      grp: stu ? stu.group : document.getElementById('res-group').value
    };
  },

  previewMarksheet(uid) {
    const { mode, cls, grp } = this._resultCtxFor(uid);
    const { results, highestBySub } = this.computeClassResults(cls, grp, mode);
    const r = results.find(x => x.stu.uid === uid);
    if (!r) return;
    this._previewUid = uid;
    document.getElementById('ms-preview-body').innerHTML = this.buildMarksheetCardHTML(r, cls, grp, mode, highestBySub, results.length);
    const md = document.getElementById('marksheet-preview-modal');
    md.classList.remove('hidden'); md.classList.add('flex');
  },

  /* ---------- যেকোনো শ্রেণীর শিক্ষার্থী নাম/আইডি/রোল দিয়ে খুঁজে নম্বর এডিট ---------- */
  searchStudentForMarks() {
    const box = document.getElementById('res-search-results');
    if (!box) return;
    const q = (document.getElementById('res-search')?.value || '').trim().toLowerCase();
    if (!q) {
      box.innerHTML = `<div class="text-xs text-slate-400 py-2">নাম, আইডি বা রোল লিখুন — যেকোনো শ্রেণীর (৬ষ্ঠ–১০ম) শিক্ষার্থী পাওয়া যাবে।</div>`;
      return;
    }
    const all = this.students
      .filter(s => s.session === this.session)
      .filter(s => [s.nameBn, s.nameEn, s.uid].some(x => String(x || '').toLowerCase().includes(q)) || String(s.roll) === q)
      .sort((a, b) => Number(a.cls) - Number(b.cls) || a.roll - b.roll);
    const list = all.slice(0, 12);
    if (!list.length) {
      box.innerHTML = `<div class="text-xs text-rose-500 font-bold py-2">কোনো শিক্ষার্থী পাওয়া যায়নি।</div>`;
      return;
    }
    box.innerHTML = `
      <div class="text-[11px] text-slate-500 mb-1.5">${this.bnNum(all.length)} জন পাওয়া গেছে${all.length > list.length ? ` (প্রথম ${this.bnNum(list.length)} জন দেখানো হচ্ছে — আরও নির্দিষ্ট করে লিখুন)` : ''}</div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
        ${list.map(s => `
          <div class="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40">
            <img src="${s.photo || ''}" class="w-10 h-12 rounded-lg object-cover border" alt="" />
            <div class="flex-1 min-w-0">
              <div class="font-extrabold text-sm truncate">${this.esc(s.nameBn)}</div>
              <div class="text-[11px] text-slate-500 truncate">ID: <span class="font-mono font-bold text-blue-700 dark:text-blue-300">${this.esc(s.uid)}</span> • ${CLASS_LABELS_BN[s.cls]} (${GROUP_LABELS_BN[s.group] || this.esc(s.group)}) • রোল ${this.esc(s.roll)}</div>
            </div>
            <div class="flex flex-col gap-1">
              <button onclick="App.openMarkEditorFromSearch('${s.uid}')" class="bg-amber-500 hover:bg-amber-400 text-white px-2.5 py-1 rounded-md font-bold text-[11px] whitespace-nowrap">✏️ নম্বর এডিট</button>
              <button onclick="App.previewMarksheet('${s.uid}')" class="bg-teal-700 hover:bg-teal-600 text-white px-2.5 py-1 rounded-md font-bold text-[11px] whitespace-nowrap">👁 মার্কশিট</button>
            </div>
          </div>`).join('')}
      </div>`;
  },

  openMarkEditorFromSearch(uid) {
    const exam = document.getElementById('res-search-exam')?.value || 'Half-Yearly';
    this.openQuickMarkModal(uid, exam);
  },

  onResultSearchKey(e) {
    if (e.key !== 'Enter') return;
    const q = (document.getElementById('res-search')?.value || '').trim().toLowerCase();
    if (!q) return;
    const hits = this.students.filter(s => s.session === this.session &&
      ([s.nameBn, s.nameEn, s.uid].some(x => String(x || '').toLowerCase().includes(q)) || String(s.roll) === q));
    const exact = hits.filter(s => s.uid.toLowerCase() === q);
    const pick = exact.length === 1 ? exact[0] : (hits.length === 1 ? hits[0] : null);
    if (pick) this.openMarkEditorFromSearch(pick.uid);
    else this.toast(hits.length ? 'একাধিক ফলাফল আছে — তালিকা থেকে বেছে নিন।' : 'কোনো শিক্ষার্থী পাওয়া যায়নি।', 'warn');
  },

  closeMarksheetPreview() {
    const md = document.getElementById('marksheet-preview-modal');
    md.classList.add('hidden'); md.classList.remove('flex');
  },

  printSingleMarksheet(uid) {
    const { mode, cls, grp } = this._resultCtxFor(uid);
    const { results, highestBySub } = this.computeClassResults(cls, grp, mode);
    const r = results.find(x => x.stu.uid === uid);
    if (!r) return;
    const html = this.buildMarksheetCardHTML(r, cls, grp, mode, highestBySub, results.length);
    this.printHTML(html, false);
  },

  printAllMarksheets() {
    const mode = document.getElementById('res-mode').value;
    const cls = document.getElementById('res-class').value;
    const grp = document.getElementById('res-group').value;
    const { results, highestBySub } = this.computeClassResults(cls, grp, mode);
    if (!results.length) {
      this.toast('কোনো শিক্ষার্থীর ফলাফল পাওয়া যায়নি!', 'error');
      return;
    }
    const allHtml = results.map(r => this.buildMarksheetCardHTML(r, cls, grp, mode, highestBySub, results.length)).join('');
    this.printHTML(allHtml, false);
  },

  printCurrentResultView() {
    const el = document.getElementById('printable-result-view');
    if (!el) return;
    const isLandscape = this.currentResultSubView === 'tabulation';
    this.printHTML(el.innerHTML, isLandscape);
  },

  /* ==================== MODULE 8: CHECKBOX-BASED SELECTIVE NEXT-CLASS PROMOTION (FIXED & ADDED) ==================== */
  previewPromotion(filterMode = 'PASSED') {
    this._promoEdited = false;
    const fromCls = document.getElementById('promo-from-class')?.value || '6';
    const fromGrp = document.getElementById('promo-from-group')?.value || 'General';
    const toCls = String(Number(fromCls) + 1);

    const targetGroupWrap = document.getElementById('promo-target-group-wrap');
    if (targetGroupWrap) {
      if (fromCls === '8') targetGroupWrap.classList.remove('hidden');
      else targetGroupWrap.classList.add('hidden');
    }

    const fromSessionEl = document.getElementById('promo-from-session');
    if (fromSessionEl) fromSessionEl.value = this.session;

    let { results } = this.computeClassResults(fromCls, fromGrp, 'Annual');
    const hasAnyAnnualMarks = results.some(r => r.totalMarks > 0);
    if (!hasAnyAnnualMarks) {
      results = this.computeClassResults(fromCls, fromGrp, 'Half-Yearly').results;
    }

    const box = document.getElementById('promotion-preview-box');
    if (!box) return;

    if (!results.length) {
      box.innerHTML = `<p class="text-center py-8 text-slate-400 text-sm">এই শ্রেণী ও বিভাগে উত্তোলনের জন্য কোনো শিক্ষার্থী পাওয়া যায়নি।</p>`;
      const cntEl = document.getElementById('promo-selected-count');
      if (cntEl) cntEl.textContent = '0';
      return;
    }

    this.selectedPromotionUIDs.clear();
    results.forEach(r => {
      if (filterMode === 'ALL') this.selectedPromotionUIDs.add(r.stu.uid);
      else if (filterMode === 'PASSED' && r.passed) this.selectedPromotionUIDs.add(r.stu.uid);
    });

    let autoRollCounter = 1;
    const rows = results.map(r => {
      const isChecked = this.selectedPromotionUIDs.has(r.stu.uid);
      const assignedRoll = isChecked ? autoRollCounter++ : r.stu.roll;

      return `
        <tr data-uid="${r.stu.uid}" data-passed="${r.passed ? '1' : '0'}" class="${isChecked ? 'bg-emerald-500/5' : 'opacity-65'} hover:bg-blue-500/5 transition">
          <td class="text-center">
            <input type="checkbox" class="promo-row-check w-4 h-4 accent-emerald-600 cursor-pointer"
                   value="${r.stu.uid}" ${isChecked ? 'checked' : ''}
                   onchange="App.onPromoCheckChange()" />
          </td>
          <td class="text-center font-bold">${r.stu.roll}</td>
          <td class="font-mono font-bold text-blue-700 dark:text-blue-400">${r.stu.uid}</td>
          <td class="font-bold">${this.esc(r.stu.nameBn)}</td>
          <td class="text-center font-extrabold">${r.totalMarks} (${r.percentage}%)</td>
          <td class="text-center font-extrabold ${r.passed ? 'text-emerald-600' : 'text-rose-600'}">
            ${r.passed ? `${r.gpa.toFixed(2)} (${r.lg}) • মেধাক্রম #${r.meritPos}` : `F (${r.failedCount} বিষয়ে ফেল)`}
          </td>
          <td class="text-center font-bold text-indigo-700 dark:text-indigo-300">${CLASS_LABELS_BN[toCls]}</td>
          <td class="text-center">
            <input type="number" min="1" value="${assignedRoll}" class="promo-new-roll w-20 modern-input text-center font-extrabold text-emerald-700 dark:text-emerald-300" />
          </td>
        </tr>
      `;
    }).join('');

    box.innerHTML = `
      <table class="w-full text-xs border-collapse formal-table" id="promo-table">
        <thead>
          <tr>
            <th class="w-12 text-center">টিক (✔)</th>
            <th>পূর্ববর্তী রোল</th>
            <th>ইউনিক আইডি</th>
            <th>শিক্ষার্থীর নাম</th>
            <th>বার্ষিক মোট নম্বর</th>
            <th>বার্ষিক GPA ও মেধাক্রম</th>
            <th>নতুন শ্রেণী</th>
            <th>নতুন রোল (এডিটেবল)</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;

    this.updatePromoSelectedCount();
  },

  togglePromotionCheckboxes(mode) {
    this.previewPromotion(mode);
  },

  onPromoCheckChange() {
    this._promoEdited = true;
    this.selectedPromotionUIDs.clear();
    let rollSeq = 1;
    document.querySelectorAll('#promo-table tbody tr').forEach(tr => {
      const cb = tr.querySelector('.promo-row-check');
      const rollInput = tr.querySelector('.promo-new-roll');
      if (cb && cb.checked) {
        this.selectedPromotionUIDs.add(cb.value);
        tr.classList.add('bg-emerald-500/5');
        tr.classList.remove('opacity-65');
        if (rollInput) rollInput.value = rollSeq++;
      } else {
        tr.classList.remove('bg-emerald-500/5');
        tr.classList.add('opacity-65');
      }
    });
    this.updatePromoSelectedCount();
  },

  updatePromoSelectedCount() {
    const cntEl = document.getElementById('promo-selected-count');
    if (cntEl) cntEl.textContent = String(this.selectedPromotionUIDs.size);
  },

  async executePromotion() {
    if (!(await this.checkAdminPin())) return;
    const fromCls = document.getElementById('promo-from-class').value;
    const fromGrp = document.getElementById('promo-from-group').value;
    const toCls = String(Number(fromCls) + 1);
    const toSession = document.getElementById('promo-to-session').value;
    const targetGrpForClass9 = document.getElementById('promo-to-group')?.value || 'Science';
    if (toSession === this.session) {
      this.toast('উত্তোলনের লক্ষ্য শিক্ষাবর্ষ বর্তমান শিক্ষাবর্ষ থেকে আলাদা হতে হবে!', 'error');
      return;
    }

    const rows = Array.from(document.querySelectorAll('#promo-table tbody tr'));
    const selectedRows = rows.filter(tr => tr.querySelector('.promo-row-check')?.checked);

    if (!selectedRows.length) {
      this.toast('উত্তোলনের জন্য অন্তত ১ জন শিক্ষার্থীকে টিক (✔) দিন!', 'error');
      return;
    }

    if (!(await this.confirmBox(`আপনি কি নিশ্চিতভাবে ${selectedRows.length} জন শিক্ষার্থীকে ${toSession} শিক্ষাবর্ষের ${CLASS_LABELS_BN[toCls]}-তে উত্তোলন করতে চান?`, { title: 'শ্রেণী উত্তোলন', icon: '🎓', confirmText: 'উত্তোলন করুন' }))) {
      return;
    }

    const toSave = [];
    selectedRows.forEach((tr, idx) => {
      const uid = tr.dataset.uid;
      const newRoll = parseInt(tr.querySelector('.promo-new-roll')?.value, 10) || (idx + 1);
      const origStu = this.students.find(s => s.session === this.session && s.uid === uid);
      if (!origStu) return;

      const nextGroup = fromCls === '8' ? targetGrpForClass9 : fromGrp;
      const isNineTen = ['9', '10'].includes(toCls);
      const nextMainElective = isNineTen && nextGroup === 'Science' ? (origStu.mainElective || '138') : '';
      const nextOptional = isNineTen
        ? (origStu.optionalSubject || (nextGroup === 'Science' ? '126' : '134'))
        : '';

      toSave.push({
        ...origStu,
        recordId: `${toSession}_${origStu.uid}`,
        session: toSession,
        cls: toCls,
        group: nextGroup,
        roll: newRoll,
        mainElective: nextMainElective,
        optionalSubject: nextOptional
      });
    });

    if (!this.settings.sessions.includes(toSession)) {
      this.settings.sessions.push(toSession);
      this.settings.sessions.sort();
      await this.db.put('settings', this.settings);
    }

    await this.db.bulkPut('students', toSave);
    this._promoEdited = false;
    this.students = await this.db.getAll('students');
    this.renderSessionSelectors();
    this.syncAllUI();
    this.toast(`অভিনন্দন! ${toSave.length} জন শিক্ষার্থী ${toSession} শিক্ষাবর্ষে ${CLASS_LABELS_BN[toCls]}-তে সফলভাবে উত্তোলিত হয়েছে!`);
  },

  /* ==================== MODULE 9: AGE CALCULATOR & FILTER ENGINE ==================== */
  calculateExactAge(dobString, refDateString) {
    if (!dobString) return { valid: false };
    const dob = new Date(dobString);
    const ref = refDateString ? new Date(refDateString) : new Date();
    if (isNaN(dob.getTime()) || isNaN(ref.getTime())) return { valid: false };

    let years = ref.getFullYear() - dob.getFullYear();
    let months = ref.getMonth() - dob.getMonth();
    let days = ref.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      const prevMonthLastDay = new Date(ref.getFullYear(), ref.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    const diffTime = Math.abs(ref - dob);
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return { valid: true, years, months, days, totalDays };
  },

  renderAgeCalculatorTable() {
    const cls = document.getElementById('age-class')?.value || 'ALL';
    const grp = document.getElementById('age-group')?.value || 'ALL';
    const refDate = document.getElementById('age-ref-date')?.value || new Date().toISOString().slice(0, 10);
    const minYr = parseInt(document.getElementById('age-min-yr')?.value, 10);
    const maxYr = parseInt(document.getElementById('age-max-yr')?.value, 10);
    const search = (document.getElementById('age-search')?.value || '').trim();

    const list = this.getFilteredStudents(cls, grp, search).filter(s => {
      if (!s.dob) return isNaN(minYr) && isNaN(maxYr);
      const age = this.calculateExactAge(s.dob, refDate);
      if (!age.valid) return false;
      if (!isNaN(minYr) && age.years < minYr) return false;
      if (!isNaN(maxYr) && age.years > maxYr) return false;
      return true;
    });

    const kpiStrip = document.getElementById('age-kpi-strip');
    if (kpiStrip) {
      kpiStrip.innerHTML = `
        <div class="modern-card p-3 border-l-4 border-l-blue-600"><div class="text-slate-500">ফিল্টারকৃত শিক্ষার্থী</div><div class="text-2xl font-extrabold text-blue-700">${list.length} জন</div></div>
        <div class="modern-card p-3 border-l-4 border-l-emerald-500"><div class="text-slate-500">হিসাবের ভিত্তি তারিখ</div><div class="text-base font-extrabold text-emerald-700">${refDate}</div></div>
        <div class="modern-card p-3 border-l-4 border-l-violet-500"><div class="text-slate-500">সর্বনিম্ন বয়স</div><div class="text-lg font-extrabold text-violet-700">${!isNaN(minYr) ? minYr + ' বছর' : 'নির্ধারিত নয়'}</div></div>
        <div class="modern-card p-3 border-l-4 border-l-amber-500"><div class="text-slate-500">সর্বোচ্চ বয়স</div><div class="text-lg font-extrabold text-amber-700">${!isNaN(maxYr) ? maxYr + ' বছর' : 'নির্ধারিত নয়'}</div></div>
      `;
    }

    const container = document.getElementById('age-table-container');
    if (!container) return;

    if (!list.length) {
      container.innerHTML = `<p class="text-center py-8 text-slate-400 text-sm">এই বয়স সীমার মধ্যে কোনো শিক্ষার্থী পাওয়া যায়নি।</p>`;
      return;
    }

    const rows = list.map(s => {
      const age = this.calculateExactAge(s.dob, refDate);
      return `
        <tr>
          <td class="text-center font-bold">${s.roll}</td>
          <td class="font-mono font-bold text-blue-700 dark:text-blue-400">${s.uid}</td>
          <td class="font-bold">${this.esc(s.nameBn)}</td>
          <td class="text-center">${CLASS_LABELS_BN[s.cls]} (${GROUP_LABELS_BN[s.group]})</td>
          <td class="text-center">
            <input type="date" value="${s.dob || ''}" onchange="App.updateStudentDOBInline('${s.recordId}', this.value)" class="modern-input text-xs font-mono py-1 px-2" />
          </td>
          <td class="text-center font-extrabold text-emerald-700 dark:text-emerald-300">
            ${age.valid
              ? `${age.years} বছর ${age.months} মাস ${age.days} দিন <span class="text-slate-400 text-[10px] font-normal">(${age.totalDays} দিন)</span>`
              : `<span class="text-rose-500">জন্মতারিখ দিন</span>`}
          </td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <table class="w-full text-xs border-collapse formal-table">
        <thead>
          <tr>
            <th class="w-14 text-center">রোল</th>
            <th>ইউনিক আইডি</th>
            <th>শিক্ষার্থীর নাম</th>
            <th class="text-center">শ্রেণী ও বিভাগ</th>
            <th class="text-center">জন্মতারিখ (ইনলাইন এডিট)</th>
            <th class="text-center">নিখুঁত বয়স (${refDate} অনুযায়ী)</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  },

  async updateStudentDOBInline(recordId, newDob) {
    const s = this.students.find(x => x.recordId === recordId);
    if (!s) return;
    s.dob = newDob;
    await this.db.put('students', s);
    this.students = await this.db.getAll('students');
    this.renderAgeCalculatorTable();
    this.renderStudentTable();
    this.toast(`শিক্ষার্থী ${s.nameBn}-এর জন্মতারিখ আপডেট হয়েছে!`);
  },

  resetAgeFilters() {
    const minEl = document.getElementById('age-min-yr');
    const maxEl = document.getElementById('age-max-yr');
    const srch = document.getElementById('age-search');
    if (minEl) minEl.value = '';
    if (maxEl) maxEl.value = '';
    if (srch) srch.value = '';
    this.renderAgeCalculatorTable();
  },

  exportAgeListExcel() {
    const refDate = document.getElementById('age-ref-date')?.value || new Date().toISOString().slice(0, 10);
    const list = this.getFilteredStudents('ALL', 'ALL').map(s => {
      const age = this.calculateExactAge(s.dob, refDate);
      return {
        UniqueID: s.uid,
        Roll: s.roll,
        NameBn: s.nameBn,
        Class: CLASS_LABELS_BN[s.cls],
        Group: GROUP_LABELS_BN[s.group],
        DOB: s.dob,
        AgeYears: age.valid ? age.years : '',
        AgeMonths: age.valid ? age.months : '',
        AgeDays: age.valid ? age.days : '',
        TotalDays: age.valid ? age.totalDays : ''
      };
    });
    const ws = XLSX.utils.json_to_sheet(list);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Student_Ages');
    XLSX.writeFile(wb, `Student_Age_Report_${this.session}.xlsx`);
  },

  printAgeList() {
    const container = document.getElementById('age-table-container');
    if (!container || !container.innerHTML) return;
    const refDate = document.getElementById('age-ref-date')?.value || '';
    const header = this.buildPrintSchoolHeader(`শিক্ষার্থীর বয়স ও জন্মতারিখ রিপোর্ট (ভিত্তি তারিখ: ${refDate}) — শিক্ষাবর্ষ: ${this.session}`);
    this.printHTML(header + container.innerHTML, false);
  },

  /* ==================== MODULE 10: TESTIMONIAL, TC & FEE RECEIPT GENERATOR ==================== */
  /* ==================== MODULE 10: প্রশংসাপত্র • টিসি • বেতন/ফি রশিদ ==================== */
  _certInit: false,
  _certDocBound: false,

  switchCertSubTab(type) {
    this.currentCertType = type;
    ['testimonial', 'tc', 'receipt'].forEach(t => {
      const btn = document.getElementById(`cert-btn-${t}`);
      if (btn) {
        btn.classList.toggle('active', t === type);
        btn.setAttribute('aria-pressed', t === type ? 'true' : 'false');
      }
    });
    const isReceipt = type === 'receipt';
    const show = (id, on) => { const el = document.getElementById(id); if (el) el.classList.toggle('hidden', !on); };
    show('cert-extra-fields', !isReceipt);
    show('cert-fee-fields', isReceipt);
    show('cert-f-exam', type === 'testimonial');
    show('cert-f-gpa', type === 'testimonial');
    show('cert-f-reason', type === 'tc');
    show('cert-print-btn', !isReceipt);

    const titles = { testimonial: 'প্রশংসাপত্র (Testimonial)', tc: 'বিদ্যালয় ছাড়পত্র (TC)', receipt: 'বেতন ও ফি রশিদ' };
    const tt = document.getElementById('cert-preview-title');
    if (tt) tt.textContent = `লাইভ প্রিভিউ — ${titles[type]}`;
    const note = document.getElementById('cert-orient-note');
    if (note) {
      note.textContent = isReceipt
        ? 'রশিদ A4 পেজে প্রিন্ট হবে — ফ্রেম সংখ্যা ও পেজের দিক ডানের সেটিং থেকে বদলানো যাবে।'
        : 'এই সনদ A4 Landscape (আড়াআড়ি) মোডে প্রিন্ট হবে — প্রিন্ট ডায়ালগে Margins: Default, Scale: 100% রাখুন।';
    }
    const box = document.getElementById('certificate-preview-box');
    if (box) delete box.dataset.userZoom;
    const zr = document.getElementById('cert-zoom');
    if (zr) zr.value = 0;
    this.updateZoomLabel();

    if (!this._certDocBound) {
      this._certDocBound = true;
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#cert-search-wrap')) document.getElementById('cert-search-results')?.classList.add('hidden');
      });
    }
    if (isReceipt) this.initFeeUI();
    this.populateCertificateStudents();
  },

  onCertFilterChange() {
    if (this.feeSel) this.feeSel.clear();
    this.populateCertificateStudents();
  },

  populateCertificateStudents() {
    if (!this._certInit) {
      this._certInit = true;
      return this.switchCertSubTab(this.currentCertType || 'testimonial');
    }
    const cls = document.getElementById('cert-class')?.value || '10';
    const grp = document.getElementById('cert-group')?.value || 'ALL';
    const list = this.getFilteredStudents(cls, grp);
    const sel = document.getElementById('cert-student');
    if (!sel) return;

    const prev = sel.value;
    sel.innerHTML = list.map(s => `<option value="${s.uid}">রোল ${s.roll} - ${this.esc(s.nameBn)} (${this.esc(s.nameEn)})</option>`).join('');
    if (prev && list.some(s => s.uid === prev)) sel.value = prev;
    const dEl = document.getElementById('cert-date');
    if (dEl && !dEl.value) dEl.value = this.todayStr();

    this.renderCertStudentCard();
    if (this.currentCertType === 'receipt') this.renderFeeMultiList();
    this.renderCertificatePreview();
  },

  onCertStudentChange() {
    this.renderCertStudentCard();
    this.renderCertificatePreview();
  },

  getCertStudent() {
    const uid = document.getElementById('cert-student')?.value;
    return this.students.find(s => s.session === this.session && s.uid === uid) || null;
  },

  renderCertStudentCard() {
    const el = document.getElementById('cert-stu-card');
    if (!el) return;
    const sel = document.getElementById('cert-student');
    const stu = this.getCertStudent();
    if (!stu) {
      el.innerHTML = `<div class="cm-empty">এই শ্রেণী/বিভাগে কোনো শিক্ষার্থী নেই। উপরে সার্চ করুন অথবা শ্রেণী বদলান।</div>`;
      return;
    }
    const idx = sel ? sel.selectedIndex : 0;
    const total = sel ? sel.options.length : 1;
    el.innerHTML = `
      <img src="${stu.photo || ''}" alt="" class="cm-stu-photo" />
      <div class="min-w-0 flex-1">
        <div class="font-extrabold text-[15px] leading-tight truncate">${this.esc(stu.nameBn)}</div>
        <div class="text-[11px] text-slate-500 truncate">${this.esc(stu.nameEn)}</div>
        <div class="flex flex-wrap gap-1 mt-1.5">
          <span class="cm-chip font-mono">ID ${this.esc(stu.uid)}</span>
          <span class="cm-chip">${CLASS_LABELS_BN[stu.cls]}</span>
          <span class="cm-chip">${GROUP_LABELS_BN[stu.group] || this.esc(stu.group)}</span>
          <span class="cm-chip">রোল ${this.esc(stu.roll)}</span>
        </div>
      </div>
      <div class="cm-stepper">
        <button type="button" onclick="App.stepCertStudent(-1)" title="আগের শিক্ষার্থী" ${idx <= 0 ? 'disabled' : ''}>◀</button>
        <span>${this.bnNum(idx + 1)}/${this.bnNum(total)}</span>
        <button type="button" onclick="App.stepCertStudent(1)" title="পরের শিক্ষার্থী" ${idx >= total - 1 ? 'disabled' : ''}>▶</button>
      </div>`;
  },

  stepCertStudent(delta) {
    const sel = document.getElementById('cert-student');
    if (!sel || !sel.options.length) return;
    const ni = Math.min(sel.options.length - 1, Math.max(0, sel.selectedIndex + delta));
    if (ni === sel.selectedIndex) return;
    sel.selectedIndex = ni;
    this.onCertStudentChange();
  },

  /* ---------- যেকোনো শ্রেণীর শিক্ষার্থী খুঁজে বের করা (নাম / আইডি / রোল) ---------- */
  certSearch() {
    const inp = document.getElementById('cert-search');
    const box = document.getElementById('cert-search-results');
    if (!inp || !box) return;
    const q = inp.value.trim().toLowerCase();
    if (!q) { box.classList.add('hidden'); return; }
    const hits = this.students
      .filter(s => s.session === this.session)
      .filter(s => [s.nameBn, s.nameEn, s.uid].some(x => String(x || '').toLowerCase().includes(q)) || String(s.roll) === q)
      .sort((a, b) => Number(a.cls) - Number(b.cls) || a.roll - b.roll);
    if (!hits.length) {
      box.innerHTML = `<div class="p-3 text-xs text-rose-500 font-bold">কোনো শিক্ষার্থী পাওয়া যায়নি।</div>`;
      box.classList.remove('hidden');
      return;
    }
    box.innerHTML = hits.slice(0, 8).map(s => `
      <button type="button" onclick="App.pickCertStudent('${s.uid}')" class="cm-hit">
        <img src="${s.photo || ''}" alt="" />
        <span class="min-w-0 flex-1 text-left">
          <span class="block font-bold text-[13px] truncate">${this.esc(s.nameBn)}</span>
          <span class="block text-[11px] text-slate-500 truncate">ID ${this.esc(s.uid)} • ${CLASS_LABELS_BN[s.cls]} • রোল ${this.esc(s.roll)}</span>
        </span>
      </button>`).join('') + (hits.length > 8 ? `<div class="px-3 py-1.5 text-[11px] text-slate-400">আরও ${this.bnNum(hits.length - 8)} জন আছে — আরও নির্দিষ্ট করে লিখুন</div>` : '');
    box.classList.remove('hidden');
  },

  onCertSearchKey(e) {
    if (e.key === 'Enter') {
      const first = document.querySelector('#cert-search-results .cm-hit');
      if (first) first.click();
    } else if (e.key === 'Escape') {
      document.getElementById('cert-search-results')?.classList.add('hidden');
    }
  },

  pickCertStudent(uid) {
    const stu = this.students.find(s => s.session === this.session && s.uid === uid);
    if (!stu) return;
    const clsEl = document.getElementById('cert-class');
    const grpEl = document.getElementById('cert-group');
    if (clsEl.value !== stu.cls) { clsEl.value = stu.cls; if (this.feeSel) this.feeSel.clear(); }
    this.syncSmartGroupFilter('cert-class', 'cert-group', true);
    if (grpEl) {
      const hasOpt = Array.from(grpEl.options).some(o => o.value === stu.group);
      grpEl.value = hasOpt ? stu.group : 'ALL';
    }
    this.populateCertificateStudents();
    const sel = document.getElementById('cert-student');
    if (sel) sel.value = uid;
    if (this.currentCertType === 'receipt' && this.feeMode === 'multi') this.feeSel.add(uid);
    this.onCertStudentChange();
    if (this.currentCertType === 'receipt') this.renderFeeMultiList();
    const inp = document.getElementById('cert-search');
    if (inp) inp.value = '';
    document.getElementById('cert-search-results')?.classList.add('hidden');
  },

  /* ---------- প্রিভিউ জুম ---------- */
  setCertZoom(v) {
    const box = document.getElementById('certificate-preview-box');
    if (!box) return;
    const z = Number(v) / 100;
    if (z > 0) box.dataset.userZoom = String(z); else delete box.dataset.userZoom;
    this.fitPreview(box, box.dataset.landscape === '1');
    this.updateZoomLabel();
  },
  resetCertZoom() {
    const zr = document.getElementById('cert-zoom');
    if (zr) zr.value = 0;
    this.setCertZoom(0);
  },
  updateZoomLabel() {
    const lb = document.getElementById('cert-zoom-label');
    const zr = document.getElementById('cert-zoom');
    if (!lb || !zr) return;
    lb.textContent = Number(zr.value) > 0 ? `${this.bnNum(zr.value)}%` : 'অটো ফিট';
  },

  /* ---------- জিপিএ ও ভেরিফিকেশন কোড ---------- */
  getCertGpa(stu) {
    const custom = (document.getElementById('cert-gpa-custom')?.value || '').trim();
    if (custom) return { text: custom, qr: this.bnToEnDigits(custom) };
    try {
      const { results } = this.computeClassResults(stu.cls, stu.group, 'Annual');
      const r = results.find(x => x.stu.uid === stu.uid);
      if (r && r.totalMarks > 0 && r.passed) return { text: `${r.gpa.toFixed(2)} (গ্রেড: ${r.lg})`, qr: r.gpa.toFixed(2) };
    } catch (e) {}
    return { text: '__________', qr: '' };
  },

  certVerifyCode(stu, serial) {
    const s = `${stu.uid}|${this.bnToEnDigits(serial)}|${this.settings.eiin}|${stu.nameEn}`;
    let h1 = 5381, h2 = 52711;
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      h1 = ((h1 * 33) ^ c) >>> 0;
      h2 = ((h2 * 31) + c * (i + 7)) >>> 0;
    }
    const a = h1.toString(36).toUpperCase().padStart(4, '0').slice(-4);
    const b = h2.toString(36).toUpperCase().padStart(4, '0').slice(-4);
    return `${a}-${b}`;
  },

  certDateBn() {
    const v = document.getElementById('cert-date')?.value || this.todayStr();
    const d = new Date(v + 'T00:00:00');
    return isNaN(d.getTime()) ? new Date().toLocaleDateString('bn-BD') : d.toLocaleDateString('bn-BD');
  },

  renderCertificatePreview() {
    const box = document.getElementById('certificate-preview-box');
    if (!box) return;
    if (this.currentCertType === 'receipt') return this.renderFeePreview();

    const stu = this.getCertStudent();
    if (!stu) {
      box.innerHTML = `<div class="cm-empty py-14">👈 বাম পাশ থেকে একজন শিক্ষার্থী নির্বাচন করুন — সনদের লাইভ প্রিভিউ এখানে দেখা যাবে।</div>`;
      return;
    }
    const gpa = this.getCertGpa(stu);
    box.innerHTML = this.currentCertType === 'testimonial'
      ? this.buildTestimonialHTML(stu, gpa)
      : this.buildTCHTML(stu);
    this.fitPreview(box, true);
  },

  buildTestimonialHTML(stu, gpa) {
    const serial = document.getElementById('cert-serial')?.value || '';
    const examPass = document.getElementById('cert-exam-pass')?.value || '';
    const vc = this.certVerifyCode(stu, serial);
    // QR এর ভেতরে শুধু ASCII তথ্য — বাংলা অক্ষর থাকলে আগে QR আসত না
    const qrUrl = this.generateQRDataURL(
      `ID:${stu.uid}|TESTIMONIAL|N:${stu.nameEn}|C:${stu.cls}|R:${stu.roll}|GPA:${gpa.qr || 'NA'}|SL:${this.bnToEnDigits(serial)}|EIIN:${this.settings.eiin}|VC:${vc}`, 300);
    const e = (v) => this.esc(v);
    const gpaText = (typeof gpa === 'string') ? gpa : gpa.text;

    const cert = `
      <div class="cert">
        ${this.buildCertHeader(stu, `স্মারক নং: ${e(serial) || '—'}`)}
        <div class="cert-title"><span>প্রশংসাপত্র (TESTIMONIAL)</span></div>
        <div class="cert-body">
          <p style="margin:0">
            এই মর্মে প্রত্যয়ন করা যাইতেছে যে, <strong>${e(stu.nameBn)}</strong> (ইংরেজি: <strong>${e(stu.nameEn)}</strong>),
            পিতা: <strong>${e(stu.father)}</strong>, মাতা: <strong>${e(stu.mother)}</strong>, ইউনিক আইডি: <strong>${e(stu.uid)}</strong>, জন্ম তারিখ: <strong>${e(stu.dob || '-')}</strong>,
            এই বিদ্যালয়ের ${CLASS_LABELS_BN[stu.cls]} (${GROUP_LABELS_BN[stu.group] || e(stu.group)}) শাখার রোল নং <strong>${e(stu.roll)}</strong>-এর একজন নিয়মিত শিক্ষার্থী ছিল।
            সে অত্র প্রতিষ্ঠান হইতে <strong>${e(examPass)}</strong>-এ অংশগ্রহণ করিয়া জিপিএ <strong>${e(gpaText)}</strong> লাভ করিয়া উত্তীর্ণ হইয়াছে।
          </p>
          <p style="margin:0">
            আমার জানামতে সে বিদ্যালয়ের কোনো শৃঙ্খলাবিরোধী কাজে লিপ্ত ছিল না; বরং তাহার চরিত্র ও নৈতিক গঠন অত্যন্ত সন্তোষজনক ছিল।
            আমি তাহার সর্বাঙ্গীন কল্যাণ ও উজ্জ্বল ভবিষ্যৎ জীবন কামনা করি।
          </p>
        </div>
        <div class="cert-foot">
          <div class="cert-qr">
            ${qrUrl ? `<img src="${qrUrl}" alt="QR" />` : `<div class="cert-noqr">QR</div>`}
            <div>
              <div class="cert-qr-t">অনলাইন ভেরিফিকেশন</div>
              <div>সিকিউরড ডিজিটাল প্রশংসাপত্র</div>
              <div class="cert-vc">কোড: ${vc}</div>
            </div>
          </div>
          <div class="cert-sig">
            ${this.settings.hmSig ? `<img src="${this.settings.hmSig}" alt="" />` : `<div class="sp"></div>`}
            <div class="ln">প্রধান শিক্ষক</div>
          </div>
        </div>
      </div>`;
    return this.buildSheets([1], 1, 1, () => cert, { landscape: true, cellStyle: 'padding:0;border:0' });
  },

  buildTCHTML(stu) {
    const serial = document.getElementById('cert-serial')?.value || '';
    const reason = document.getElementById('cert-tc-reason')?.value || '';
    const vc = this.certVerifyCode(stu, serial);
    const qrUrl = this.generateQRDataURL(
      `ID:${stu.uid}|TC|N:${stu.nameEn}|C:${stu.cls}|R:${stu.roll}|SL:${this.bnToEnDigits(serial)}|EIIN:${this.settings.eiin}|VC:${vc}`, 300);
    const e = (v) => this.esc(v);

    const cert = `
      <div class="cert">
        ${this.buildCertHeader(stu, `টিসি নং: ${e(serial) || '—'}`)}
        <div class="cert-title"><span>বিদ্যালয় ছাড়পত্র (TRANSFER CERTIFICATE - TC)</span></div>
        <div class="cert-body">
          <div class="cert-det">
            <div><strong>শিক্ষার্থীর নাম:</strong> ${e(stu.nameBn)}</div>
            <div><strong>পিতার নাম:</strong> ${e(stu.father)}</div>
            <div><strong>মাতার নাম:</strong> ${e(stu.mother)}</div>
            <div><strong>জন্ম তারিখ:</strong> ${e(stu.dob || '-')}</div>
            <div><strong>শ্রেণী ও বিভাগ:</strong> ${CLASS_LABELS_BN[stu.cls]} (${GROUP_LABELS_BN[stu.group] || e(stu.group)})</div>
            <div><strong>রোল নং:</strong> ${e(stu.roll)}</div>
            <div><strong>ইউনিক আইডি:</strong> ${e(stu.uid)}</div>
            <div><strong>শিক্ষাবর্ষ:</strong> ${e(stu.session)}</div>
            <div><strong>মোবাইল:</strong> ${e(stu.mobile || '-')}</div>
          </div>
          <p style="margin:0">
            প্রত্যয়ন করা যাইতেছে যে, উপরোক্ত শিক্ষার্থী এই বিদ্যালয়ের একজন নিয়মিত শিক্ষার্থী ছিল। বিদ্যালয়ের হিসাব অনুযায়ী তাহার সমস্ত পাওনা পরিশোধ করা হইয়াছে এবং তাহার চরিত্র সন্তোষজনক।
            সে অন্য কোনো স্বীকৃত বিদ্যালয়ে ভর্তি হইতে ইচ্ছুক হওয়ায় তাহাকে অত্র বিদ্যালয় হইতে ছাড়পত্র প্রদান করা হইল। বিদ্যালয় ত্যাগের কারণ: <strong>${e(reason)}</strong>।
            আমি তাহার ভবিষ্যৎ জীবনের সাফল্য কামনা করি।
          </p>
        </div>
        <div class="cert-foot">
          <div class="cert-qr">
            ${qrUrl ? `<img src="${qrUrl}" alt="QR" />` : `<div class="cert-noqr">QR</div>`}
            <div>
              <div class="cert-qr-t">টিসি ভেরিফিকেশন QR</div>
              <div>বৈধ ছাড়পত্র</div>
              <div class="cert-vc">কোড: ${vc}</div>
            </div>
          </div>
          <div class="cert-sig"><div class="sp"></div><div class="ln">ক্লাস শিক্ষক</div></div>
          <div class="cert-sig">
            ${this.settings.hmSig ? `<img src="${this.settings.hmSig}" alt="" />` : `<div class="sp"></div>`}
            <div class="ln">প্রধান শিক্ষক</div>
          </div>
        </div>
      </div>`;
    return this.buildSheets([1], 1, 1, () => cert, { landscape: true, cellStyle: 'padding:0;border:0' });
  },

  printCertificateNow() {
    const stu = this.getCertStudent();
    if (!stu) return this.toast('প্রথমে একজন শিক্ষার্থী নির্বাচন করুন!', 'error');
    const box = document.getElementById('certificate-preview-box');
    if (!box || !box.innerHTML.trim()) return;
    this.printHTML(box.innerHTML, true);
  },

  /* ==================== BACKUP, RESTORE & DYNAMIC PRINT ENGINE ==================== */
  async exportFullBackup() {
    const nowStr = new Date().toLocaleString('bn-BD');
    this.settings.lastBackup = nowStr;
    await this.db.put('settings', this.settings);
    const lbl = document.getElementById('last-backup-label');
    if (lbl) lbl.textContent = nowStr;

    const payload = {
      meta: { app: 'SchoolERP_BD_v5', exportedAt: new Date().toISOString() },
      settings: this.settings,
      students: await this.db.getAll('students'),
      subjects: await this.db.getAll('subjects'),
      attendance: await this.db.getAll('attendance'),
      marks: await this.db.getAll('marks'),
      qrattendance: await this.db.getAll('qrattendance'),
      fees: await this.db.getAll('fees')
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `School_Full_Backup_${this.settings.eiin}_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3000);      // সাথে সাথে revoke করলে কিছু ব্রাউজারে ডাউনলোড ফেল করত
    this.toast('সম্পূর্ণ ডাটাবেস ব্যাকআপ (.JSON) ডাউনলোড সম্পন্ন হয়েছে!');
  },

  async importFullBackup(event) {
    const input = event.target;
    const file = input.files[0];
    input.value = ''; // একই ফাইল আবার বাছাই করা গেলে যেন onchange কাজ করে
    if (!file) return;
    if (!(await this.confirmBox('ব্যাকআপ ফাইল রিস্টোর করলে বর্তমান ডাটা আপডেট হবে। আপনি কি নিশ্চিত?', { title: 'ব্যাকআপ রিস্টোর', icon: '💾', danger: true, confirmText: 'রিস্টোর করুন' }))) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data || typeof data !== 'object' || !data.meta || data.meta.app !== 'SchoolERP_BD_v5') {
          throw new Error('format');
        }
        if (data.settings) { data.settings.id = 'main'; await this.db.put('settings', data.settings); }
        if (Array.isArray(data.students)) {
          await this.db.clear('students');
          await this.db.bulkPut('students', data.students);
        }
        if (Array.isArray(data.subjects)) {
          await this.db.clear('subjects');
          await this.db.bulkPut('subjects', data.subjects);
        }
        if (Array.isArray(data.attendance)) {
          await this.db.clear('attendance');
          await this.db.bulkPut('attendance', data.attendance);
        }
        if (Array.isArray(data.marks)) {
          await this.db.clear('marks');
          await this.db.bulkPut('marks', data.marks);
        }
        if (Array.isArray(data.qrattendance)) {
          await this.db.clear('qrattendance');
          await this.db.bulkPut('qrattendance', data.qrattendance);
        }
        if (Array.isArray(data.fees)) {
          await this.db.clear('fees');
          await this.db.bulkPut('fees', data.fees);
        }
        await this.loadAllFromDB();
        this.applyTheme(this.settings.theme || 'light');
        this.renderSessionSelectors();
        this.bindSettingUI();
        this.syncAllUI();
        this.toast('১০০% ডাটা সফলভাবে রিস্টোর ও সিঙ্ক হয়েছে!');
      } catch (err) {
        this.toast('ব্যাকআপ ফাইলটি সঠিক নয়!', 'error');
      }
      event.target.value = '';
    };
    reader.readAsText(file);
  },

  buildPrintSchoolHeader(subTitleHtml) {
    return `
      <div class="text-center border-b-2 border-blue-900 pb-2 mb-3">
        <div class="flex items-center justify-center gap-3">
          ${this.settings.logo ? `<img src="${this.settings.logo}" class="w-12 h-12 object-contain" />` : ''}
          <div>
            <h1 class="text-lg font-extrabold text-blue-950">${this.esc(this.settings.nameBn)}</h1>
            <p class="text-xs text-slate-600">${this.esc(this.settings.address)} | EIIN: ${this.esc(this.settings.eiin)}</p>
          </div>
        </div>
        <div class="mt-1 font-bold text-xs bg-blue-50 text-blue-950 inline-block px-4 py-1 rounded-lg border border-blue-300">
          ${subTitleHtml}
        </div>
      </div>
    `;
  },

  /**
   * ফিক্সড প্রিন্ট ইঞ্জিন: ডাইনামিক @page স্টাইল ইনজেক্ট করার ফলে Portrait ও Landscape শতভাগ কাজ করবে
   */
  printHTML(htmlContent, landscape = false) {
    let pageStyle = document.getElementById('dynamic-print-page-style');
    if (!pageStyle) {
      pageStyle = document.createElement('style');
      pageStyle.id = 'dynamic-print-page-style';
      document.head.appendChild(pageStyle);
    }
    pageStyle.textContent = `@page { size: A4 ${landscape ? 'landscape' : 'portrait'}; margin: 5mm; }`;

    const stage = document.getElementById('print-stage');
    stage.innerHTML = htmlContent;

    const imgs = Array.from(stage.querySelectorAll('img'));
    const imgsReady = Promise.all(
      imgs.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(res => {
          img.onload = res;
          img.onerror = res;
        });
      })
    );
    const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready.catch(() => {}) : Promise.resolve();
    Promise.all([imgsReady, fontsReady]).then(() => {
      setTimeout(() => {
        window.print();
      }, 200);
    });
  },


});


Object.assign(App, {
  buildSheets(items, cols, rows, cellFn, opts = {}) {
    const per = cols * rows;
    const orient = opts.landscape ? 'landscape' : 'portrait';
    const cellStyle = opts.cellStyle || '';
    // rowH দিলে প্রতিটি সারির উচ্চতা নির্দিষ্ট থাকে এবং বাকি জায়গা সারিগুলোর মাঝে সমানভাবে ভাগ হয় (কার্ডের ভেতরে ফাঁকা পড়ে না)
    const rowsCss = opts.rowH ? `repeat(${rows},${opts.rowH}mm)` : `repeat(${rows},1fr)`;
    const alignCss = opts.rowH ? 'align-content:space-evenly;' : '';
    const pages = [];
    for (let i = 0; i < items.length; i += per) pages.push(items.slice(i, i + per));
    return pages.map(chunk => `
      <div class="a4-sheet ${orient}" style="grid-template-columns:repeat(${cols},1fr);grid-template-rows:${rowsCss};${alignCss}">
        ${chunk.map(it => `<div class="a4-cell" style="${cellStyle}">${cellFn(it)}</div>`).join('')}
      </div>`).join('');
  },
  fitPreview(box, landscape = false) {
    if (!box) return;
    box.classList.add('preview-zoom');
    const sheetPx = (landscape ? 287 : 200) * 3.7795;
    const avail = Math.max(260, box.getBoundingClientRect().width - 56);
    const user = parseFloat(box.dataset.userZoom || '0');
    const z = user > 0 ? user : Math.min(1, avail / sheetPx);
    box.style.setProperty('--pz', z.toFixed(3));
    box.dataset.landscape = landscape ? '1' : '0';
  },
  esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },
  bnNum(n) {
    return String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
  },
  buildCertHeader(stu, metaLeft) {
    const s = this.settings;
    const e = (v) => this.esc(v);
    return `
      <div class="cert-f1"></div><div class="cert-f2"></div>
      <i class="cert-corner tl"></i><i class="cert-corner tr"></i><i class="cert-corner bl"></i><i class="cert-corner br"></i>
      ${s.logo ? `<img class="cert-wm" src="${s.logo}" alt="" />` : ''}
      <div class="cert-head">
        <div class="cert-lg">${s.logo ? `<img src="${s.logo}" alt="" />` : ''}</div>
        <div class="cert-hc">
          <div class="cert-sn">${e(s.nameBn)}</div>
          <div class="cert-se">${e(s.nameEn)}</div>
          <div class="cert-sa">${e(s.address)}${s.eiin ? ' • EIIN: ' + e(s.eiin) : ''}${s.estd ? ' • স্থাপিত: ' + e(s.estd) : ''}</div>
        </div>
        <div class="cert-ph">${stu.photo ? `<img src="${stu.photo}" alt="" />` : ''}</div>
      </div>
      <div class="cert-meta"><span>${metaLeft}</span><span>তারিখ: ${this.certDateBn()}</span></div>`;
  },

  MONTHS_BN: ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'],
  feeItems: null,
  fees: [],
  feeSel: new Set(),
  feeMode: 'single',
  _feeTimer: null,
  _feeBusy: false,
  FEE_PRESETS: ['মাসিক বেতন', 'পরীক্ষা ফি', 'ভর্তি ফি', 'সেশন চার্জ', 'উন্নয়ন ফি', 'লাইব্রেরি ফি', 'আইডি কার্ড ফি', 'ক্রীড়া ফি', 'বিলম্ব ফি', 'অন্যান্য'],
  FEE_METHODS: ['হাতে নগদ', 'বিকাশ', 'নগদ (Nagad)', 'রকেট', 'ব্যাংক / চেক', 'অন্যান্য'],
  BN_W: ['শূন্য','এক','দুই','তিন','চার','পাঁচ','ছয়','সাত','আট','নয়','দশ','এগার','বার','তের','চৌদ্দ','পনের','ষোল','সতের','আঠার','ঊনিশ','বিশ','একুশ','বাইশ','তেইশ','চব্বিশ','পঁচিশ','ছাব্বিশ','সাতাশ','আটাশ','ঊনত্রিশ','ত্রিশ','একত্রিশ','বত্রিশ','তেত্রিশ','চৌত্রিশ','পঁয়ত্রিশ','ছত্রিশ','সাঁইত্রিশ','আটত্রিশ','ঊনচল্লিশ','চল্লিশ','একচল্লিশ','বিয়াল্লিশ','তেতাল্লিশ','চুয়াল্লিশ','পঁয়তাল্লিশ','ছেচল্লিশ','সাতচল্লিশ','আটচল্লিশ','ঊনপঞ্চাশ','পঞ্চাশ','একান্ন','বায়ান্ন','তিপ্পান্ন','চুয়ান্ন','পঞ্চান্ন','ছাপ্পান্ন','সাতান্ন','আটান্ন','ঊনষাট','ষাট','একষট্টি','বাষট্টি','তেষট্টি','চৌষট্টি','পঁয়ষট্টি','ছেষট্টি','সাতষট্টি','আটষট্টি','ঊনসত্তর','সত্তর','একাত্তর','বাহাত্তর','তিয়াত্তর','চুয়াত্তর','পঁচাত্তর','ছিয়াত্তর','সাতাত্তর','আটাত্তর','ঊনআশি','আশি','একাশি','বিরাশি','তিরাশি','চুরাশি','পঁচাশি','ছিয়াশি','সাতাশি','অষ্টাশি','ঊননব্বই','নব্বই','একানব্বই','বিরানব্বই','তিরানব্বই','চুরানব্বই','পঁচানব্বই','ছিয়ানব্বই','সাতানব্বই','আটানব্বই','নিরানব্বই'],

  takaInWordsBn(n) {
    n = Math.round(Number(n || 0) * 100) / 100;
    let taka = Math.floor(n);
    const paisa = Math.round((n - taka) * 100);
    const w = this.BN_W;
    const u1000 = (x) => {
      const h = Math.floor(x / 100), r = x % 100;
      return (h ? w[h] + 'শত' + (r ? ' ' : '') : '') + (r ? w[r] : '');
    };
    if (taka === 0 && !paisa) return 'শূন্য টাকা মাত্র';
    const parts = [];
    const cr = Math.floor(taka / 10000000); taka %= 10000000;
    const lk = Math.floor(taka / 100000); taka %= 100000;
    const th = Math.floor(taka / 1000); taka %= 1000;
    if (cr) parts.push(u1000(cr) + ' কোটি');
    if (lk) parts.push(w[lk] + ' লক্ষ');
    if (th) parts.push(w[th] + ' হাজার');
    if (taka) parts.push(u1000(taka));
    let out = parts.join(' ');
    out = out ? out + ' টাকা' : '';
    if (paisa) out += (out ? ' ' : '') + w[paisa] + ' পয়সা';
    return out + ' মাত্র';
  },
  fmtTk(n) { return Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); },

  /* ---------- ডাটা সহায়ক (পুরোনো রেকর্ডের সাথেও মিলবে) ---------- */
  _feeGross(f) { return Number(f.total) || 0; },
  _feeDisc(f) { return Number(f.discount) || 0; },
  _feeNet(f) { return f.net != null ? Number(f.net) : this._feeGross(f) - this._feeDisc(f); },
  _feePaid(f) { return f.voided ? 0 : (f.paid != null ? Number(f.paid) : this._feeNet(f)); },
  _feeDue(f) { return f.voided ? 0 : Math.max(0, this._feeNet(f) - this._feePaid(f)); },
  feesFor(uid, month) {
    return this.fees.filter(f => f.session === this.session && f.uid === uid && f.month === month && !f.voided);
  },

  /* ---------- UI ইনিশিয়ালাইজ ---------- */
  initFeeUI() {
    if (!this.feeItems) {
      this.feeItems = [
        { head: 'মাসিক বেতন', desc: '', amount: 0 },
        { head: 'পরীক্ষা ফি', desc: '', amount: 0 }
      ];
    }
    const mEl = document.getElementById('fee-month');
    if (mEl && !mEl.options.length) {
      mEl.innerHTML = this.MONTHS_BN.map((m, i) => `<option value="${i + 1}">${m}</option>`).join('');
      mEl.value = String(new Date().getMonth() + 1);
    }
    const dEl = document.getElementById('fee-date');
    if (dEl && !dEl.value) dEl.value = this.todayStr();
    const meth = document.getElementById('fee-method');
    if (meth && !meth.options.length) meth.innerHTML = this.FEE_METHODS.map(m => `<option>${m}</option>`).join('');
    const noEl = document.getElementById('fee-no');
    if (noEl && (!noEl.value || noEl.dataset.auto !== '0')) {
      noEl.value = this.nextReceiptNo();
      noEl.dataset.auto = '1';
    }
    const pr = document.getElementById('fee-presets');
    if (pr && !pr.children.length) {
      pr.innerHTML = this.FEE_PRESETS.map((p, i) => `<button type="button" class="cm-preset" onclick="App.addFeePreset(${i})">＋ ${p}</button>`).join('');
    }
    this.setFeeMode(this.feeMode, true);
    this.renderFeeItemsEditor();
  },
  nextReceiptNo() {
    const nums = this.fees
      .filter(f => f.session === this.session)
      .map(f => parseInt(String(f.receiptNo || '').split('-').pop(), 10) || 0);
    const next = (nums.length ? Math.max(...nums) : 0) + 1;
    return `MR-${this.session}-${String(next).padStart(4, '0')}`;
  },
  receiptNoAt(base, i) {
    const m = /^(.*?)(\d+)$/.exec(String(base));
    if (!m) return `${base}-${i + 1}`;
    return m[1] + String(Number(m[2]) + i).padStart(m[2].length, '0');
  },
  onFeeNoInput() {
    const noEl = document.getElementById('fee-no');
    if (noEl) noEl.dataset.auto = '0';
    this.onFeeChange();
  },
  onFeeChange(refreshList = false) {
    if (refreshList) this.renderFeeMultiList();
    this.updateFeeSummary();
    clearTimeout(this._feeTimer);
    this._feeTimer = setTimeout(() => this.renderCertificatePreview(), 150);
  },

  setFeeMode(mode, silent = false) {
    this.feeMode = mode === 'multi' ? 'multi' : 'single';
    const multi = this.feeMode === 'multi';
    document.getElementById('fee-mode-single')?.classList.toggle('active', !multi);
    document.getElementById('fee-mode-multi')?.classList.toggle('active', multi);
    document.getElementById('fee-multi-wrap')?.classList.toggle('hidden', !multi);
    document.getElementById('fee-paid-wrap')?.classList.toggle('hidden', multi);
    const cp = document.getElementById('fee-copies');
    if (cp && !silent) cp.value = multi ? '1' : '2';
    if (multi) this.renderFeeMultiList();
    this.updateFeeSummary();
    if (!silent) this.renderCertificatePreview();
  },

  /* ---------- একাধিক শিক্ষার্থী নির্বাচন ---------- */
  renderFeeMultiList() {
    const wrap = document.getElementById('fee-multi-list');
    if (!wrap || this.feeMode !== 'multi') return;
    const cls = document.getElementById('cert-class')?.value || '10';
    const grp = document.getElementById('cert-group')?.value || 'ALL';
    const all = this.getFilteredStudents(cls, grp);
    const allowed = new Set(all.map(s => s.uid));
    [...this.feeSel].forEach(u => { if (!allowed.has(u)) this.feeSel.delete(u); });
    const q = (document.getElementById('fee-multi-search')?.value || '').trim().toLowerCase();
    const list = all.filter(s => !q || [s.nameBn, s.nameEn, s.uid].some(x => String(x || '').toLowerCase().includes(q)) || String(s.roll) === q);
    const month = parseInt(document.getElementById('fee-month')?.value || String(new Date().getMonth() + 1), 10);
    wrap.innerHTML = list.length ? list.map(s => {
      const paid = this.feesFor(s.uid, month).reduce((a, f) => a + this._feePaid(f), 0);
      const due = this.feesFor(s.uid, month).reduce((a, f) => a + this._feeDue(f), 0);
      const chip = paid || due
        ? `<span class="cm-chip ${due ? 'cm-warn' : 'cm-ok'}">${due ? 'বকেয়া ৳' + due : '✔ জমা ৳' + paid}</span>`
        : `<span class="cm-chip">অপরিশোধিত</span>`;
      return `<label class="cm-row ${this.feeSel.has(s.uid) ? 'sel' : ''}">
        <input type="checkbox" ${this.feeSel.has(s.uid) ? 'checked' : ''} onchange="App.toggleFeeSel('${s.uid}', this.checked)" />
        <span class="w-8 text-center font-extrabold">${this.esc(s.roll)}</span>
        <span class="flex-1 min-w-0 truncate font-semibold">${this.esc(s.nameBn)}</span>
        <span class="font-mono text-[11px] text-slate-500">${this.esc(s.uid)}</span>
        ${chip}
      </label>`;
    }).join('') : `<div class="cm-empty">এই শ্রেণী/বিভাগে কোনো শিক্ষার্থী নেই।</div>`;
    this.updateFeeSelCount();
  },
  updateFeeSelCount() {
    const el = document.getElementById('fee-multi-count');
    if (el) el.textContent = `${this.bnNum(this.feeSel.size)} জন নির্বাচিত`;
  },
  toggleFeeSel(uid, on) {
    if (on) this.feeSel.add(uid); else this.feeSel.delete(uid);
    this.renderFeeMultiList();
    this.onFeeChange();
  },
  _feeVisibleUids() {
    const cls = document.getElementById('cert-class')?.value || '10';
    const grp = document.getElementById('cert-group')?.value || 'ALL';
    const q = (document.getElementById('fee-multi-search')?.value || '').trim().toLowerCase();
    return this.getFilteredStudents(cls, grp)
      .filter(s => !q || [s.nameBn, s.nameEn, s.uid].some(x => String(x || '').toLowerCase().includes(q)) || String(s.roll) === q)
      .map(s => s.uid);
  },
  feeSelAll() { this._feeVisibleUids().forEach(u => this.feeSel.add(u)); this.renderFeeMultiList(); this.onFeeChange(); },
  feeSelNone() { this.feeSel.clear(); this.renderFeeMultiList(); this.onFeeChange(); },
  feeSelUnpaid() {
    const month = parseInt(document.getElementById('fee-month')?.value || '1', 10);
    this.feeSel.clear();
    this._feeVisibleUids().forEach(u => { if (!this.feesFor(u, month).length) this.feeSel.add(u); });
    this.renderFeeMultiList();
    this.onFeeChange();
  },
  getFeeTargets() {
    if (this.feeMode === 'single') {
      const s = this.getCertStudent();
      return s ? [s] : [];
    }
    const cls = document.getElementById('cert-class')?.value || '10';
    const grp = document.getElementById('cert-group')?.value || 'ALL';
    return this.getFilteredStudents(cls, grp).filter(s => this.feeSel.has(s.uid));
  },

  /* ---------- খাত তালিকা ---------- */
  renderFeeItemsEditor() {
    const wrap = document.getElementById('fee-items');
    if (!wrap) return;
    wrap.innerHTML = this.feeItems.map((it, i) => `
      <div class="grid grid-cols-12 gap-1.5 items-center">
        <input type="text" value="${this.esc(it.head)}" placeholder="খাত (যেমন: মাসিক বেতন)" oninput="App.onFeeItemInput(${i},'head',this.value)" class="col-span-4 modern-input font-bold text-xs fee-in-head" />
        <input type="text" value="${this.esc(it.desc)}" placeholder="বিবরণ (ঐচ্ছিক)" oninput="App.onFeeItemInput(${i},'desc',this.value)" class="col-span-4 modern-input text-xs" />
        <input type="number" min="0" step="any" value="${it.amount || ''}" placeholder="০" oninput="App.onFeeItemInput(${i},'amount',this.value)" class="col-span-3 modern-input text-xs text-right font-mono font-bold" />
        <button type="button" onclick="App.removeFeeItem(${i})" title="এই খাত মুছুন" class="col-span-1 bg-rose-100 hover:bg-rose-500 hover:text-white text-rose-700 font-extrabold rounded-lg py-1.5 text-xs">✕</button>
      </div>`).join('');
    this.updateFeeSummary();
  },
  onFeeItemInput(i, key, val) {
    if (!this.feeItems[i]) return;
    this.feeItems[i][key] = key === 'amount' ? (Math.max(0, Number(val)) || 0) : val;
    this.onFeeChange();
  },
  addFeeItem(head = '') {
    if (!this.feeItems) this.feeItems = [];
    this.feeItems.push({ head, desc: '', amount: 0 });
    this.renderFeeItemsEditor();
    const rows = document.querySelectorAll('#fee-items .fee-in-head');
    const amts = document.querySelectorAll('#fee-items input[type=number]');
    if (head && amts.length) amts[amts.length - 1].focus(); else if (rows.length) rows[rows.length - 1].focus();
    this.onFeeChange();
  },
  addFeePreset(i) {
    const name = this.FEE_PRESETS[i];
    const empty = this.feeItems.findIndex(it => !it.head && !it.amount);
    if (empty >= 0) { this.feeItems[empty].head = name; this.renderFeeItemsEditor(); this.onFeeChange(); return; }
    this.addFeeItem(name);
  },
  removeFeeItem(i) {
    this.feeItems.splice(i, 1);
    this.renderFeeItemsEditor();
    this.onFeeChange();
  },
  feeValidItems() {
    return (this.feeItems || [])
      .filter(it => Number(it.amount) > 0)
      .map(it => ({ head: (it.head || '').trim() || 'অন্যান্য', desc: (it.desc || '').trim(), amount: Number(it.amount) }));
  },

  getFeeContext() {
    const g = (id) => document.getElementById(id);
    const FL = {
      portrait:  { 1: [1, 1], 2: [1, 2], 3: [1, 3], 4: [2, 2], 6: [2, 3], 8: [2, 4] },
      landscape: { 1: [1, 1], 2: [2, 1], 3: [3, 1], 4: [2, 2], 6: [3, 2], 8: [4, 2] }
    };
    const FS = {
      portrait:  { 1: 14, 2: 12, 3: 11, 4: 10, 6: 9, 8: 8 },
      landscape: { 1: 13, 2: 11.5, 3: 10, 4: 9.5, 6: 8.5, 8: 7.5 }
    };
    const orient = (g('fee-orient')?.value === 'landscape') ? 'landscape' : 'portrait';
    let frames = parseInt(g('fee-frames')?.value || '2', 10);
    if (!FL[orient][frames]) frames = 2;
    const month = parseInt(g('fee-month')?.value || String(new Date().getMonth() + 1), 10);
    const dateISO = g('fee-date')?.value || this.todayStr();
    const items = this.feeValidItems();
    const gross = items.reduce((a, b) => a + b.amount, 0);
    const discount = Math.min(gross, Math.max(0, Number(g('fee-discount')?.value) || 0));
    const net = gross - discount;
    const multi = this.feeMode === 'multi';
    const paidRaw = (g('fee-paid')?.value ?? '').toString().trim();
    let paid = (multi || paidRaw === '') ? net : Math.min(net, Math.max(0, Number(paidRaw) || 0));
    const due = net - paid;
    return {
      orient, frames, layout: FL[orient][frames], baseFs: FS[orient][frames],
      mode: this.feeMode,
      copies: Math.max(1, parseInt(g('fee-copies')?.value || '1', 10)),
      receiptNo: (g('fee-no')?.value || '').trim() || this.nextReceiptNo(),
      month, monthLabel: `${this.MONTHS_BN[month - 1]} - ${this.bnNum(this.session)}`,
      dateISO, dateBn: new Date(dateISO + 'T00:00:00').toLocaleDateString('bn-BD'),
      items, gross, discount, net, paid, due,
      method: g('fee-method')?.value || this.FEE_METHODS[0],
      receivedBy: (g('fee-by')?.value || '').trim(),
      note: (g('fee-note')?.value || '').trim()
    };
  },

  updateFeeSummary() {
    const el = document.getElementById('fee-summary');
    if (!el) return;
    const c = this.getFeeContext();
    const n = this.getFeeTargets().length;
    const row = (l, v, cls = '') => `<div class="cm-sum-row ${cls}"><span>${l}</span><b>${v}</b></div>`;
    el.innerHTML = `
      ${row('মোট ফি (প্রতি শিক্ষার্থী)', '৳ ' + this.fmtTk(c.gross))}
      ${c.discount ? row('ছাড় / মওকুফ', '− ৳ ' + this.fmtTk(c.discount), 'text-amber-600') : ''}
      ${row('প্রদেয় (Net)', '৳ ' + this.fmtTk(c.net), 'cm-sum-net')}
      ${c.mode === 'single' ? row('জমা (পরিশোধিত)', '৳ ' + this.fmtTk(c.paid), 'text-emerald-600') : ''}
      ${c.mode === 'single' && c.due > 0 ? row('বকেয়া', '৳ ' + this.fmtTk(c.due), 'text-rose-600') : ''}
      ${c.mode === 'multi' ? row(`${this.bnNum(n)} জন × ৳${this.fmtTk(c.net)} = সর্বমোট`, '৳ ' + this.fmtTk(c.net * n), 'cm-sum-net') : ''}
      <div class="cm-words">কথায়: ${this.takaInWordsBn(c.mode === 'multi' ? c.net * n : c.paid)}</div>`;
    this.updateFeeSelCount();
  },

  /* ---------- রশিদ এন্ট্রি তৈরি ---------- */
  _feeEntryFromCtx(stu, ctx, no, copy, flag) {
    return {
      stu: { nameBn: stu.nameBn, nameEn: stu.nameEn, uid: stu.uid, cls: stu.cls, group: stu.group, roll: stu.roll },
      receiptNo: no, monthLabel: ctx.monthLabel, month: ctx.month, dateISO: ctx.dateISO,
      items: ctx.items, gross: ctx.gross, discount: ctx.discount, net: ctx.net, paid: ctx.paid, due: ctx.due,
      method: ctx.method, receivedBy: ctx.receivedBy, note: ctx.note, copy, flag
    };
  },
  _feeEntryFromRec(f, copy, flag) {
    return {
      stu: { nameBn: f.nameBn, nameEn: f.nameEn, uid: f.uid, cls: f.cls, group: f.group, roll: f.roll },
      receiptNo: f.receiptNo, monthLabel: f.monthLabel || this.MONTHS_BN[f.month - 1], month: f.month, dateISO: f.date,
      items: f.items || [], gross: this._feeGross(f), discount: this._feeDisc(f), net: this._feeNet(f),
      paid: f.paid != null ? Number(f.paid) : this._feeNet(f), due: Math.max(0, this._feeNet(f) - (f.paid != null ? Number(f.paid) : this._feeNet(f))),
      method: f.method || '', receivedBy: f.receivedBy || '', note: f.note || '', copy, flag
    };
  },
  _feeEntries(targets, ctx, flag, startNo) {
    const out = [];
    targets.forEach((stu, i) => {
      const no = this.receiptNoAt(startNo || ctx.receiptNo, i);
      for (let c = 0; c < ctx.copies; c++) {
        const copy = ctx.copies === 1 ? 'শিক্ষার্থী কপি' : (c % 2 === 0 ? 'অফিস কপি' : 'শিক্ষার্থী কপি');
        out.push(this._feeEntryFromCtx(stu, ctx, no, copy, flag));
      }
    });
    return out;
  },

  buildReceiptSheets(entries, ctx) {
    const [cols, rows] = ctx.layout;
    const e = (v) => this.esc(v);
    const s0 = this.settings;
    const cell = (en) => {
      const st = en.stu;
      const hasDesc = en.items.some(it => it.desc);
      const rowsHtml = en.items.map((it, i) => `
        <tr><td class="sl">${i + 1}</td><td>${e(it.head)}</td>${hasDesc ? `<td>${e(it.desc)}</td>` : ''}<td class="am">${this.fmtTk(it.amount)}</td></tr>`).join('');
      const stamp = en.flag === 'DRAFT' ? ['খসড়া', 'rc-st-draft']
        : en.flag === 'VOID' ? ['বাতিল', 'rc-st-draft']
        : en.due > 0 ? [`বকেয়া ৳${this.fmtTk(en.due)}`, 'rc-st-part']
        : ['পরিশোধিত', 'rc-st-paid'];
      const qr = this.generateQRDataURL(`RCPT:${en.receiptNo}|STU=${st.uid}|MON=${en.month}|PAID=${en.paid}|DUE=${en.due}|DT=${en.dateISO}|EIIN=${s0.eiin}`, 200);
      return `
        <div class="rc" style="--fs:${ctx.baseFs}px">
          ${s0.logo ? `<img class="rc-wm" src="${s0.logo}" alt="" />` : ''}
          <div class="rc-head">
            <div style="display:flex;align-items:center;gap:.6em;min-width:0">
              ${s0.logo ? `<img src="${s0.logo}" alt="" />` : ''}
              <div style="min-width:0"><div class="rc-sn">${e(s0.nameBn)}</div><div class="rc-ad">${e(s0.address)}${s0.eiin ? ' | EIIN: ' + e(s0.eiin) : ''}</div></div>
            </div>
            <span class="rc-badge">${en.copy}${en.flag === 'DUP' ? ' • ডুপ্লিকেট' : ''}</span>
          </div>
          <div class="rc-titlebar"><span class="rc-title">বেতন / ফি আদায় রশিদ</span><span>রশিদ নং: <b class="mono">${e(en.receiptNo)}</b></span><span>তারিখ: <b>${new Date(en.dateISO + 'T00:00:00').toLocaleDateString('bn-BD')}</b></span></div>
          <div class="rc-info">
            <div><b>শিক্ষার্থী:</b> ${e(st.nameBn)}</div>
            <div><b>আইডি:</b> <span class="mono" style="font-weight:800;color:#175e6e">${e(st.uid)}</span></div>
            <div><b>শ্রেণী:</b> ${CLASS_LABELS_BN[st.cls]} | রোল: ${e(st.roll)}</div>
            <div><b>বিভাগ:</b> ${GROUP_LABELS_BN[st.group] || e(st.group)}</div>
            <div style="grid-column:1/-1"><b>কোন মাসের ফি:</b> ${e(en.monthLabel)}</div>
          </div>
          <div class="rc-tbwrap">
            <table class="rc-tbl">
              <thead><tr><th class="sl">#</th><th>খাত</th>${hasDesc ? '<th>বিবরণ</th>' : ''}<th style="text-align:right">টাকা (৳)</th></tr></thead>
              <tbody>${rowsHtml || `<tr><td colspan="${hasDesc ? 4 : 3}" style="text-align:center;color:#94a3b8">কোনো খাত যোগ করা হয়নি</td></tr>`}</tbody>
            </table>
          </div>
          <div class="rc-sum">
            <div><span>মোট ফি</span><b>৳ ${this.fmtTk(en.gross)}</b></div>
            ${en.discount ? `<div><span>ছাড় / মওকুফ</span><b>− ৳ ${this.fmtTk(en.discount)}</b></div>` : ''}
            <div class="rc-net"><span>প্রদেয়</span><b>৳ ${this.fmtTk(en.net)}</b></div>
            <div><span>জমা</span><b>৳ ${this.fmtTk(en.paid)}</b></div>
            ${en.due > 0 ? `<div class="rc-due"><span>বকেয়া</span><b>৳ ${this.fmtTk(en.due)}</b></div>` : ''}
          </div>
          <div class="rc-words"><b>কথায়:</b> ${this.takaInWordsBn(en.paid)}</div>
          <div class="rc-meta">
            ${en.method ? `<span><b>মাধ্যম:</b> ${e(en.method)}</span>` : ''}
            ${en.receivedBy ? `<span><b>গ্রহণকারী:</b> ${e(en.receivedBy)}</span>` : ''}
            ${en.note ? `<span><b>মন্তব্য:</b> ${e(en.note)}</span>` : ''}
          </div>
          <div class="rc-sign">
            <div><div class="sp"></div><div class="ln">আদায়কারী ক্যাশিয়ার</div></div>
            ${qr ? `<img class="rc-qr" src="${qr}" alt="QR" />` : '<span></span>'}
            <div>${s0.hmSig ? `<img src="${s0.hmSig}" alt="" />` : `<div class="sp"></div>`}<div class="ln">প্রধান শিক্ষক / হিসাবরক্ষক</div></div>
          </div>
          <div class="rc-stamp ${stamp[1]}">${stamp[0]}</div>
        </div>`;
    };
    const html = this.buildSheets(entries, cols, rows, cell, { landscape: ctx.orient === 'landscape' });
    return this._fitReceipts(html);
  },

  /* প্রতিটি রশিদের লেখা ফ্রেমের মাপে অটো-ফিট: বেশি খাত হলে ছোট, কম হলে বড় — কিছু কাটা পড়ে না, ফাঁকাও থাকে না */
  _fitReceipts(html) {
    const host = document.createElement('div');
    host.style.cssText = 'position:fixed;left:-99999px;top:0;visibility:hidden';
    host.innerHTML = html;
    document.body.appendChild(host);
    try {
      host.querySelectorAll('.rc').forEach(rc => {
        const base = parseFloat(rc.style.getPropertyValue('--fs')) || 11;
        let fs = base, guard = 0;
        const set = (v) => rc.style.setProperty('--fs', v.toFixed(2) + 'px');
        const fits = () => rc.scrollHeight <= rc.clientHeight + 0.5;
        if (fits()) {
          while (fs < base * 1.45 && guard++ < 60) {
            set(fs + 0.25);
            if (!fits()) { set(fs); break; }
            fs += 0.25;
          }
        } else {
          while (!fits() && fs > 4.5 && guard++ < 120) { fs -= 0.25; set(fs); }
        }
      });
      return host.innerHTML;
    } finally {
      document.body.removeChild(host);
    }
  },

  renderFeePreview() {
    const box = document.getElementById('certificate-preview-box');
    if (!box) return;
    this.updateFeeSummary();
    const ctx = this.getFeeContext();
    const targets = this.getFeeTargets();
    if (!targets.length) {
      box.innerHTML = `<div class="cm-empty py-14">${ctx.mode === 'multi' ? '👈 বাম পাশের তালিকা থেকে এক বা একাধিক শিক্ষার্থী টিক দিন।' : '👈 বাম পাশ থেকে একজন শিক্ষার্থী নির্বাচন করুন।'}</div>`;
      return;
    }
    const per = ctx.layout[0] * ctx.layout[1];
    const showTargets = targets.slice(0, Math.ceil(per / ctx.copies));
    const entries = this._feeEntries(showTargets, ctx, 'DRAFT').slice(0, per);
    let note = '';
    if (!ctx.items.length) note = `<div class="cm-note warn">⚠ কমপক্ষে একটি খাতে টাকার পরিমাণ (০-এর বেশি) দিন।</div>`;
    else if (targets.length > showTargets.length) note = `<div class="cm-note">ℹ প্রিভিউতে শুধু প্রথম পেজ দেখানো হচ্ছে। মোট ${this.bnNum(targets.length)} জনের রশিদ হবে।</div>`;
    box.innerHTML = note + this.buildReceiptSheets(entries, ctx);
    this.fitPreview(box, ctx.orient === 'landscape');
  },

  /* ---------- সংরক্ষণ ও প্রিন্ট ---------- */
  async saveFeePayments(doPrint = false) {
    if (this._feeBusy) return;
    await this.syncBeforeWrite();
    const ctx = this.getFeeContext();
    let targets = this.getFeeTargets();
    if (!targets.length) return this.toast(ctx.mode === 'multi' ? 'তালিকা থেকে অন্তত একজন শিক্ষার্থী টিক দিন!' : 'প্রথমে একজন শিক্ষার্থী নির্বাচন করুন!', 'error');
    if (!ctx.items.length) return this.toast('কমপক্ষে একটি খাতে টাকার পরিমাণ (০-এর বেশি) দিন!', 'error');
    if (ctx.net <= 0) return this.toast('প্রদেয় টাকা ০ — ছাড় মোট ফির সমান বা বেশি হতে পারে না।', 'error');
    if (ctx.mode === 'single' && ctx.paid <= 0) return this.toast('জমার পরিমাণ ০-এর বেশি দিন।', 'error');

    const dup = targets.filter(s => this.feesFor(s.uid, ctx.month).length);
    if (dup.length) {
      const mname = this.MONTHS_BN[ctx.month - 1];
      if (targets.length === 1) {
        const sum = this.feesFor(targets[0].uid, ctx.month).reduce((a, f) => a + this._feePaid(f), 0);
        if (!(await this.confirmBox(`${targets[0].nameBn}-এর ${mname} মাসে আগেই ৳${sum} জমা আছে। তবুও নতুন রশিদ সংরক্ষণ করবেন?`, { title: 'আগেই ফি জমা আছে', icon: '⚠️', confirmText: 'তবুও সংরক্ষণ করুন' }))) return;
      } else {
        if (!(await this.confirmBox(`${this.bnNum(dup.length)} জনের ${mname} মাসে আগেই রশিদ আছে (যেমন: ${dup[0].nameBn})।\n\nতাদের বাদ দিয়ে বাকিদের রশিদ সংরক্ষণ করবেন? (বাতিল করলে কিছুই সংরক্ষণ হবে না)`, { title: 'আগেই রশিদ আছে', icon: '⚠️', confirmText: 'বাদ দিয়ে সংরক্ষণ করুন' }))) return;
        const dset = new Set(dup.map(s => s.uid));
        targets = targets.filter(s => !dset.has(s.uid));
        if (!targets.length) return this.toast('সবার ফি এই মাসে আগেই জমা আছে।', 'warn');
      }
    }
    const nums = targets.map((_, i) => this.receiptNoAt(ctx.receiptNo, i));
    const used = new Set(this.fees.filter(f => f.session === this.session).map(f => f.receiptNo));
    const clash = nums.find(n => used.has(n));
    if (clash) return this.toast(`রশিদ নং ${clash} আগেই ব্যবহৃত হয়েছে। নতুন নম্বর দিন।`, 'error');

    this._feeBusy = true;
    try {
      const batchId = `B${Date.now()}`;
      const recs = targets.map((stu, i) => ({
        id: `FEE_${this.session}_${Date.now()}_${i}_${stu.uid}`,
        session: this.session, receiptNo: nums[i], batchId,
        uid: stu.uid, nameBn: stu.nameBn, nameEn: stu.nameEn, cls: stu.cls, group: stu.group, roll: stu.roll,
        month: ctx.month, monthLabel: ctx.monthLabel, date: ctx.dateISO,
        items: ctx.items.map(x => ({ ...x })), total: ctx.gross, discount: ctx.discount, net: ctx.net,
        paid: ctx.paid, due: ctx.due, method: ctx.method, receivedBy: ctx.receivedBy, note: ctx.note,
        createdAt: new Date().toISOString()
      }));
      await this.db.bulkPut('fees', recs);
      this.fees.push(...recs);

      if (doPrint) {
        const entries = [];
        recs.forEach(r => {
          for (let c = 0; c < ctx.copies; c++) {
            entries.push(this._feeEntryFromRec(r, ctx.copies === 1 ? 'শিক্ষার্থী কপি' : (c % 2 === 0 ? 'অফিস কপি' : 'শিক্ষার্থী কপি'), null));
          }
        });
        this.printHTML(this.buildReceiptSheets(entries, ctx), ctx.orient === 'landscape');
      }
      const noEl = document.getElementById('fee-no');
      if (noEl) { noEl.dataset.auto = '1'; noEl.value = this.nextReceiptNo(); }
      const paidEl = document.getElementById('fee-paid'); if (paidEl) paidEl.value = '';
      if (ctx.mode === 'multi') this.feeSel.clear();
      this.renderFeeMultiList();
      this.renderCertificatePreview();
      const total = recs.reduce((a, r) => a + r.paid, 0);
      this.toast(`✔ ${this.bnNum(recs.length)} জনের রশিদ সংরক্ষিত — মোট আদায় ৳${total.toLocaleString('en-IN')} (${recs[0].receiptNo}${recs.length > 1 ? ' – ' + recs[recs.length - 1].receiptNo : ''})`);
    } catch (err) {
      console.error(err);
      this.toast('সংরক্ষণ ব্যর্থ হয়েছে! আবার চেষ্টা করুন।', 'error');
    } finally {
      this._feeBusy = false;
    }
  },

  /* সংরক্ষণ ছাড়া শুধু প্রিন্ট — রশিদে "খসড়া" সিল পড়ে, তাই হিসাবের বাইরে চলে যাওয়া রশিদ চেনা যায় */
  printFeeDraft() {
    const ctx = this.getFeeContext();
    const targets = this.getFeeTargets();
    if (!targets.length) return this.toast('প্রথমে শিক্ষার্থী নির্বাচন করুন!', 'error');
    if (!ctx.items.length) return this.toast('কমপক্ষে একটি খাতে টাকার পরিমাণ দিন!', 'error');
    this.printHTML(this.buildReceiptSheets(this._feeEntries(targets, ctx, 'DRAFT'), ctx), ctx.orient === 'landscape');
  },

  reprintFeeRecord(id) {
    const f = this.fees.find(x => x.id === id);
    if (!f) return;
    if (f.voided) return this.toast('বাতিল রশিদ প্রিন্ট করা যায় না।', 'warn');
    const ctx = this.getFeeContext();
    const entries = [this._feeEntryFromRec(f, 'শিক্ষার্থী কপি', 'DUP')];
    this.printHTML(this.buildReceiptSheets(entries, { ...ctx, layout: [1, 2].slice(0, 2), orient: 'portrait', baseFs: 12 }), false);
  },

  /* ---------- পেমেন্ট রেকর্ড (লেজার) ---------- */
  openFeeLedger(prefillUid) {
    const m = document.getElementById('fee-ledger-modal');
    if (!m) return;
    m.classList.remove('hidden');
    m.classList.add('flex');
    const srch = document.getElementById('fl-search');
    if (srch) srch.value = prefillUid || '';
    const cl = document.getElementById('fl-class');
    if (cl && prefillUid) cl.value = 'ALL';
    this.renderFeeLedger();
  },
  openStudentFeeLedger() {
    this.openFeeLedger(document.getElementById('cert-student')?.value || '');
  },
  closeFeeLedger() {
    const m = document.getElementById('fee-ledger-modal');
    if (!m) return;
    m.classList.add('hidden');
    m.classList.remove('flex');
  },
  ledgerToday() {
    const t = this.todayStr();
    document.getElementById('fl-from').value = t;
    document.getElementById('fl-to').value = t;
    this.renderFeeLedger();
  },
  ledgerClearDates() {
    document.getElementById('fl-from').value = '';
    document.getElementById('fl-to').value = '';
    this.renderFeeLedger();
  },
  getLedgerFiltered() {
    const v = (id, d) => document.getElementById(id)?.value || d;
    const cls = v('fl-class', 'ALL'), month = v('fl-month', 'ALL'), status = v('fl-status', 'ALL');
    const from = v('fl-from', ''), to = v('fl-to', '');
    const q = v('fl-search', '').trim().toLowerCase();
    return this.fees
      .filter(f => f.session === this.session)
      .filter(f => cls === 'ALL' || f.cls === cls)
      .filter(f => month === 'ALL' || String(f.month) === month)
      .filter(f => !from || String(f.date || '') >= from)
      .filter(f => !to || String(f.date || '') <= to)
      .filter(f => status === 'ALL' || (status === 'VOID' ? f.voided : status === 'DUE' ? (!f.voided && this._feeDue(f) > 0) : (!f.voided && this._feeDue(f) === 0)))
      .filter(f => !q || [f.uid, f.nameBn, f.nameEn, f.receiptNo].some(x => String(x || '').toLowerCase().includes(q)))
      .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')) || String(b.receiptNo).localeCompare(String(a.receiptNo)));
  },
  renderFeeLedger() {
    const body = document.getElementById('fl-body');
    if (!body) return;
    const view = document.getElementById('fl-view')?.value || 'list';
    const fmt = (n) => Number(n).toLocaleString('en-IN');
    const list = this.getLedgerFiltered();
    const live = list.filter(f => !f.voided);
    const paid = live.reduce((a, f) => a + this._feePaid(f), 0);
    const due = live.reduce((a, f) => a + this._feeDue(f), 0);
    const disc = live.reduce((a, f) => a + this._feeDisc(f), 0);
    const uniq = new Set(live.map(f => f.uid)).size;
    const byMethod = {};
    live.forEach(f => { const m = f.method || 'উল্লেখ নেই'; byMethod[m] = (byMethod[m] || 0) + this._feePaid(f); });
    document.getElementById('fl-summary').innerHTML = [
      ['মোট রশিদ', this.bnNum(live.length) + (list.length - live.length ? ` (বাতিল ${this.bnNum(list.length - live.length)})` : ''), 'text-blue-700'],
      ['মোট আদায়', '৳ ' + fmt(paid), 'text-emerald-600'],
      ['মোট বকেয়া', '৳ ' + fmt(due), 'text-rose-600'],
      ['মোট ছাড়', '৳ ' + fmt(disc), 'text-amber-600'],
      ['টাকা দিয়েছে (জন)', this.bnNum(uniq), 'text-indigo-600']
    ].map(k => `<div class="modern-card p-3"><div class="text-xs text-slate-500">${k[0]}</div><div class="text-lg font-extrabold ${k[2]}">${k[1]}</div></div>`).join('')
      + `<div class="col-span-2 md:col-span-5 text-[11px] text-slate-500 px-1">মাধ্যম অনুযায়ী: ${Object.keys(byMethod).length ? Object.entries(byMethod).map(([m, v]) => `<b>${this.esc(m)}</b> ৳${fmt(v)}`).join(' • ') : '—'}</div>`;

    if (view === 'matrix') {
      const cls = document.getElementById('fl-class')?.value || 'ALL';
      const q = (document.getElementById('fl-search')?.value || '').trim().toLowerCase();
      const roster = this.students
        .filter(s => s.session === this.session)
        .filter(s => cls === 'ALL' || s.cls === cls)
        .filter(s => !q || [s.uid, s.nameBn, s.nameEn].some(x => String(x || '').toLowerCase().includes(q)))
        .sort((a, b) => Number(a.cls) - Number(b.cls) || String(a.group).localeCompare(String(b.group)) || a.roll - b.roll);
      const sums = new Map(), dues = new Map();
      this.fees.filter(f => f.session === this.session && !f.voided).forEach(f => {
        const k = f.uid + '|' + f.month;
        sums.set(k, (sums.get(k) || 0) + this._feePaid(f));
        dues.set(k, (dues.get(k) || 0) + this._feeDue(f));
      });
      const monthTotals = Array(12).fill(0);
      const rowsHtml = roster.map((s, i) => {
        let rowTotal = 0;
        const cells = this.MONTHS_BN.map((_, mi) => {
          const k = s.uid + '|' + (mi + 1);
          const v = sums.get(k) || 0, d = dues.get(k) || 0;
          rowTotal += v; monthTotals[mi] += v;
          if (d) return `<td class="text-right font-mono font-bold bg-amber-50 text-amber-800" title="বকেয়া ৳${d}">${fmt(v)}*</td>`;
          return v ? `<td class="text-right font-mono font-bold bg-emerald-50 text-emerald-800">${fmt(v)}</td>` : `<td class="text-center text-slate-300">—</td>`;
        }).join('');
        return `<tr><td class="text-center">${i + 1}</td><td class="text-center font-bold">${s.roll}</td><td class="font-mono">${s.uid}</td><td class="font-semibold whitespace-nowrap">${this.esc(s.nameBn)}</td><td class="whitespace-nowrap">${CLASS_LABELS_BN[s.cls]}</td>${cells}<td class="text-right font-mono font-extrabold text-blue-800">${fmt(rowTotal)}</td></tr>`;
      }).join('');
      body.innerHTML = `
        <table id="fl-table" class="w-full text-xs border-collapse formal-table">
          <thead><tr><th>#</th><th>রোল</th><th>আইডি</th><th>নাম</th><th>শ্রেণী</th>${this.MONTHS_BN.map(m => `<th>${m.slice(0, 4)}</th>`).join('')}<th>মোট ৳</th></tr></thead>
          <tbody>${rowsHtml || `<tr><td colspan="18" class="text-center text-slate-400 py-8">কোনো শিক্ষার্থী নেই</td></tr>`}</tbody>
          <tfoot><tr class="font-extrabold bg-blue-50"><td colspan="5" class="text-right">মাস অনুযায়ী মোট আদায়:</td>${monthTotals.map(v => `<td class="text-right font-mono">${v ? fmt(v) : '—'}</td>`).join('')}<td class="text-right font-mono">${fmt(monthTotals.reduce((a, b) => a + b, 0))}</td></tr></tfoot>
        </table>
        <div class="text-[11px] text-slate-500 p-2">* চিহ্নিত ঘরে বকেয়া আছে (ঘরের উপর মাউস রাখলে পরিমাণ দেখা যাবে)। বাতিল রশিদ হিসাবে ধরা হয়নি।</div>`;
      return;
    }

    const rowsHtml = list.map((f, i) => {
      const v = !!f.voided;
      const fd = this._feeDue(f);
      return `
      <tr class="${v ? 'opacity-50 line-through' : ''}">
        <td class="text-center">${i + 1}</td>
        <td class="whitespace-nowrap">${new Date(f.date + 'T00:00:00').toLocaleDateString('bn-BD')}</td>
        <td class="font-mono font-bold">${this.esc(f.receiptNo)}</td>
        <td class="font-mono">${f.uid}</td>
        <td class="font-semibold whitespace-nowrap">${this.esc(f.nameBn)}</td>
        <td class="whitespace-nowrap">${CLASS_LABELS_BN[f.cls]} • রোল ${f.roll}</td>
        <td class="font-bold">${this.MONTHS_BN[f.month - 1]}</td>
        <td>${(f.items || []).map(x => `${this.esc(x.head)}${x.desc ? ' (' + this.esc(x.desc) + ')' : ''}: ${fmt(x.amount)}`).join('; ')}</td>
        <td class="text-right font-mono">${fmt(this._feeGross(f))}</td>
        <td class="text-right font-mono text-amber-700">${this._feeDisc(f) ? fmt(this._feeDisc(f)) : '—'}</td>
        <td class="text-right font-mono font-extrabold text-emerald-700">${fmt(v ? 0 : this._feePaid(f))}</td>
        <td class="text-right font-mono font-bold ${fd ? 'text-rose-600' : 'text-slate-400'}">${fd ? fmt(fd) : '—'}</td>
        <td class="whitespace-nowrap">${this.esc(f.method || '—')}${f.receivedBy ? '<br><span class="text-[10px] text-slate-500">' + this.esc(f.receivedBy) + '</span>' : ''}</td>
        <td class="text-center no-print whitespace-nowrap">
          ${v ? `<span class="text-rose-600 font-bold no-underline" title="${this.esc(f.voidReason || '')}">বাতিল</span>`
            : `<button onclick="App.reprintFeeRecord('${f.id}')" class="text-blue-700 font-bold hover:underline">🖨 প্রিন্ট</button> <button onclick="App.voidFeeRecord('${f.id}')" class="text-rose-600 font-bold hover:underline">বাতিল</button>`}
        </td>
      </tr>`;
    }).join('');
    body.innerHTML = `
      <table id="fl-table" class="w-full text-xs border-collapse formal-table">
        <thead><tr><th>#</th><th>তারিখ</th><th>রশিদ নং</th><th>আইডি</th><th>নাম</th><th>শ্রেণী</th><th>মাস</th><th>খাত ও বিবরণ</th><th>মোট ফি</th><th>ছাড়</th><th>জমা ৳</th><th>বকেয়া</th><th>মাধ্যম</th><th class="no-print">অ্যাকশন</th></tr></thead>
        <tbody>${rowsHtml || `<tr><td colspan="14" class="text-center text-slate-400 py-8">কোনো পেমেন্ট রেকর্ড নেই — রশিদ তৈরি করে "সংরক্ষণ" চাপুন</td></tr>`}</tbody>
        <tfoot><tr class="font-extrabold bg-blue-50"><td colspan="8" class="text-right">সর্বমোট (বাতিল বাদে):</td><td class="text-right font-mono">${fmt(live.reduce((a, f) => a + this._feeGross(f), 0))}</td><td class="text-right font-mono">${fmt(disc)}</td><td class="text-right font-mono">${fmt(paid)}</td><td class="text-right font-mono">${fmt(due)}</td><td colspan="2" class="no-print"></td></tr></tfoot>
      </table>`;
  },

  /* রেকর্ড মুছে না ফেলে "বাতিল" চিহ্ন দেওয়া হয় — ফলে হিসাবের স্বচ্ছতা থাকে, কারণ লেখা থাকে */
  async voidFeeRecord(id) {
    const f = this.fees.find(x => x.id === id);
    if (!f || f.voided) return;
    if (!(await this.checkAdminPin())) return;
    const reason = ((await this.promptBox(`রশিদ ${f.receiptNo} (${f.nameBn}) বাতিলের কারণ লিখুন (আবশ্যক):`, '', { title: 'রশিদ বাতিল', icon: '🧾', danger: true, confirmText: 'বাতিল করুন', cancelText: 'ফিরে যান' })) || '').trim();
    if (!reason) return this.toast('কারণ ছাড়া রশিদ বাতিল করা যাবে না।', 'warn');
    f.voided = true; f.voidReason = reason; f.voidAt = new Date().toISOString();
    await this.db.put('fees', f);
    this.renderFeeLedger();
    if (this.currentCertType === 'receipt') this.renderFeeMultiList();
    this.toast(`রশিদ ${f.receiptNo} বাতিল করা হয়েছে (রেকর্ড সংরক্ষিত আছে)।`, 'warn');
  },

  exportFeeLedgerExcel() {
    const view = document.getElementById('fl-view')?.value || 'list';
    let rows;
    if (view === 'matrix') {
      const sums = new Map();
      this.fees.filter(f => f.session === this.session && !f.voided).forEach(f => {
        const k = f.uid + '|' + f.month;
        sums.set(k, (sums.get(k) || 0) + this._feePaid(f));
      });
      const cls = document.getElementById('fl-class')?.value || 'ALL';
      rows = this.students.filter(s => s.session === this.session && (cls === 'ALL' || s.cls === cls))
        .sort((a, b) => Number(a.cls) - Number(b.cls) || a.roll - b.roll)
        .map(s => {
          const r = { Class: s.cls, Group: s.group, Roll: s.roll, UID: s.uid, Name: s.nameBn };
          let t = 0;
          this.MONTHS_BN.forEach((m, i) => { const v = sums.get(s.uid + '|' + (i + 1)) || 0; r[m] = v; t += v; });
          r.Total = t;
          return r;
        });
    } else {
      rows = this.getLedgerFiltered().map(f => ({
        Date: f.date, ReceiptNo: f.receiptNo, UID: f.uid, Name: f.nameBn, Class: f.cls, Group: f.group, Roll: f.roll,
        Month: this.MONTHS_BN[f.month - 1],
        Items: (f.items || []).map(x => `${x.head}${x.desc ? ' (' + x.desc + ')' : ''}: ${x.amount}`).join('; '),
        Gross: this._feeGross(f), Discount: this._feeDisc(f), Paid: this._feePaid(f), Due: this._feeDue(f),
        Method: f.method || '', ReceivedBy: f.receivedBy || '', Note: f.note || '',
        Status: f.voided ? 'VOID: ' + (f.voidReason || '') : 'OK'
      }));
    }
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, view === 'matrix' ? 'Fee_Monthwise' : 'Fee_Payments');
    XLSX.writeFile(wb, `Fee_${view === 'matrix' ? 'Monthwise' : 'Payments'}_${this.session}.xlsx`);
  },
  printFeeLedger() {
    const view = document.getElementById('fl-view')?.value || 'list';
    const tbl = document.getElementById('fl-table');
    if (!tbl) return;
    const header = this.buildPrintSchoolHeader(`বেতন / ফি পেমেন্ট রেকর্ড — ${view === 'matrix' ? 'মাস অনুযায়ী ছক' : 'রশিদ তালিকা'} (${this.session})`);
    const clone = tbl.cloneNode(true);
    clone.querySelectorAll('.no-print').forEach(el => el.remove());
    this.printHTML(`<div style="padding:2mm">${header}${clone.outerHTML}</div>`, true);
  },

  initExtras() {
    window.addEventListener('resize', () => {
      document.querySelectorAll('.preview-zoom').forEach(el => this.fitPreview(el, el.dataset.landscape === '1'));
    });
    this.ensureCoreLibs();
  }
});

/* ==================== MODULE 11: QR SCAN ATTENDANCE (শুধু পরীক্ষার হাজিরা — আসা/যাওয়ার সময়সহ; মাসিক হাজিরা গ্রিড থেকে স্বতন্ত্র) ==================== */
Object.assign(App, {
  qrAtt: [], _qrStream: null, _qrRaf: 0, _qrFacing: 'environment', _qrLastText: '', _qrLastAt: 0, _qrBusy: false,
  _qrDet: null, _qrDetBusy: false, _qbSel: new Set(),

  todayStr() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; },
  nowTimeStr() { const d = new Date(); return [d.getHours(), d.getMinutes(), d.getSeconds()].map(n => String(n).padStart(2, '0')).join(':'); },

  beep(ok = true) {
    try {
      const C = window.AudioContext || window.webkitAudioContext; if (!C) return;
      this._ac = this._ac || new C();
      const o = this._ac.createOscillator(), g = this._ac.createGain();
      o.frequency.value = ok ? 880 : 300; o.type = 'sine'; g.gain.value = 0.15;
      o.connect(g); g.connect(this._ac.destination); o.start(); o.stop(this._ac.currentTime + (ok ? 0.12 : 0.3));
      if (navigator.vibrate) navigator.vibrate(ok ? 60 : [80, 60, 80]);
    } catch (e) {}
  },

  /* ---------- লাইব্রেরি লোডার: একটি CDN ব্যর্থ হলে পরের CDN / লোকাল ফাইল চেষ্টা করে ---------- */
  _loadScript(url) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = url; s.async = true;
      s.onload = () => resolve(url);
      s.onerror = () => { s.remove(); reject(new Error('load failed: ' + url)); };
      document.head.appendChild(s);
    });
  },

  async ensureLib(globalName, urls) {
    if (typeof window[globalName] !== 'undefined') return true;
    for (const u of urls) {
      try { await this._loadScript(u); } catch (e) { continue; }
      if (typeof window[globalName] !== 'undefined') return true;
    }
    return false;
  },

  ensureJsQR() {
    return this.ensureLib('jsQR', [
      'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js',
      'https://unpkg.com/jsqr@1.4.0/dist/jsQR.js',
      'https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.js',
      'jsQR.js', 'lib/jsQR.js'
    ]);
  },

  async ensureCoreLibs() {
    let changed = false;
    const need = [
      ['QRCode', ['https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js', 'https://unpkg.com/qrcodejs@1.0.0/qrcode.min.js', 'qrcode.min.js']],
      ['JsBarcode', ['https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.11.6/JsBarcode.all.min.js', 'https://unpkg.com/jsbarcode@3.11.6/dist/JsBarcode.all.min.js', 'JsBarcode.all.min.js']],
      ['XLSX', ['https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js', 'https://unpkg.com/xlsx@0.18.5/dist/xlsx.full.min.js', 'xlsx.full.min.js']]
    ];
    for (const [g, urls] of need) {
      if (typeof window[g] !== 'undefined') continue;
      if (await this.ensureLib(g, urls)) changed = true;
    }
    if (changed) this.syncAllUI();
  },

  /* ---------- ক্যামেরা স্ক্যান ---------- */
  async startQrScan() {
    if (this._qrStream) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return this.toast('এই ব্রাউজারে ক্যামেরা সাপোর্ট নেই। HTTPS অথবা localhost-এ চালান।', 'error');
    }

    // ১) ব্রাউজারের নিজস্ব QR ডিটেক্টর (লাইব্রেরি ছাড়াই) — থাকলে সেটাই ব্যবহার হবে
    this._qrDet = null;
    if ('BarcodeDetector' in window) {
      try {
        const fm = await window.BarcodeDetector.getSupportedFormats();
        if (fm.includes('qr_code')) this._qrDet = new window.BarcodeDetector({ formats: ['qr_code'] });
      } catch (e) { this._qrDet = null; }
    }
    // ২) না থাকলে jsQR — একাধিক CDN ও লোকাল ফাইল থেকে লোড করার চেষ্টা
    if (!this._qrDet) {
      if (typeof jsQR === 'undefined') this.toast('QR রিডার লাইব্রেরি লোড হচ্ছে… একটু অপেক্ষা করুন', 'warn');
      const ok = await this.ensureJsQR();
      if (!ok) {
        return this.toast('QR রিডার লাইব্রেরি (jsQR) লোড হয়নি — ইন্টারনেট দেখুন, অথবা jsQR.js ফাইলটি index.html-এর পাশে রাখুন। ক্যামেরা ছাড়াও আইডি লিখে বা নিচের ক্লাস লিস্ট থেকে টিক দিয়ে হাজিরা দিতে পারবেন।', 'error');
      }
    }

    try {
      this._qrStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: this._qrFacing }, width: { ideal: 1280 } }, audio: false });
      const v = document.getElementById('qr-video');
      v.srcObject = this._qrStream; await v.play();
      document.getElementById('qr-idle').classList.add('hidden');
      document.getElementById('qr-start-btn').classList.add('hidden');
      document.getElementById('qr-stop-btn').classList.remove('hidden');
      this._qrLoop();
    } catch (err) {
      if (this._qrStream) { this._qrStream.getTracks().forEach(t => t.stop()); }
      this._qrStream = null;
      const n = err && err.name;
      const msg = n === 'NotAllowedError' || n === 'SecurityError' ? 'ক্যামেরার অনুমতি (Allow) দিন — ব্রাউজারের অ্যাড্রেস বারের ক্যামেরা আইকন থেকে।'
        : n === 'NotFoundError' || n === 'OverconstrainedError' ? 'এই ডিভাইসে কোনো ক্যামেরা পাওয়া যায়নি।'
        : n === 'NotReadableError' ? 'ক্যামেরাটি অন্য কোনো অ্যাপ/ট্যাব ব্যবহার করছে — সেটি বন্ধ করে আবার চেষ্টা করুন।'
        : (window.isSecureContext === false ? 'ক্যামেরার জন্য HTTPS অথবা localhost দরকার।' : 'ক্যামেরা চালু করা যায়নি।');
      this.toast(msg, 'error');
    }
  },

  stopQrScan() {
    cancelAnimationFrame(this._qrRaf);
    if (this._qrStream) { this._qrStream.getTracks().forEach(t => t.stop()); this._qrStream = null; }
    const v = document.getElementById('qr-video'); if (v) v.srcObject = null;
    const idle = document.getElementById('qr-idle'); if (idle) idle.classList.remove('hidden');
    const s1 = document.getElementById('qr-start-btn'), s2 = document.getElementById('qr-stop-btn');
    if (s1) s1.classList.remove('hidden');
    if (s2) s2.classList.add('hidden');
  },

  async switchQrCamera() {
    this._qrFacing = this._qrFacing === 'environment' ? 'user' : 'environment';
    if (this._qrStream) { this.stopQrScan(); await this.startQrScan(); }
  },

  _qrLoop() {
    const v = document.getElementById('qr-video'), cv = document.getElementById('qr-canvas');
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    let last = 0;
    const tick = async (t) => {
      if (!this._qrStream) return;
      if (t - last > 110 && v.readyState >= 2 && v.videoWidth) {
        last = t;
        let text = '';
        try {
          if (this._qrDet) {
            if (!this._qrDetBusy) {
              this._qrDetBusy = true;
              try {
                const codes = await this._qrDet.detect(v);
                if (codes && codes.length) text = codes[0].rawValue || '';
              } finally { this._qrDetBusy = false; }
            }
          } else if (typeof jsQR === 'function') {
            const sc = Math.min(1, 720 / v.videoWidth);
            cv.width = Math.round(v.videoWidth * sc); cv.height = Math.round(v.videoHeight * sc);
            ctx.drawImage(v, 0, 0, cv.width, cv.height);
            const img = ctx.getImageData(0, 0, cv.width, cv.height);
            const code = jsQR(img.data, cv.width, cv.height, { inversionAttempts: 'dontInvert' });
            if (code && code.data) text = code.data;
          }
        } catch (e) {}
        if (text) this._onQrText(text);
      }
      if (this._qrStream) this._qrRaf = requestAnimationFrame(tick);
    };
    this._qrRaf = requestAnimationFrame(tick);
  },

  _onQrText(text) {
    const now = Date.now();
    if (text !== this._qrLastText || now - this._qrLastAt > 3000) {
      this._qrLastText = text; this._qrLastAt = now;
      this.markQrAttendance(text, 'QR');
    }
  },

  parseQrUid(text) {
    const t = String(text || '').trim();
    let m = /ID:([^|\s]+)/i.exec(t); if (m) return m[1];
    const parts = t.split('|').map(x => x.trim());
    const hit = parts.find(p => this.students.some(s => s.uid === p));
    return hit || t;
  },

  /* ---------- হাজিরা রেকর্ডিং (আসা/যাওয়ার লগসহ) ---------- */
  _qrCtx() {
    const g = (id) => document.getElementById(id);
    return {
      date: g('qr-date')?.value || this.todayStr(),
      exam: g('qr-exam')?.value || 'Half-Yearly',
      note: (g('qr-note')?.value || '').trim(),
      mode: g('qr-mode')?.value || 'inout',
      gap: Math.max(0, parseFloat(g('qr-gap')?.value || '1') || 0),
      lateAfter: g('qr-late')?.value || '10:00'
    };
  },

  _toSec(t) { const p = String(t || '0:0:0').split(':').map(Number); return (p[0] || 0) * 3600 + (p[1] || 0) * 60 + (p[2] || 0); },

  _normalizeQrRec(rec) {
    if (!Array.isArray(rec.logs) || !rec.logs.length) rec.logs = [{ type: 'IN', time: rec.time, via: rec.via || 'QR' }];
    if (!rec.inTime) rec.inTime = rec.time;
    if (rec.outTime === undefined) rec.outTime = '';
    if (rec.inside === undefined) rec.inside = true;
    if (!rec.exam) rec.exam = 'Half-Yearly';
    return rec;
  },

  _qrId(date, exam, uid) { return `${this.session}_${date}_${exam}_${uid}`; },

  _findQrRec(date, exam, uid) {
    return this.qrAtt.find(x => x.session === this.session && x.date === date && (x.exam || 'Half-Yearly') === exam && x.uid === uid);
  },

  /** একজনের স্ক্যান/ম্যানুয়াল এন্ট্রি: প্রথমবার = IN, পরেরবার = OUT, তার পরেরবার = আবার IN ... */
  async recordQrScan(uid, via = 'QR', opts = {}) {
    const stu = this.students.find(s => s.session === this.session && s.uid === uid);
    if (!stu) return { kind: 'error', stu: null, msg: `চেনা যায়নি: "${String(opts.raw || uid).slice(0, 40)}" — এই শিক্ষাবর্ষে এমন কোনো শিক্ষার্থী নেই` };
    const c = this._qrCtx();
    const now = opts.time || this.nowTimeStr();
    let rec = this._findQrRec(c.date, c.exam, uid);

    if (!rec) {
      rec = {
        id: this._qrId(c.date, c.exam, uid), session: this.session, date: c.date, exam: c.exam, note: c.note,
        uid, cls: stu.cls, group: stu.group, roll: stu.roll, nameBn: stu.nameBn, nameEn: stu.nameEn,
        time: now, inTime: now, outTime: '', inside: true,
        status: now.slice(0, 5) > c.lateAfter ? 'Late' : 'P', via, logs: [{ type: 'IN', time: now, via }]
      };
      await this.db.put('qrattendance', rec);
      this.qrAtt.push(rec);
      return { kind: rec.status === 'Late' ? 'late' : 'ok', stu, rec, changed: true,
        msg: rec.status === 'Late' ? `দেরিতে উপস্থিত — ${now}` : `উপস্থিতি গৃহীত — ${now}` };
    }

    this._normalizeQrRec(rec);
    if (c.mode === 'in') return { kind: 'warn', stu, rec, msg: `ইতোমধ্যে হাজিরা দেওয়া হয়েছে (${rec.inTime})` };

    const last = rec.logs[rec.logs.length - 1];
    let secs = this._toSec(now) - this._toSec(last.time);
    if (secs < 0) secs = 1e9;
    if (!opts.force && secs < c.gap * 60) {
      return { kind: 'warn', stu, rec, msg: `এইমাত্র স্ক্যান হয়েছে (${secs} সেকেন্ড আগে)। আবার স্ক্যানের জন্য অন্তত ${c.gap} মিনিট অপেক্ষা করুন।` };
    }
    const type = last.type === 'IN' ? 'OUT' : 'IN';
    rec.logs.push({ type, time: now, via });
    if (type === 'OUT') { rec.outTime = now; rec.inside = false; } else { rec.inside = true; }
    await this.db.put('qrattendance', rec);
    return { kind: type === 'OUT' ? 'out' : 'back', stu, rec, changed: true,
      msg: type === 'OUT' ? `পরীক্ষা কক্ষ থেকে বের হয়েছে — ${now}` : `আবার প্রবেশ করেছে — ${now}` };
  },

  async markQrAttendance(text, via = 'QR') {
    if (this._qrBusy) return;
    this._qrBusy = true;
    try {
      const uid = this.parseQrUid(text);
      const res = await this.recordQrScan(uid, via, { raw: text });
      this.beep(!(res.kind === 'error' || res.kind === 'warn'));
      this.showQrResult(res.kind, res.stu, res.msg, res.rec);
      if (res.changed) this.renderQrAttendance();
    } finally { this._qrBusy = false; }
  },

  manualQrEntry() {
    const el = document.getElementById('qr-manual'); const v = el.value.trim(); if (!v) return;
    this.markQrAttendance(v, 'Manual'); el.value = ''; el.focus();
  },

  showQrResult(kind, stu, msg, rec) {
    const box = document.getElementById('qr-result'); if (!box) return;
    const st = {
      ok: ['bg-emerald-600', '✔ উপস্থিত (IN)'], late: ['bg-amber-500', '⏰ দেরিতে উপস্থিত (IN)'],
      out: ['bg-indigo-600', '↗ বের হয়েছে (OUT)'], back: ['bg-teal-600', '↩ আবার প্রবেশ (IN)'],
      warn: ['bg-sky-600', 'ℹ আগেই স্ক্যান হয়েছে'], error: ['bg-rose-600', '✖ ব্যর্থ']
    }[kind] || ['bg-slate-600', ''];
    const times = rec ? `<div class="text-xs font-mono mt-1 opacity-95">IN: ${rec.inTime || rec.time} &nbsp;|&nbsp; OUT: ${rec.outTime || '—'}</div>` : '';
    box.innerHTML = `
      <div class="${st[0]} text-white rounded-2xl p-4 flex items-center gap-4 animate-section">
        ${stu ? `<img src="${stu.photo || ''}" class="w-20 h-24 object-cover rounded-xl border-2 border-white/70 bg-white" />` : `<div class="w-20 h-24 rounded-xl bg-white/20 flex items-center justify-center text-4xl">?</div>`}
        <div class="min-w-0">
          <div class="text-xs font-bold opacity-90">${st[1]}</div>
          ${stu ? `<div class="text-xl font-extrabold leading-tight">${this.esc(stu.nameBn)}</div>
          <div class="text-sm opacity-95">${CLASS_LABELS_BN[stu.cls]} • ${GROUP_LABELS_BN[stu.group]} • রোল ${stu.roll}</div>
          <div class="text-xs font-mono opacity-90 mt-0.5">ID: ${stu.uid}</div>` : ''}
          <div class="text-sm font-bold mt-1">${this.esc(msg)}</div>
          ${times}
        </div>
      </div>`;
  },

  /* ---------- দৈনিক ডেটা ও রিপোর্ট ---------- */
  _qrDayData() {
    const c = this._qrCtx();
    const cls = document.getElementById('qr-f-class')?.value || 'ALL';
    const roster = this.students.filter(s => s.session === this.session && (cls === 'ALL' || s.cls === cls))
      .sort((a, b) => Number(a.cls) - Number(b.cls) || String(a.group).localeCompare(b.group) || a.roll - b.roll);
    const recs = this.qrAtt.filter(x => x.session === this.session && x.date === c.date && (x.exam || 'Half-Yearly') === c.exam);
    recs.forEach(r => this._normalizeQrRec(r));
    const byUid = new Map(recs.map(r => [r.uid, r]));
    const present = roster.filter(s => byUid.has(s.uid)).map(s => ({ s, r: byUid.get(s.uid) })).sort((a, b) => b.r.inTime.localeCompare(a.r.inTime));
    const absent = roster.filter(s => !byUid.has(s.uid));
    const out = present.filter(p => !p.r.inside);
    return { date: c.date, exam: c.exam, roster, present, absent, out };
  },

  renderQrAttendance() {
    const dEl = document.getElementById('qr-date'); if (!dEl) return;
    if (!dEl.value) dEl.value = this.todayStr();
    const view = document.getElementById('qr-f-view').value;
    const { roster, present, absent, out } = this._qrDayData();
    const late = present.filter(p => p.r.status === 'Late').length;
    const rate = roster.length ? ((present.length / roster.length) * 100).toFixed(1) : '0.0';
    document.getElementById('qr-kpi').innerHTML = [
      ['মোট শিক্ষার্থী', roster.length, 'text-blue-700'], ['উপস্থিত', present.length, 'text-emerald-600'],
      ['দেরিতে', late, 'text-amber-600'], ['অনুপস্থিত', absent.length, 'text-rose-600'],
      ['বের হয়ে আছে', out.length, 'text-indigo-600'], ['উপস্থিতির হার', rate + '%', 'text-teal-600']
    ].map(k => `<div class="modern-card p-3"><div class="text-xs text-slate-500">${k[0]}</div><div class="text-2xl font-extrabold ${k[2]}">${k[1]}</div></div>`).join('');

    const thead = document.getElementById('qr-thead');
    const logTitle = (r) => this.esc(r.logs.map(l => `${l.type} ${l.time}`).join(' → '));
    const presentRow = ({ s, r }, i) => `<tr><td class="text-center">${i + 1}</td><td class="text-center font-bold">${s.roll}</td><td class="font-mono">${s.uid}</td><td class="font-semibold">${this.esc(s.nameBn)}</td><td>${CLASS_LABELS_BN[s.cls]} (${GROUP_LABELS_BN[s.group]})</td>
      <td class="text-center font-mono font-bold text-emerald-700">${r.inTime}</td>
      <td class="text-center font-mono font-bold ${r.outTime ? 'text-indigo-700' : 'text-slate-400'}">${r.outTime || '—'}</td>
      <td class="text-center"><span class="px-2 py-0.5 rounded-full text-[11px] font-bold ${r.status === 'Late' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">${r.status === 'Late' ? 'দেরি' : 'উপস্থিত'}</span>
        <span class="px-2 py-0.5 rounded-full text-[11px] font-bold ${r.inside ? 'bg-sky-100 text-sky-800' : 'bg-indigo-100 text-indigo-800'}">${r.inside ? 'ভেতরে' : 'বাইরে'}</span></td>
      <td class="text-center text-slate-500" title="${logTitle(r)}">${r.logs.length} স্ক্যান • ${this.esc(r.via)}</td>
      <td class="text-center no-print"><button onclick="App.deleteQrRecord('${r.id}')" class="text-rose-600 font-bold text-xs hover:underline">মুছুন</button></td></tr>`;

    let rows;
    if (view === 'absent') {
      thead.innerHTML = '<tr><th>#</th><th>রোল</th><th>আইডি</th><th>নাম</th><th>শ্রেণী ও বিভাগ</th><th>মোবাইল</th><th>অবস্থা</th><th></th><th class="no-print">অ্যাকশন</th></tr>';
      rows = absent.map((s, i) => `<tr><td class="text-center">${i + 1}</td><td class="text-center font-bold">${s.roll}</td><td class="font-mono">${s.uid}</td><td class="font-semibold">${this.esc(s.nameBn)}</td><td>${CLASS_LABELS_BN[s.cls]} (${GROUP_LABELS_BN[s.group]})</td><td class="font-mono">${s.mobile || '-'}</td><td class="text-center"><span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">অনুপস্থিত</span></td><td></td><td class="text-center no-print"><button onclick="App.markQrAttendance('${s.uid}','Manual')" class="text-emerald-700 font-bold text-xs hover:underline">উপস্থিত দিন</button></td></tr>`).join('');
    } else {
      thead.innerHTML = '<tr><th>#</th><th>রোল</th><th>আইডি</th><th>নাম</th><th>শ্রেণী ও বিভাগ</th><th>আসার সময় (IN)</th><th>যাওয়ার সময় (OUT)</th><th>অবস্থা</th><th>স্ক্যান / মাধ্যম</th><th class="no-print">অ্যাকশন</th></tr>';
      rows = (view === 'out' ? out : present).map(presentRow).join('');
    }
    document.getElementById('qr-table-body').innerHTML = rows || `<tr><td colspan="10" class="text-center text-slate-400 py-8">কোনো তথ্য নেই</td></tr>`;
    this.renderQrBulkList();
  },

  /* ---------- ক্লাস লিস্ট থেকে টিক-মার্ক করে একসাথে অনেকের হাজিরা ---------- */
  _qbList() {
    const cls = document.getElementById('qb-class')?.value || '6';
    const grp = document.getElementById('qb-group')?.value || 'ALL';
    const q = (document.getElementById('qb-search')?.value || '').trim();
    return this.getFilteredStudents(cls, grp, q);
  },

  renderQrBulkList() {
    const body = document.getElementById('qb-body'); if (!body) return;
    const c = this._qrCtx();
    const list = this._qbList();
    const byUid = new Map(this.qrAtt
      .filter(x => x.session === this.session && x.date === c.date && (x.exam || 'Half-Yearly') === c.exam)
      .map(r => [r.uid, this._normalizeQrRec(r)]));
    body.innerHTML = list.map(s => {
      const r = byUid.get(s.uid);
      const st = !r ? '<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">অনুপস্থিত</span>'
        : r.inside ? `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">উপস্থিত • IN ${r.inTime.slice(0, 5)}</span>`
        : `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800">বের হয়েছে • OUT ${r.outTime.slice(0, 5)}</span>`;
      return `<tr class="cursor-pointer" onclick="App.qbRowClick(event,'${s.uid}')">
        <td class="text-center"><input type="checkbox" class="qb-chk w-4 h-4" data-uid="${s.uid}" ${this._qbSel.has(s.uid) ? 'checked' : ''} onchange="App.qbToggle('${s.uid}',this.checked)" /></td>
        <td class="text-center font-bold">${s.roll}</td><td class="font-mono">${s.uid}</td><td class="font-semibold">${this.esc(s.nameBn)}</td>
        <td>${GROUP_LABELS_BN[s.group] || s.group}</td><td>${st}</td></tr>`;
    }).join('') || `<tr><td colspan="6" class="text-center text-slate-400 py-6">এই শ্রেণী/বিভাগে কোনো শিক্ষার্থী নেই</td></tr>`;
    this._qbUpdateCount();
  },

  _qbUpdateCount() {
    const el = document.getElementById('qb-count');
    if (el) el.textContent = `${this._qbSel.size} জন নির্বাচিত`;
    const all = document.getElementById('qb-all');
    if (all) {
      const list = this._qbList();
      all.checked = list.length > 0 && list.every(s => this._qbSel.has(s.uid));
    }
  },

  qbRowClick(ev, uid) {
    if (ev.target && ev.target.tagName === 'INPUT') return;
    this.qbToggle(uid, !this._qbSel.has(uid));
    const cb = document.querySelector(`.qb-chk[data-uid="${uid}"]`);
    if (cb) cb.checked = this._qbSel.has(uid);
  },

  qbToggle(uid, on) {
    if (on) this._qbSel.add(uid); else this._qbSel.delete(uid);
    this._qbUpdateCount();
  },

  qbToggleAll(on) {
    this._qbList().forEach(s => { if (on) this._qbSel.add(s.uid); else this._qbSel.delete(s.uid); });
    this.renderQrBulkList();
  },

  qbSelectAbsent() {
    const c = this._qrCtx();
    const present = new Set(this.qrAtt.filter(x => x.session === this.session && x.date === c.date && (x.exam || 'Half-Yearly') === c.exam).map(x => x.uid));
    this._qbList().forEach(s => { if (!present.has(s.uid)) this._qbSel.add(s.uid); });
    this.renderQrBulkList();
  },

  qbClear() { this._qbSel.clear(); this.renderQrBulkList(); },

  async qbMark(type) {
    const uids = [...this._qbSel];
    if (!uids.length) return this.toast('আগে তালিকা থেকে শিক্ষার্থী টিক (✔) চিহ্ন দিয়ে নির্বাচন করুন!', 'warn');
    const c = this._qrCtx();
    const tv = (document.getElementById('qb-time')?.value || '').trim();
    const time = tv ? (tv.length === 5 ? tv + ':00' : tv) : this.nowTimeStr();
    let done = 0, skipped = 0, noIn = 0;
    const toSave = [];
    for (const uid of uids) {
      const stu = this.students.find(s => s.session === this.session && s.uid === uid);
      if (!stu) continue;
      let rec = this._findQrRec(c.date, c.exam, uid);
      if (type === 'IN') {
        if (!rec) {
          rec = {
            id: this._qrId(c.date, c.exam, uid), session: this.session, date: c.date, exam: c.exam, note: c.note,
            uid, cls: stu.cls, group: stu.group, roll: stu.roll, nameBn: stu.nameBn, nameEn: stu.nameEn,
            time, inTime: time, outTime: '', inside: true, status: time.slice(0, 5) > c.lateAfter ? 'Late' : 'P', via: 'Bulk',
            logs: [{ type: 'IN', time, via: 'Bulk' }]
          };
          this.qrAtt.push(rec); toSave.push(rec); done++;
        } else {
          this._normalizeQrRec(rec);
          if (rec.inside) { skipped++; continue; }
          rec.logs.push({ type: 'IN', time, via: 'Bulk' }); rec.inside = true; toSave.push(rec); done++;
        }
      } else {
        if (!rec) { noIn++; continue; }
        this._normalizeQrRec(rec);
        if (!rec.inside) { skipped++; continue; }
        rec.logs.push({ type: 'OUT', time, via: 'Bulk' }); rec.outTime = time; rec.inside = false; toSave.push(rec); done++;
      }
    }
    if (toSave.length) await this.db.bulkPut('qrattendance', toSave);
    this._qbSel.clear();
    this.renderQrAttendance();
    const label = type === 'IN' ? 'উপস্থিত (IN)' : 'বের হয়েছে (OUT)';
    let msg = `✔ ${done} জনকে ${label} হিসেবে সংরক্ষণ করা হয়েছে`;
    if (skipped) msg += ` • ${skipped} জন আগে থেকেই ঐ অবস্থায়`;
    if (noIn) msg += ` • ${noIn} জনের IN নেই (আগে উপস্থিত দিন)`;
    this.toast(msg, done ? 'success' : 'warn');
  },

  async deleteQrRecord(id) {
    if (!(await this.checkAdminPin())) return;
    if (!(await this.confirmBox('এই স্ক্যান হাজিরা রেকর্ডটি মুছে ফেলবেন?', { title: 'হাজিরা রেকর্ড মুছুন', danger: true, confirmText: 'মুছে ফেলুন' }))) return;
    await this.db.delete('qrattendance', id);
    this.qrAtt = this.qrAtt.filter(x => x.id !== id);
    this.renderQrAttendance(); this.toast('রেকর্ড মুছে ফেলা হয়েছে');
  },

  exportQrAttendanceExcel() {
    const { date, exam, present, absent } = this._qrDayData();
    const rowsP = present.map(({ s, r }) => ({ Date: date, Exam: exam, Class: s.cls, Group: s.group, Roll: s.roll, UID: s.uid, Name: s.nameBn, In: r.inTime, Out: r.outTime || '', Scans: r.logs.length, Status: r.status === 'Late' ? 'Late' : 'Present', Inside: r.inside ? 'Yes' : 'No', Via: r.via }));
    const rowsA = absent.map(s => ({ Date: date, Exam: exam, Class: s.cls, Group: s.group, Roll: s.roll, UID: s.uid, Name: s.nameBn, In: '', Out: '', Scans: 0, Status: 'Absent', Inside: '', Via: '' }));
    const ws = XLSX.utils.json_to_sheet([...rowsP, ...rowsA]);
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'QR_Attendance');
    XLSX.writeFile(wb, `QR_Attendance_${date}_${exam}.xlsx`);
  },

  printQrAttendance() {
    const view = document.getElementById('qr-f-view').value;
    const { date, exam } = this._qrDayData();
    const vlabel = view === 'present' ? 'উপস্থিত তালিকা' : view === 'out' ? 'বের হয়ে থাকা তালিকা' : 'অনুপস্থিত তালিকা';
    const header = this.buildPrintSchoolHeader(`পরীক্ষার QR হাজিরা রিপোর্ট — ${EXAM_LABELS_BN[exam] || exam} • ${date} (${vlabel})`);
    const tbl = document.getElementById('qr-table').cloneNode(true);
    tbl.querySelectorAll('.no-print').forEach(e => e.remove());
    this.printHTML(`<div style="padding:2mm">${header}${tbl.outerHTML}</div>`, false);
  }
});

/* ---- Excel (SheetJS) লাইব্রেরি লোড না থাকলে ক্র্যাশ না করে লোড করার চেষ্টা / বার্তা ---- */
['downloadStudentTemplate', 'importStudentsExcel', 'exportStudentsExcel', 'exportAttendanceExcel', 'importAttendanceExcel',
 'exportMarksExcel', 'importMarksExcel', 'exportAgeListExcel', 'exportFeeLedgerExcel', 'exportQrAttendanceExcel'].forEach(name => {
  const orig = App[name];
  if (typeof orig !== 'function') return;
  App[name] = async function (...args) {
    if (typeof XLSX === 'undefined') {
      this.toast('Excel লাইব্রেরি লোড হচ্ছে… একটু অপেক্ষা করুন', 'warn');
      try { await this.ensureCoreLibs(); } catch (e) { /* ignore */ }
      if (typeof XLSX === 'undefined') {
        this.toast('Excel লাইব্রেরি (SheetJS) লোড হয়নি — ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।', 'error');
        return;
      }
    }
    return orig.apply(this, args);
  };
});

// মোবাইলে সাইডবার ডিফল্ট বন্ধ + ট্যাব বদলালে অটো বন্ধ
(function () {
  const orig = App.switchTab;
  App.switchTab = function (t) { orig.call(App, t); if (t === 'qratt') App.renderQrAttendance(); else App.stopQrScan(); if (window.innerWidth < 1024) document.body.classList.add('sidebar-collapsed'); };
})();
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { App.closeMarksheetPreview(); App.closeQuickMarkModal(); }
});
// মোবাইল/ট্যাবলেটে মেনু খোলা থাকলে বাইরে ট্যাপ করলে বন্ধ হবে (শুধু ছোট স্ক্রিনে)
document.addEventListener('click', (e) => {
  if (window.innerWidth >= 1024 || document.body.classList.contains('sidebar-collapsed')) return;
  if (e.target.closest('#app-sidebar') || e.target.closest('[onclick*="toggleSidebar"]')) return;
  document.body.classList.add('sidebar-collapsed');
});
window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth < 1024) document.body.classList.add('sidebar-collapsed');
  App.init();
});