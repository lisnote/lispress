/* 
名称 : 索引
描述 : 入口, 将所有其他功能进行整合
*/
const path = require('path');
const fs = require('fs');
const https = require('https');

// 第三方模块
const express = require('express');
const app = express();

// express中间件
const logger = require('./logger')
const httpsRedirect = require('./httpsRedirect')

// 事务
app.use(logger)
app.use(httpsRedirect);
// 基本功能
app.use(express.static('dist'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/404.html'));
});

// http & https
const httpsOption = {
  key: fs.readFileSync('CA/lisnote.com.key'),
  cert: fs.readFileSync('CA/lisnote.com.pem'),
};
app.listen(80);
https.createServer(httpsOption, app).listen(443);