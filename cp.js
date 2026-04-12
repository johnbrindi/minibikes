const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'pictures');
const destParent = path.join(__dirname, 'public');
const destDir = path.join(destParent, 'pictures');

if (!fs.existsSync(destParent)) {
  fs.mkdirSync(destParent);
}
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

const files = fs.readdirSync(srcDir);
for (const file of files) {
  fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
}
console.log('Images copied successfully.');
