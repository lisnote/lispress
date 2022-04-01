/* 
名称 : 日志
描述 : express中间件, 输出日志到文件
*/
const path = require('path');
const fs = require('fs');
const moment = require('moment');

module.exports = (req, res, next) => {
  // 准备数据
  let time = moment(new Date());
  let filePath = path.join(
    __dirname,
    '../logs/',
    time.format('YYYY-MM-DD') + '.log'
  );
  const log =
    JSON.stringify({
      date: time.format('YYYY-MM-DD HH:mm:ss'),
      IpAddress: req.socket.remoteAddress,
      method: req.method,
      path: req.path,
    }) + '\n';
  // 输出数据
  fs.appendFile(filePath, log, (err) => {
    if (err) throw err;
    next();
  });
};
