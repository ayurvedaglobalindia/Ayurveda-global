const fs = require('fs');
const parser = require('@babel/parser');
const code = fs.readFileSync('src/app/(public)/admin/page.tsx', 'utf8');
try {
  parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  });
  console.log("Babel parsing succeeded!");
} catch (e) {
  console.error("Babel error:", e.message, e.loc);
}
