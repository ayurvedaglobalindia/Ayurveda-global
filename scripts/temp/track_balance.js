const fs = require('fs');
const content = fs.readFileSync('src/app/(public)/admin/page.tsx', 'utf8');
let open = 0;
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let inString = false;
  let stringChar = '';
  let lineOpen = 0;
  for (let j = 0; j < line.length; j++) {
    if (inString) {
      if (line[j] === stringChar && line[j-1] !== '\\') inString = false;
    } else {
      if (line[j] === '"' || line[j] === "'" || line[j] === '`') {
        inString = true;
        stringChar = line[j];
      } else if (line[j] === '{') { open++; lineOpen++; }
      else if (line[j] === '}') { open--; lineOpen--; }
    }
  }
  if (lineOpen < 0) {
    console.log(`Line ${i + 1}: ${line.trim()} (Delta: ${lineOpen}, Total Balance: ${open})`);
  }
}
