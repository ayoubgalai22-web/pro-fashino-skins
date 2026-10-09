#!/usr/bin/env node
/**
 * Justube Focus Kit — مدقق قائمة الفلاتر
 * يفحص filters/justube-focus.txt للتأكد من سلامة الصياغة الأساسية لقواعد
 * uBlock Origin قبل النشر. هذا فحص ثابت (static) — لا يستطيع تأكيد عمل
 * القواعد داخل متصفح حقيقي (راجع docs/ar/04-testing-checklist.md).
 *
 * التشغيل:  node scripts/validate-filters.mjs
 * الخروج 0 = سليم، 1 = توجد أخطاء.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const file = join(root, 'filters', 'justube-focus.txt');

const raw = readFileSync(file, 'utf8');
const errors = [];
const warnings = [];

// 1) لا أسطر CRLF
if (raw.includes('\r')) errors.push('الملف يحتوي أحرف CR (\\r) — مطلوب LF فقط');

const lines = raw.split('\n');

// 2) ترويسة إلزامية
const header = lines.slice(0, 15).join('\n');
for (const key of ['! Title:', '! Version:', '! License:', '! Homepage:']) {
  if (!header.includes(key)) errors.push(`الترويسة ناقصة: ${key}`);
}

// 3) فحص كل سطر
const DOMAIN_PART = /^[a-z0-9.*-]+(?:\.[a-z0-9.*-]+)+(?:\$[^#]*)?/;
let rules = 0;
lines.forEach((line, i) => {
  const n = i + 1;
  const t = line.trim();
  if (t === '' || t.startsWith('!')) return; // تعليق أو فراغ
  rules++;

  if (line !== t) warnings.push(`سطر ${n}: مسافات بادئة/زائدة (uBO يتسامح لكن الأفضل إزالتها)`);

  // قاعدة شبكية (network) مثل ||youtube.com/shorts/*$uritransform=...
  if (t.startsWith('||') || t.startsWith('|') || t.startsWith('@@')) return;

  // قاعدة تجميلية (cosmetic): domain##selector أو variants (#?#, #$#, #@#)
  const m = t.match(/^(.*?)(##|#\?#|#\$#|#@#|\s# )(.)?/);
  if (!m) {
    errors.push(`سطر ${n}: لا يبدأ بمجال+فاصل تجميلي (##) ولا بقاعدة شبكية (||): ${t.slice(0, 60)}`);
    return;
  }
  const domain = m[1];
  if (domain && !DOMAIN_PART.test(domain)) {
    errors.push(`سطر ${n}: جزء المجال غير صالح: "${domain}"`);
  }

  // توازن الأقواس
  const open = (t.match(/\(/g) || []).length;
  const close = (t.match(/\)/g) || []).length;
  if (open !== close) errors.push(`سطر ${n}: أقواس غير متوازنة (${open} مقابل ${close})`);

  // توازن الأقواس المربعة
  const ob = (t.match(/\[/g) || []).length;
  const cb = (t.match(/\]/g) || []).length;
  if (ob !== cb) errors.push(`سطر ${n}: أقواس مربعة غير متوازنة`);

  // فواصل اختيارية سليمة في regex داخل :has-text(/.../)
  const hasText = t.match(/:has-text\(\/(.*?)\/i?\)/g);
  if (hasText) {
    for (const h of hasText) {
      const slashes = (h.match(/\//g) || []).length;
      if (slashes < 2) errors.push(`سطر ${n}: regex غير مكتمل داخل has-text: ${h}`);
    }
  }
});

// 4) ملخص
const activeRules = lines.filter((l) => {
  const t = l.trim();
  return t !== '' && !t.startsWith('!') && !t.startsWith('!#');
}).length;
const optionalRules = lines.filter((l) => l.trim().startsWith('!') && /##|\|\|/.test(l)).length;

console.log(`✔ ملف: filters/justube-focus.txt`);
console.log(`  إجمالي الأسطر: ${lines.length}`);
console.log(`  قواعد نشطة: ${activeRules}`);
console.log(`  قواعد اختيارية (معطّلة بتعليق): ${optionalRules}`);

if (warnings.length) {
  console.log(`\n⚠ تحذيرات (${warnings.length}):`);
  warnings.slice(0, 10).forEach((w) => console.log('  - ' + w));
}
if (errors.length) {
  console.error(`\n✖ أخطاء (${errors.length}):`);
  errors.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}
console.log('\n✔ لا توجد أخطاء صياغة. (الفحص البصري الحقيقي: docs/ar/04-testing-checklist.md)');
