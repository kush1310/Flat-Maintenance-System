/** @type {import('tailwindcss').Config} */
const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        results = results.concat(walk(filePath));
      }
    } else {
      const ext = path.extname(filePath);
      if (['.html', '.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
        results.push(filePath);
      }
    }
  });
  return results;
}

// Programmatically scan src and index.html to bypass glob parsing issues with parenthesis in path
const contentFiles = walk(path.join(__dirname, 'src'));
contentFiles.push(path.join(__dirname, 'index.html'));

module.exports = {
  content: contentFiles,
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
