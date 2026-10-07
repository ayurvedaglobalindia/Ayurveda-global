import re

with open("src/lib/db/index.ts", "r") as f:
    content = f.read()

replacement = """
let inMemoryDB = {
  products: [],
  orders: [],
  orderStatusHistory: [],
  coupons: [],
  whatsappLeads: [],
};

let isEdge = false;
try {
  if (typeof process !== 'undefined' && process.env && process.env.CF_PAGES) {
    isEdge = true;
  }
} catch (e) {}

function readDB() {
  if (isEdge) return inMemoryDB;
  try {
    const { readFileSync } = require("fs");
    return JSON.parse(readFileSync(dbPath, "utf8"));
  } catch (e) {
    return inMemoryDB;
  }
}

function writeDB(data: any) {
  inMemoryDB = data;
  if (isEdge) return;
  try {
    const { writeFileSync } = require("fs");
    writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (e) {}
}
"""

content = re.sub(r'function readDB\(\) \{[\s\S]*?function writeDB\(data: any\) \{[\s\S]*?\}', replacement.strip(), content)

# Remove the import { readFileSync, writeFileSync } if it exists at the top to prevent Edge compilation errors
content = re.sub(r'import\s+\{?[^}]*readFileSync[^}]*\}?\s+from\s+[\'"]fs[\'"];?', '', content)

with open("src/lib/db/index.ts", "w") as f:
    f.write(content)
