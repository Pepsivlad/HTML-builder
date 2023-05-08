const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');

createProjectDist();

async function createProjectDist() {
  await fsp.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

  startCopyDir();
  createIndexHtml();
  mergeStyles();
}

async function createIndexHtml() {
  const componentsDir = path.resolve('./06-build-page/components');
  
  fsp.readdir(componentsDir, { withFileTypes: true })
    .then(placeComponents)
    .then((result) => {
      fs.createWriteStream(path.resolve('./06-build-page/project-dist/index.html')).write(result);
    });
  
  async function placeComponents(files) {
    let resultHtml = await fsp.readFile(path.resolve('./06-build-page/template.html'), 'utf-8');
    for (let file of files) {
      const component = await fsp.readFile(path.resolve(componentsDir, file.name), 'utf-8');
      resultHtml = resultHtml.replaceAll(`{{${path.parse(file.name).name}}}`, component);
    }
    return resultHtml;
  }
}

function mergeStyles() {
  const srcDir = path.resolve('./06-build-page/styles');
  const destDir = path.resolve('./06-build-page/project-dist');
  const destFile = fs.createWriteStream(path.resolve(destDir, 'style.css'));
  
  fs.readdir(srcDir, { withFileTypes: true }, (err, files) => {
    files.forEach(file => {
      if (path.extname(file.name) === '.css') {
        fs.createReadStream(path.resolve(srcDir, file.name))
          .pipe(destFile);
      }
    });
  });
}

function copyDir(srcDir, destDir) {
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

async function startCopyDir() {
  await fsp.rm(path.join(__dirname, 'project-dist', 'assets'), {maxRetries: 10, recursive: true, force: true });
  copyDir(path.resolve('./06-build-page/assets'), path.join(__dirname, 'project-dist/assets'));
}