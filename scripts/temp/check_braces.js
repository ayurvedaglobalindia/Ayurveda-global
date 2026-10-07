const fs = require('fs');
const content = fs.readFileSync('src/app/(public)/admin/page.tsx', 'utf8');
let open = 0;
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    if (line[j] === '{') open++;
    if (line[j] === '}') open--;
  }
}
console.log('Balance:', open);
