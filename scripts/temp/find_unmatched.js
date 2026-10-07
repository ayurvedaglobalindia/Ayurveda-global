const fs = require('fs');
const content = fs.readFileSync('src/app/(public)/admin/page.tsx', 'utf8');
const lines = content.split('\n');

let stack = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Quick regex to find tags
  const openTags = [...line.matchAll(/<([a-zA-Z0-9]+)(>|\s+[^>]*>)/g)];
  for (const match of openTags) {
    if (!line.substring(match.index).startsWith('</') && !match[0].endsWith('/>')) {
      stack.push({tag: match[1], line: i + 1});
    }
  }
  
  const closeTags = [...line.matchAll(/<\/([a-zA-Z0-9]+)>/g)];
  for (const match of closeTags) {
    const last = stack.pop();
    if (!last || last.tag !== match[1]) {
      console.log(`Mismatch at line ${i + 1}: expected </${last ? last.tag : 'none'}> but found </${match[1]}>`);
    }
  }
}
console.log("Remaining in stack:", stack);
