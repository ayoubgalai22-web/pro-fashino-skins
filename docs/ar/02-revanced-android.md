# 2) ReVanced على Android — تعديل تطبيق YouTube الرسمي نفسه

> **ما هذا؟** ReVanced مشروع مفتوح المصدر (GPL-3.0) لا يوزّع أي تطبيق معدّل؛
> بل تضع فيه نسخة YouTube **الرسمية** الموجودة على جهازك، فيطبّق عليها "رقعًا"
> (patches) تختارها بنفسك، فتنتج نسخة طبق الأصل من التطبيق الأصلي (نفس الواجهة
> والحساب والاشتراكات والسجل) مع إعدادات إضافية حقيقية: إخفاء Shorts من كل
> مكان، تعطيل التشغيل التلقائي، فلترة كلمات وقنوات، إخفاء تعليقات...

> **صدقًا ووضوحًا قبل أن تبدأ:**
> 1. **لا يمكن بناء هذه النسخة من داخل بيئة عملي** (لا وصول لملف APK ولا أدوات
>     بناء Android هنا) — البناء يتم على جهازك/حاسوبك، ودوري أعطيك الخطوات
>     الدقيقة واختيارات الرقع الموصى بها لحالة "التركيز الدراسي".
> 2. تعديل ثنائية التطبيق يقع في **منطقة رمادية من شروط استخدام YouTube**
>     (الشروط تمنع تعديل برمجيات الخدمة). الاستخدام الشخصي عبر ReVanced شائع
>     منذ سنوات دون تقارير واسعة عن عقوبات على الحسابات، لكن الخطر النظري
>     موجود وعليك معرفته قبل القرار. لا تستخدمه إن كان ذلك يزعجك — الخيارات
>     الأخرى في هذه الحزمة قانونية 100%.
> 3. عند كل تحديث كبير لـYouTube قد تحتاج **إعادة الترقيع** (دقيقتان).

## الوضع القانوني/التوافري الحالي (تم التحقق 2026-10-09)

