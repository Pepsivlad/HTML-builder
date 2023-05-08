function copyDir(srcDir, destDir) {
  const path = require('path');
  const fs = require('fs');

  fs.mkdir(destDir, { recursive: true }, () => {
    fs.readdir(srcDir, { withFileTypes: true }, (err, files) => {
      files.forEach(file => {
        if (file.isFile()) {
          fs.copyFile(path.resolve(srcDir, file.name), path.resolve(destDir, file.name), () => {});
        } else if (file.isDirectory) {
          copyDir(path.resolve(srcDir, file.name), path.resolve(destDir, file.name));
        }
      });
    });
  });
}

async function changeDir() {
  const path = require('path');
  const fsp = require('fs/promises');

  await fsp.rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true });
  copyDir(path.resolve('./04-copy-directory/files'), path.join(__dirname, 'files-copy'));
}

changeDir();