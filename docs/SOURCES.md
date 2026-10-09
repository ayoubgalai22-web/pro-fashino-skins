# المصادر والتراخيص — تم التحقق من كل مصدر يدويًا بتاريخ 2026-10-09

مبدأ الحزمة: **لا اختراع حلول عند وجود حل موثوق مُختبر مجتمعيًا**، مع الإسناد
واحترام التراخيص. كل ما في هذا المستودع إما (أ) تجميع/توثيق لمصادر مفتوحة
مذكورة أدناه، أو (ب) كود أصلي بسيط مكتوب هنا (السكريبت والمدقق) بترخيص MIT.

## قوائم الفلاتر (أساس `filters/justube-focus.txt`)

| المصدر | الترخيص | الحالة عند التحقق | ما أخذناه |
|---|---|---|---|
| [gijsdev/ublock-hide-yt-shorts](https://github.com/gijsdev/ublock-hide-yt-shorts) | MIT | ⭐2502، آخر دفع 2026-04-29، غير مؤرشف | قواعد www + m (شارة SHORTS، الرفوف، الشريط السفلي، التبويبات، الرقائق) |
| [i5heu/ublock-hide-yt-shorts](https://github.com/i5heu/ublock-hide-yt-shorts) | MIT | ⭐870، آخر دفع 2026-06-09، غير مؤرشف | قواعد نصية احتياطية، الإشعارات، الاشتراكات، Shorts Remix |
| [letsblock.it](https://letsblock.it) / وصفة "Filter out shorts" وقواعد [r/uBlockOrigin wiki](https://www.reddit.com/r/uBlockOrigin/wiki/solutions/youtube/) | فلاتر تجميلية مجتمعية | مرجع مجتمعي رئيسي | أنماط `:upward()` لأسطح home/subscriptions/search/watch-next/trending |
| قاعدة `uritransform` لتحويل /shorts/ | نقاش [Hacker News](https://news.ycombinator.com/item?id=47016443) (فبراير 2026) | خيار uBO رسمي ≥1.57 | تحويل مسار Shorts إلى watch |

**التعديلات التي أجريناها على ما جمعناه (موثقة للاشتراكين):**
1. إصلاح نطاق قاعدة الرقائق المتنقلة في gijsdev (كانت `www.youtube.com##ytm-chip-cloud-chip-renderer` — أضفنا نسخة `m.youtube.com` وأبقينا الأصلية).
2. إضافة قواعد معتمدة على الروابط `href^="/shorts"` و`href*="/shorts"` للشريط الجانبي وتبويبات القنوات — لا تنكسر مع الواجهات العربية/الفرنسية (القواعد الأصلية تعتمد على النص/العنوان الإنجليزي).
3. إضافة قواعد Playables وأقسام اختيارية (تعليقات/اقتراحات/شاشة نهاية/الرائج).
4. الالتزام بقاعدة "استثناء صفحة السجل `/feed/history`" من القائمتين الأصليتين.

## أدوات الحجب على مستوى البيانات

| المصدر | الترخيص | الحالة | الاستخدام |
|---|---|---|---|
| [amitbl/blocktube](https://github.com/amitbl/blocktube) | GPL-3.0 | ⭐1409، آخر دفع 2026-02-07 | إعداد موصى به فقط (`presets/blocktube-recommended.md`) — **لم ننسخ أي كود**؛ دالتا الحظر المتقدم مكتوبتان عندنا وفق [الويكي الرسمية](https://github.com/amitbl/blocktube/wiki/Advanced-Blocking) (حقول `video.vidLength`, `objectType`...) |
| [Unhook](https://chromewebstore.google.com/detail/unhook-remove-youtube-recommende/bcdepobfpglhpidkjkdbeceeojnfbkmc) | مجاني | بديل مذكور للتوعية | لم ندمجه؛ BlockTube + uBO يغطيان الحاجة |

## ReVanced (دليل 2)

| المصدر | الترخيص | الحالة عند التحقق (2026-10-09) |
|---|---|---|
| [ReVanced/revanced-manager](https://github.com/ReVanced/revanced-manager) | GPL-3.0 | ⭐29,775، يعمل على GitHub، آخر إصدار **v2.6.0** (2026-04-26) |
| [ReVanced/revanced-patches](https://github.com/ReVanced/revanced-patches) | GPL-3.0 | **محجوب على GitHub بـDMCA منذ 2026-03-24** — [نص الإشعار](https://github.com/github/dmca/blob/master/2026/03/2026-03-12-morpheapp.md): مقدّمه فريق MorpheApp (خلاف GPL داخلي، طرف ثالث — **ليس Google**)، وطُبق على شبكة 702 مستودعًا. المشروع قدّم counter-notice وواصل التطوير عبر [revanced.app](https://revanced.app) ومرآة GitLab حسب [تغطية Gizmochina (2026-03-29)](https://www.gizmochina.com/2026/03/29/revanced-dmca-takedown-github/) |
| [anddea/revanced-patches (RVX)](https://github.com/anddea/revanced-patches) | GPL-3.0 | ⭐1901، آخر دفع 2026-10-08، الإصدار **4.3.0** (2026-09-28)، 129 رقعة — أسماء الرقع في دليلنا مأخوذة حرفيًا من `patches-list.json` الرسمي للإصدار |
| [ويكي RVX — Usage](https://github.com/anddea/revanced-patches/wiki/Usage) | — | حُدّثت 2026-07-23 — مصدر رابط `patches-bundle.json` وطريقة URV/Morphe |
| [Jman-Github/Universal-ReVanced-Manager](https://github.com/Jman-Github/Universal-ReVanced-Manager) | GPL-3.0 | ⭐1338، آخر دفع 2026-10-04 |
| [MorpheApp/morphe-patches](https://github.com/MorpheApp/morphe-patches) | GPL-3.0 | ⭐4008، آخر دفع 2026-10-09 (نشاط يومي) |

## الإعدادات الرسمية لـYouTube (دليل 1)

| المصدر | النوع | ما وثّقناه منه |
|---|---|---|
| [YouTube Terms of Service](https://www.youtube.com/static?template=terms) | رسمي | حظر تعديل/إعادة هندسة برمجيات الخدمة (أساس الإفصاح القانوني في دليل 2) |
| [techidea.net (2026-07)](https://www.techidea.net/turn-off-youtube-shorts/) · [itechguides.com (2026-08)](https://www.itechguides.com/how-to-disable-or-hide-youtube-shorts/) · [Yahoo Tech (2026-08)](https://tech.yahoo.com/apps/articles/disable-youtube-shorts-feed-131700111.html) | إرشادي (ثلاث مصادر مستقلة متطابقة) | مسار Time management → Shorts feed limit → 0 min وحدوده، Show fewer Shorts ومسار التراجع |

## ما هو أصلي في هذا المستودع (MIT)

- `userscripts/justube-focus.user.js` — كتبناه هنا بالكامل (تحويل /shorts/ عبر
  اعتراض النقر + `yt-navigate-finish` + popstate، إطفاء autoplay، إخفاءات CSS
  اختيارية). لا مكتبات خارجية، لا شبكة، لا جمع بيانات.
- `scripts/validate-filters.mjs` — مدقق صياغة ثابت لقائمة الفلاتر.
- كل الوثائق العربية والترتيب والتجميع.

## ملاحظة ترخيصية

قوائم الفلاتر التجميلية ملفات قواعد بسيطة مشتقة من أعمال MIT — أبقينا إسنادها
في ترويسة `filters/justube-focus.txt` ورخصنا الملف MIT تماشيًا. وثائق ReVanced
إرشادية ولا نوزّع أي ثنائيات (APK) إطلاقًا — الروابط كلها لمستودعات/مواقع
المشاريع نفسها.
