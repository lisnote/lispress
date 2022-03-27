const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const app = express();

app.use(function (req, res, next) {
  if (req.protocol !== 'https') {
    return res.redirect('https://' + req.hostname + req.originalUrl);
  }
  next();
});
app.use(express.static('dist'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/404.html'));
});

const httpsOption = {
  key: fs.readFileSync('CA/ali.lisnote.com.key'),
  cert: fs.readFileSync('CA/ali.lisnote.com.pem'),
};
app.listen(80);
https.createServer(httpsOption, app).listen(443);
