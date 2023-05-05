const path = require('path');
const fs = require('fs');

const folderDir = path.resolve('./03-files-in-folder/secret-folder/');

fs.readdir(folderDir, { withFileTypes: true }, (err, files) => {
  files.forEach(file => {
    const ans = [];
    ans.push(path.parse(file.name).name);
    ans.push(path.extname(file.name));
    fs.stat(path.resolve(folderDir, file.name), (err, stats) => {
      if (stats.isFile()) {
        ans.push(`${stats.size}b`);
        console.log(ans.join(' - '));
      }
    });
  });
});