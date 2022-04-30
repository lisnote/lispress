const express = require('express');
const path = require('path');
const app = express();
app.listen(80);
app.use(express.static(path.resolve(__dirname, '../dist')));
