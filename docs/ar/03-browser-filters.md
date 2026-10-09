# 3) فلاتر المتصفح — youtube.com الحقيقي بلا Shorts ولا تشتيت

> هذا الخيار يعدّل **موقع youtube.com نفسه** في المتصفح: نفس الواجهة الأصلية
> تمامًا، نفس حسابك، اشتراكاتك، سجلك، بحثك — مع إزالة Shorts وعناصر التشتيت.
> لا يؤثر على تطبيق الهاتف الرسمي (له دليل 2).

## مكونات الطبقة

| المكوّن | الوظيفة | الملف/المصدر |
|---|---|---|
| قائمة فلاتر uBlock Origin | إخفاء Shorts من كل الأسطح + تحويل روابطها لفيديو عادي | `filters/justube-focus.txt` (مجمّعة من قائمتين MIT مُصانتين) |
| إعداد BlockTube | حظر على مستوى **البيانات**: كلمات، قنوات، مدة ≤ 60 ثانية | `presets/blocktube-recommended.md` |
| سكريبت Justube Focus (اختياري) | تحويل /shorts/ داخل تنقل SPA + إطفاء Autoplay تلقائيًا + إخفاءات اختيارية | `userscripts/justube-focus.user.js` |

## أولًا: اختر متصفحك

- **الحاسوب — الأفضل: Firefox** (أو Edge/Chrome).
  - على **Firefox**: ثبّت [uBlock Origin](https://addons.mozilla.org/firefox/addon/ublock-origin/) الكامل — يدعم القوائم المخصصة بالكامل.
  - على **Chrome**: انتبه — منذ الانتقال إلى MV3 لم يعد uBlock Origin الكامل متاحًا على Chrome؛ المتوفر هو "uBlock Origin Lite" بإمكانيات أضيق. لذلك على Chrome اعتمد أساسًا على **BlockTube** (يعمل على MV3) + جرّب استيراد قائمتنا في uBO Lite إن سمح إصدارك. **توصيتي الجادة: Firefox للحاسوب.**
- **هاتف Android — الأفضل: Firefox for Android** (يدعم الإضافات رسميًا):
  1. ثبّت Firefox من Play Store.
  2. الإضافات → ثبّت **uBlock Origin**.
  3. افتح youtube.com — ستُخدم نسخة الهاتف (m.youtube.com) التي تغطيها قائمتنا.
  - بديل: **Kiwi Browser** (يدعم إضافات Chrome بما فيها BlockTube + Tampermonkey).
- **iPhone/iPad**: إضافات الويب محدودة؛ الخيار العملي هو دليل 1 (الإعدادات الرسمية) + Safari مع إضافة AdGuard إن رغبت (قائمتنا مبنية لصياغة uBO وقد لا تعمل كاملة هناك — لا أعد بما لم أختبره).

## ثانيًا: تثبيت قائمة الفلاتر في uBlock Origin

1. افتح لوحة uBO: أيقونة uBO → الترس (Dashboard).
2. تبويب **Filter lists / قوائم الفلاتر** → أسفل الصفحة **Import / استيراد**.
3. الصق رابط القائمة الخام من هذا المستودع (للحصول على تحديث تلقائي كل 4 أيام):
   ```
   https://raw.githubusercontent.com/ayoubgalai22-web/pro-fashino-skins/main/filters/justube-focus.txt
   ```
   أو افتح الملف محليًا وانسخ محتواه كاملًا إلى **My filters / فلاتري**.
4. **طبّق التغييرات (Apply changes)** ثم أعد تحميل youtube.com بالكامل.
5. **للتحصين ضد تغييرات YouTube** اشترك أيضًا في القائمتين الأصليتين المُصانتين
   (نفس طريقة الاستيراد) — التكرار لا يضر:
   ```
   https://raw.githubusercontent.com/gijsdev/ublock-hide-yt-shorts/master/list.txt
   https://raw.githubusercontent.com/i5heu/ublock-hide-yt-shorts/master/list.txt
   ```

### الخيارات الإضافية في القائمة

أسفل `justube-focus.txt` قسم "إضافات اختيارية" (أسطر تبدأ بـ `!`). أزل علامة
التعليق لتفعيل: إخفاء التعليقات، إخفاء عمود الاقتراحات، إخفاء شاشة نهاية
الفيديو، إخفاء "الرائج/استكشاف"، أو فلترة الفيديوهات < 70 ثانية من اقتراحات
الهاتف. هذا هو "Focus Mode" الخاص بالمتصفح — تتحكم فيه بتعليق/إلغاء تعليق سطر.

## ثالثًا: BlockTube (الحظر على مستوى البيانات)

اتبع `presets/blocktube-recommended.md` — يضيف ما لا تستطيع الفلاتر التجميلية
فعله: حظر فيديوهات حسب **الكلمات في العنوان** و**اسم القناة** و**المدة**
(مثلًا كل فيديو ≤ 60 ثانية في الرئيسية والاقتراحات)، وإخفاء الفيديوهات
المشاهَدة من التوصيات.

## رابعًا (اختياري): سكريبت Justube Focus

لمستخدمي Tampermonkey (حاسوب/Kiwi) أو Violentmonkey (Firefox): انسخ محتوى
`userscripts/justube-focus.user.js` إلى سكريبت جديد. ماذا يضيف فوق الفلاتر؟
- تحويل روابط /shorts/ إلى /watch?v= حتى داخل تنقل YouTube الديناميكي (SPA)
  الذي يتجاوز أحيانًا الفلاتر الشبكية.
- إطفاء زر التشغيل التلقائي تلقائيًا إن وجدته مضاءً (يُحفظ في حسابك).
- مفاتيح إخفاء جاهزة (تعليقات/اقتراحات/شاشة نهاية) في أعلى الملف.

## خامسًا: إعدادات youtube.com نفسها (تكمل الطبقات)

- من حسابك على المتصفح: أطفئ **Autoplay** من المشغّل (تُحفظ في الحساب).
- Settings → Playback in feeds → Off (معاينات متحركة).
- استخدم `Show fewer Shorts` و`Not interested` كما في دليل 1.

## التحقق

بعد التثبيت نفّذ **قائمة الاختبار** كاملة: `docs/ar/04-testing-checklist.md`.
إن ظهر عنصر Shorts متبقٍ: `docs/ar/05-troubleshooting.md`.
