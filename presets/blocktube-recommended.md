# إعداد BlockTube الموصى به — Justube Focus

> **BlockTube** إضافة مفتوحة المصدر (GPL-3.0، ~1400 نجمة، نشطة — آخر تحديث
> للمستودع فبراير 2026) للحاسوب (Chrome وFirefox). تحجب محتوى YouTube **على
> مستوى البيانات** (قبل العرض) وليس بالـCSS فقط: كلمات، قنوات، تعليقات، مدة
> الفيديو، Shorts. كل الإعدادات تُحفظ محليًا على جهازك ولا تجمع أي بيانات
> (حسب سياسة الإضافة المعلنة).
>
> التثبيت: [Chrome Web Store](https://chromewebstore.google.com/detail/blocktube/bbeaicapbccfllodepmimpkgecanonai) ·
> [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/blocktube/)
> الوثيقة الرسمية للحظر المتقدم: [BlockTube Wiki — Advanced Blocking](https://github.com/amitbl/blocktube/wiki/Advanced-Blocking)

افتح خيارات الإضافة (أيقونة BlockTube → Options) وطبّق التالي.

## 1) checkboxes عامة

| الخيار | الحالة | السبب |
|---|---|---|
| Block YouTube Shorts | ✔ مفعّل | يحجب كل ما توسمه YouTube كـShort (تبويب، أرفف، نتائج) |
| Block watched videos from recommendations | ✔ مفعّل | لا يعيد إغراءك بفيديو شاهدته |
| Block YouTube Movies | حسب رغبتك | — |
| Block Explore page | ✔ مفعّل (اختياري) | يزيل صفحة الترندات |
| Block auto-generated playlists (Mixes) | ✔ مفعّل | قوائم "Mix" اللانهائية عنصر تشتيت كلاسيكي |
| Remove "Video paused, continue watching?" popups | ✔ مفعّل | — |

> ملاحظة موثقة من مراجعات المستخدمين: حجب Shorts في BlockTube قد لا يغطي نتائج
> البحث كليًا في بعض الإصدارات — لذلك نجمعها مع قائمة فلاتر uBlock
> (`filters/justube-focus.txt`) التي تغطي البحث صراحة. الطبقتان متكاملتان.

## 2) كلمات محظورة (Blocked videos → words)

قائمة بداية للترفيه العبثي — عدّلها بحرية (تدعم Regex):

```
prank
مقالب
مقلب
تحدي
challenge
reaction
react
ميمز
memes
meme
try not to laugh
لا تحاول أن تضحك
diss track
tiktok compilation
vine compilation
fails compilation
```

> نصيحة: لا تضف كلمات عامة قد تضرب محتوى دراسيًا (مثل "shorts" نفسها — الفيديوهات
> التعليمية القصيرة الشرعية نادرة لكنها موجودة؛ الحجب بالمدة أدق، انظر §4).

## 3) قنوات محظورة (Blocked channels)

أضف هنا **فقط** القنوات التي قررت صراحةً أنها تشتيت. لا تحظر قناة كاملة بسبب
فيديو واحد — استخدم "Don't recommend channel" من YouTube للحالات الرمادية.

## 4) الحظر المتقدم حسب المدة (Advanced blocking)

1. فعّل **Enable advanced blocking**.
2. الصق الدالة التالية في **Custom blocking function**:

```js
(video, objectType) => {
  // احجب الفيديوهات 60 ثانية وأقصر من أسطح التصفح فقط
  // (لا من اقتراحات صفحة المشاهدة حتى لا تختفي دروس قصيرة ذات صلة)
  if (objectType === 'compactVideoRenderer') {
    return false;
  }
  if (video.vidLength && video.vidLength <= 60) {
    return true;
  }
  return false;
};
```

الحقول موثقة في ويكي BlockTube الرسمية: `video.vidLength` (ثواني)،
`video.title`، `video.channelName`، `objectType` (نوع السطح كما تسميه YouTube).

إن أردت الحجب ≤ 60 ثانية **بما فيها** اقتراحات صفحة المشاهدة، احذف شرط
`compactVideoRenderer`. وإن أردت رفع العتبة (مثلًا ≤ 3 دقائق) غيّر الرقم —
لكن تذكر قاعدتك: "لا تعتبر كل فيديو قصير تافهًا" — ابدأ بـ60 ثانية وراقب أسبوعًا.

مثال إضافي (اختياري) — حجب فيديوهات معينة من قنوات الترفيه مع إبقاء قنواتك الدراسية:

```js
(video, objectType) => {
  if (objectType === 'compactVideoRenderer') return false;
  if (video.vidLength && video.vidLength <= 60) return true;
  if (video.title && /trump|gossip|celebrity news/i.test(video.title)
      && !(video.channelBadges || []).includes('verified')) {
    return true;
  }
  return false;
};
```

> **تحذير الإضافة الرسمي نفسه:** لا تلصق دوالًا من مصادر لا تفهمها — الكود يعمل
> بصلاحيات صفحتك على YouTube. الدالتان أعلاه مكتوبتان في هذا المستودع ومراجعتان
> سطرًا سطرًا.

## 5) التعليقات (اختياري — Focus أقصى)

Blocked comments → أضف كلمات إساءة/سب شائعة تريد إخفاءها، أو استخدم خيار إخفاء
التعليقات كليًا إن كان متاحًا في إصدارك، أو فعّل السطر الاختياري المقابل في
قائمة فلاتر uBlock.

## 6) التحقق

بعد التطبيق: افتح الرئيسية → ابحث موضوعًا دراسيًا → افتح فيديو. ثم نفّذ
`docs/ar/04-testing-checklist.md`.
