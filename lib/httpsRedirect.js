/* 
名称 : https重定向
功能 : express中间件, 将http访问重定向为https
*/
module.exports = function (req, res, next) {
  if (req.protocol !== 'https') {
    return res.redirect('https://' + req.hostname + req.originalUrl);
  }
  next();
};