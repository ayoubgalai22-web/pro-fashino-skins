// ==UserScript==
// @name         Justube Focus
// @namespace    https://github.com/ayoubgalai22-web/pro-fashino-skins
// @version      1.0.0
// @description  Focus layer for the real youtube.com: open Shorts as normal videos, keep autoplay off, optional hides (comments / related / end-screen). Zero network calls, zero data collection.
// @description:ar طبقة تركيز لموقع يوتيوب الحقيقي: تفتح Shorts كفيديو عادي، تُبقي التشغيل التلقائي مطفأً، وإخفاءات اختيارية (تعليقات/اقتراحات/شاشة النهاية). لا اتصالات شبكية ولا جمع بيانات إطلاقًا.
// @author       Justube Focus Kit (MIT)
// @match        https://www.youtube.com/*
// @match        https://m.youtube.com/*
// @run-at       document-start
// @grant        none
// @license      MIT
// ==/UserScript==

/*
 * كيف تثبته:
 *  - حاسوب: Tampermonkey (Chrome/Edge) أو Violentmonkey (Firefox) — أنشئ سكريبتًا
 *    جديدًا والصق هذا الملف كاملًا واحفظ.
 *  - Firefox Android: Violentmonkey (إن دعمه إصدارك)، وإلا اعتمد على قائمة الفلاتر
 *    filters/justube-focus.txt فهي تغطي أغلب الحالات بدون سكريبت.
 *  - Android + Kiwi Browser: Tampermonkey من Chrome Web Store.
 *
 * الأمان: هذا السكريبت يعمل محليًا داخل صفحات youtube.com فقط (@match أعلاه)،
 * ولا يرسل أي بيانات لأي خادم، ولا يستخدم أي مكتبات خارجية.
 */

(function () {
  'use strict';

  // ======================= الإعدادات =======================
  const CONFIG = {
    // تحويل أي رابط /shorts/<id> إلى /watch?v=<id> (فيديو عادي بنفس المحتوى)
    redirectShorts: true,

    // إطفاء زر التشغيل التلقائي في مشغّل الحاسوب إن كان مضاءً
    // (الإعداد يُحفظ في حسابك من YouTube نفسها بعد أول نقرة)
    disableAutoplay: true,

    // إخفاء قسم التعليقات في صفحة المشاهدة
    hideComments: false,

    // إخفاء عمود الاقتراحات المجاور (أقصى تركيز — أنت تبحث بنفسك)
    hideRelated: false,

    // إخفاء شبكة الفيديوهات التي تظهر داخل المشغّل بعد انتهاء الفيديو
    hideEndScreen: false,
  };
  // =========================================================

  const SHORTS_RE = /^\/shorts\/([A-Za-z0-9_-]{6,})/;

  function toWatchUrl(pathname, search) {
    const m = pathname.match(SHORTS_RE);
    if (!m) return null;
    return '/watch?v=' + encodeURIComponent(m[1]) + (search || '');
  }

  // ---------- 1) تحويل مسارات /shorts/ ----------
  function redirectIfShorts() {
    if (!CONFIG.redirectShorts) return;
    const target = toWatchUrl(location.pathname, location.search);
    if (target) {
      // replace حتى لا يبقى الـShort في سجل تنقل المتصفح (زر الرجوع لا يعيدك للدوامة)
      location.replace(target);
    }
  }

  // اعتراض النقرات على روابط Shorts قبل تنقل SPA الداخلي
  document.addEventListener(
    'click',
    function (ev) {
      if (!CONFIG.redirectShorts) return;
      const el = ev.target instanceof Element ? ev.target : null;
      if (!el) return;
      const a = el.closest('a[href^="/shorts/"], a[href*="youtube.com/shorts/"]');
      if (!a) return;
      let url;
      try {
        url = new URL(a.href, location.origin);
      } catch (_) {
        return;
      }
      const target = toWatchUrl(url.pathname, url.search);
      if (target) {
        ev.preventDefault();
        ev.stopPropagation();
        location.assign(target + url.hash);
      }
    },
    true
  );

  // تنقلات SPA داخل YouTube: الحدث الرسمي الذي تطلقه الصفحة + popstate
  window.addEventListener('yt-navigate-finish', redirectIfShorts, true);
  window.addEventListener('popstate', redirectIfShorts);

  // ---------- 2) إبقاء التشغيل التلقائي مطفأً ----------
  let autoplayTries = 0;
  function ensureAutoplayOff() {
    if (!CONFIG.disableAutoplay) return;
    if (!/^\/watch/.test(location.pathname)) {
      autoplayTries = 0;
      return;
    }
    const btn = document.querySelector('.ytp-autoplay-toggle-button');
    if (btn) {
      if (btn.getAttribute('aria-checked') === 'true') {
        btn.click(); // نقرة واحدة تكفي — YouTube تحفظها في حسابك
      }
      autoplayTries = 0;
    } else if (autoplayTries < 12) {
      // المشغّل يُحمّل بعد الصفحة؛ أعد المحاولة لمدة ~6 ثوانٍ
      autoplayTries += 1;
      setTimeout(ensureAutoplayOff, 500);
    }
  }

  window.addEventListener('yt-navigate-finish', ensureAutoplayOff, true);
  window.addEventListener('load', ensureAutoplayOff);

  // ---------- 3) إخفاءات اختيارية عبر CSS ----------
  function injectOptionalCss() {
    const rules = [];
    if (CONFIG.hideComments) {
      rules.push('ytd-comments { display: none !important; }');
      rules.push('ytm-comments-entry-point { display: none !important; }');
    }
    if (CONFIG.hideRelated) {
      rules.push('ytd-watch-next-secondary-results-renderer { display: none !important; }');
      rules.push('ytm-single-column-watch-next-results-renderer { display: none !important; }');
    }
    if (CONFIG.hideEndScreen) {
      rules.push('.html5-endscreen { display: none !important; }');
      rules.push('.html5-video-player.ended-mode .ytp-fullscreen-grid { display: none !important; }');
    }
    if (rules.length === 0) return;
    const style = document.createElement('style');
    style.textContent = '/* Justube Focus */\n' + rules.join('\n');
    (document.head || document.documentElement).appendChild(style);
  }

  // ---------- التشغيل ----------
  redirectIfShorts();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectOptionalCss);
  } else {
    injectOptionalCss();
  }
})();