- مستودع الرقع الرسمي `ReVanced/revanced-patches` **محجوب على GitHub منذ
  2026-03-24** بسبب إشعار DMCA من طرف ثالث (فريق MorpheApp المنشق — خلاف
  ترخيص GPL، **وليس من Google**). المشروع قدّم إشعارًا مضادًا واستمر التطوير؛
  التوزيع الرسمي مستمر عبر [revanced.app](https://revanced.app).
- مستودع **ReVanced Manager** نفسه يعمل على GitHub (آخر إصدار v2.6.0 بتاريخ
  2026-04-26).
- البدائل النشطة على GitHub (تم التحقق من نشاطها اليوم):
  - **RVX / ReVanced Extended** — [anddea/revanced-patches](https://github.com/anddea/revanced-patches)
    (GPL-3.0، ⭐1901، v4.3.0 بتاريخ 2026-09-28، 129 رقعة، أغنى خيارات Shorts/Focus).
  - **Morphe** — [MorpheApp/morphe-patches](https://github.com/MorpheApp/morphe-patches)
    (GPL-3.0، ⭐4008، نشاط يومي).
  - **URV Manager** — [Jman-Github/Universal-ReVanced-Manager](https://github.com/Jman-Github/Universal-ReVanced-Manager)
    (GPL-3.0، ⭐1338) — مدير يدعم عدة مصادر رقع (يستخدمه RVX رسميًا).

## الطريق الموصى به لحالتك (Android + تركيز دراسي): RVX عبر URV Manager

اخترتُ RVX لأن رقعَه الموثقة في v4.3.0 تغطي حرفيًا كل متطلباتك:
`Shorts components` · `Disable resuming Shorts on startup` · `Disable playlist autoplay` ·
`Hide feed components` · `Hide layout components` (فلترة كلمات!) ·
`Hide comments components` · `Navigation bar components` · `Playback in feeds` ·
`Toolbar components`.

### الخطوات

1. **ثبّت URV Manager**: من
   [Releases](https://github.com/Jman-Github/Universal-ReVanced-Manager/releases)
   حمّل آخر APK مستقر (اختر `arm64-v8a` لأغلب الهواتف الحديثة، أو `universal` إن شككت).
2. **أضف مصدر رقع RVX**: في URV Manager افتح تبويب **Patch Bundles** ثم أيقونة
   **الكرة الأرضية (Globe)** والصق (هذا هو الرابط الرسمي من ويكي RVX):
   ```
   https://github.com/anddea/revanced-patches/patches-bundle.json
   ```
3. **ابدأ الترقيع**: اختر **YouTube** من قائمة التطبيقات. سيقترح المدير إصدار
   YouTube المتوافق — **استخدم الإصدار المقترح** (ينزّله لك أو يطلب منك توفير
   APK الرسمي من مصدر موثوق مثل APKMirror — النسخة الأصلية غير المعدلة).
4. **اختيار الرقع** (Patches → اختر يدويًا): فعّل التالي:
   - `Shorts components` — مع فتح خياراتها وتفعيل: إخفاء أرفف Shorts، إخفاء
     نتائج Shorts من البحث/القنوات/الاشتراكات حسب المتاح في القائمة.
   - `Disable resuming Shorts on startup` — لا يستأنف مشغل Shorts عند فتح التطبيق.
   - `Navigation bar components` — أخفِ زر تبويب Shorts من الشريط السفلي.
   - `Disable playlist autoplay` — منع الانتقال التلقائي في قوائم التشغيل.
   - `Hide feed components` — إخفاء أقسام مشتتة من الرئيسية.
   - `Hide layout components` — **فلترة الكلمات**: أضف كلمات مثل:
     `مقالب`, `تحدي`, `challenge`, `prank`, `reaction`, `ميمز`, `memes`
     (تعمل على عناوين الفيديوهات في الفيد والاقتراحات).
   - `Playback in feeds` — أطفئ المعاينات المتحركة دائمًا.
   - اختياري: `Hide comments components` (وضع تركيز أقصى)، `Toolbar components`.
   - اترك بقية الرقع الافتراضية كما يقترحها المدير (إعلانات إلخ حسب رغبتك).
5. **Patch** وانتظر 2–4 دقائق، ثم **Install**.
6. **تسجيل الدخول**: إن طلب المدير تثبيت **GmsCore** (نسخة Renz/ReVanced من
   خدمات Google) فوافق — ضروري لتسجيل الدخول بحسابك دون root. سجّل الدخول
   بحسابك المعتاد: اشتراكاتك وسجلك وWatch Later كلها كما هي.

### بعد التثبيت — إعدادات داخل التطبيق (RVX Settings)

ستجد قسم إعدادات جديدًا داخل YouTube نفسه (Settings → RVX/ReVanced):
- تأكد أن **Shorts** مخفية من كل الأسطح المفعلة في الرقعة.
- **Autoplay**: أطفئه أيضًا من إعدادات YouTube العادية (الحساب) كطبقة ثانية.
- راجع كلمات `Hide layout components` وأضف/احذف حسب ما تلاحظه خلال أسبوع.

### البديل الرسمي (إن فضلت مشروع ReVanced الأصلي)

1. حمّل **ReVanced Manager v2.6.0** من
   [Releases الرسمية](https://github.com/ReVanced/revanced-manager/releases).
2. افتحه واتبع نفس المنطق: اختر YouTube → الإصدار المقترح → الرقع.
   أسماء الرقع الرسمية مقاربة جدًا (ابحث عن كل ما يحتوي *Shorts* و*Autoplay*
   و*Feed* و*Layout* و*Comments* و*Navigation*).
3. المدير يجلب الرقع الرسمية من قنوات توزيع المشروع (revanced.app) رغم حجب
   مستودع GitHub — إن فشل الجلب، استخدم طريق RVX أعلاه.

### البديل الثالث: Morphe

[Morphe Manager](https://morphe.software) + رقعهم النشطة يوميًا؛ وتقبل أيضًا
مصدر RVX عبر: `https://morphe.software/add-source?github=anddea/revanced-patches`.

## الصيانة

- **عند كل تحديث لـYouTube**: لا تحدّث YouTube من Play Store (أو عطّل تحديثه
  التلقائي)؛ حدّث النسخة المرقعة فقط بإعادة الترقيع عند الحاجة.
- **إن فشل الترقيع**: جرّب إصدار YouTube "المقترح" حرفيًا من المدير، وتأكد من
  مساحة تخزين كافية، وأعد تشغيل الهاتف ثم حاول مجددًا.
- **إن تعطل التطبيق بعد الترقيع**: أعد تثبيت GmsCore ثم النسخة المرقعة.

## ما الذي لا أستطيع ادعاءه

- لم أبنِ أو أختبر APK فعليًا من هذه البيئة — الخطوات مبنية على ويكي RVX
  الرسمية (حُدّثت 2026-07-23) وإصدارات GitHub الحية التي تحققتُ منها اليوم.
- أسماء خيارات الرقع الدقيقة داخل كل رقعة تتغير بين الإصدارات؛ القاعدة: فعّل
  كل خيار يتضمن كلمة Shorts/Autoplay داخل الرقع المختارة.
