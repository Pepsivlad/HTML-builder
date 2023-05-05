const fs = require('fs');
const path = require('path');
const process = require('process');
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const fileData = fs.createWriteStream(path.resolve('./02-write-file/text.txt'));

console.log('Write any string: ');

rl.on('SIGINT', () => {
  console.log('Goodbye');
  rl.close();
});

rl.on('line', (string) => {
  if (string === 'exit') {
    console.log('Goodbye');
    rl.close();
  } else {
    fileData.write(string);
  }
});