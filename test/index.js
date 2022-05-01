const express = require('express');
const path = require('path');
const app = express();

let port = 8080;
app.listen(port);
app.use(express.static(path.resolve(__dirname, '../dist')));
console.log(`http://localhost:${port}`);
