const fs = require('fs');
const content = fs.readFileSync('src/app/(public)/admin/page.tsx', 'utf8');
let open = 0;
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let inString = false;
  let stringChar = '';
  for (let j = 0; j < line.length; j++) {
    // Basic string skipping
    if (inString) {
      if (line[j] === stringChar && line[j-1] !== '\\') inString = false;
    } else {
      if (line[j] === '"' || line[j] === "'" || line[j] === '`') {
        inString = true;
        stringChar = line[j];
      } else if (line[j] === '{') open++;
      else if (line[j] === '}') open--;
    }
  }
  if (open < 0) {
    console.log('Negative balance at line:', i + 1);
    break;
  }
}
