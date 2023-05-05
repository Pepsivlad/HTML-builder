const path = require('path');
const fs = require('fs');

const fileData = fs.createReadStream(path.resolve('./01-read-file/text.txt'));
fileData.on('data', function (data) {
  console.log(data.toString());
});