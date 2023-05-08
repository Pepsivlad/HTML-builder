const path = require('path');
const fs = require('fs');

const srcDir = path.resolve('./05-merge-styles/styles');
const destDir = path.resolve('./05-merge-styles/project-dist');
const destFile = fs.createWriteStream(path.resolve(destDir, 'bundle.css'));

fs.readdir(srcDir, { withFileTypes: true }, (err, files) => {
  files.forEach(file => {
    if (path.extname(file.name) === '.css') {
      fs.createReadStream(path.resolve(srcDir, file.name))
        .pipe(destFile);
    }
  });
});