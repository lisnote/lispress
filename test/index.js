const express = require('express');
const path = require('path');
const app = express();

let port = 8080;
let root = path.resolve(__dirname, '../dist');
app.listen(port);
app.use(express.static(root));
app.get('*', function (req, res) {
  res.sendfile(path.resolve(root, '404.html'));
});

console.log(`http://localhost:${port}`);
