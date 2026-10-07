const ts = require('typescript');
const fs = require('fs');

const src = fs.readFileSync('src/app/(public)/admin/page.tsx', 'utf8');
const sourceFile = ts.createSourceFile('page.tsx', src, ts.ScriptTarget.Latest, true);

function visit(node) {
  if (node.kind === ts.SyntaxKind.JsxElement) {
    if (node.openingElement.tagName.text === 'div') {
      // just exploring
    }
  }
  ts.forEachChild(node, visit);
}

visit(sourceFile);
console.log("No exception thrown by ts parser if it reaches here.");
