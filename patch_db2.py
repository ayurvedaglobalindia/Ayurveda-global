import re

with open("src/lib/db/index.ts", "r") as f:
    content = f.read()

# Remove all fs and path imports at the top
content = re.sub(r'import\s+\{.*\}\s+from\s+[\'"](?:fs|path)[\'"];?\n?', '', content)

# Remove the initial dbPath and existsSync block
block_to_remove = r'const dataDir.*?writeFileSync.*?\n\}\n'
content = re.sub(r'const dataDir.*?writeFileSync.*?\n\}\n', '', content, flags=re.DOTALL)

# define dbPath safely inside the functions if needed, but since readDB and writeDB are modified, let's just prepend a safe definition
safe_prepend = """
const dbPath = ".data/ayurveda.json";

try {
  const fs = require('fs');
  if (fs.existsSync && !fs.existsSync('.data')) {
    fs.mkdirSync('.data', { recursive: true });
  }
  if (fs.existsSync && !fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({
      products: [],
      orders: [],
      orderStatusHistory: [],
      coupons: [],
      whatsappLeads: []
    }, null, 2));
  }
} catch(e) {}
"""

content = safe_prepend + "\n" + content

with open("src/lib/db/index.ts", "w") as f:
    f.write(content)
