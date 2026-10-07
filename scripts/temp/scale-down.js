const fs = require('fs');
const path = require('path');

const dir = 'src/components/home';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).map(f => path.join(dir, f));
files.push('src/components/layout/Header.tsx');
files.push('src/components/layout/Footer.tsx');

const replacements = [
  // Text Scaling
  [/text-5xl sm:text-6xl lg:text-\[72px\]/g, 'text-3xl sm:text-4xl lg:text-5xl'],
  [/text-3xl sm:text-4xl lg:text-5xl/g, 'text-2xl sm:text-3xl lg:text-4xl'],
  [/text-3xl sm:text-4xl lg:text-\[42px\]/g, 'text-2xl sm:text-3xl lg:text-4xl'],
  [/text-3xl sm:text-4xl lg:text-\[44px\]/g, 'text-2xl sm:text-3xl lg:text-4xl'],
  [/text-3xl sm:text-4xl/g, 'text-2xl sm:text-3xl'],
  [/text-xl sm:text-2xl lg:text-3xl/g, 'text-lg sm:text-xl lg:text-2xl'],
  [/text-xl sm:text-2xl/g, 'text-lg sm:text-xl'],
  [/text-lg sm:text-xl/g, 'text-base sm:text-lg'],
  [/text-base sm:text-lg/g, 'text-sm sm:text-base'],
  [/text-base/g, 'text-sm'],

  // Button sizes
  [/px-8 py-3.5/g, 'px-5 py-2.5'],
  [/px-8 py-4/g, 'px-5 py-2.5'],
  [/px-10 py-4/g, 'px-6 py-3'],

  // Icon / Element sizes
  [/w-24 h-24 sm:w-32 sm:h-32/g, 'w-16 h-16 sm:w-20 sm:h-20'],
  [/w-20 h-20 sm:w-24 sm:h-24/g, 'w-14 h-14 sm:w-16 sm:h-16'],
  [/w-16 h-16/g, 'w-10 h-10'],
  [/h-16 sm:h-20/g, 'h-12 sm:h-14'],
  [/min-h-\[60vh\]/g, 'min-h-[45vh]'],
  [/min-h-\[85vh\]/g, 'min-h-[45vh]'],
  [/min-h-\[300px\] md:min-h-\[400px\]/g, 'min-h-[200px] md:min-h-[250px]'],
  [/max-w-md aspect-\[4\/5\]/g, 'max-w-xs aspect-square'],

  // Paddings and Margins
  [/py-12 sm:py-16/g, 'py-8 sm:py-10'],
  [/py-6 sm:py-16/g, 'py-8 sm:py-10'],
  [/py-10 sm:py-12/g, 'py-6 sm:py-8'],
  [/py-6 sm:py-8/g, 'py-6'],
  [/py-8/g, 'py-6'],
  [/py-10/g, 'py-8'],
  [/py-12/g, 'py-8'],
  
  [/gap-6 lg:gap-10/g, 'gap-4 lg:gap-6'],
  [/gap-8 lg:gap-12/g, 'gap-5 lg:gap-8'],
  [/gap-4 sm:gap-8/g, 'gap-3 sm:gap-5'],
  [/mb-8 sm:mb-10/g, 'mb-5 sm:mb-6'],
  [/mb-8/g, 'mb-5'],
  [/mb-6/g, 'mb-4'],
  [/p-6 sm:p-10/g, 'p-4 sm:p-6'],
  [/p-6 sm:p-8/g, 'p-5'],
  [/p-5/g, 'p-4'],
  [/space-y-4 lg:space-y-5/g, 'space-y-3'],
  [/space-y-4/g, 'space-y-3'],
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  replacements.forEach(([regex, replacement]) => {
    content = content.replace(regex, replacement);
  });
  fs.writeFileSync(file, content);
});

console.log('Scale down complete.');
