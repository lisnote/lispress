let githubConfig = {
  // 自定义域名必须填写username
  username: '',
  // OAuth Apps,用于开启评论区及提高可访问性,申请地址 https://github.com/settings/developers
  clientID: '',
  clientSecret: '',
};

// 一般不需要修改,用于自定义服务器
var lispress = {
  // 负责实现lispress的其他字段和方法
  impl: githubImpl,
  // return promise对象,该对象then方法会对回调函数传入文章列表
  getArticles: null,
  // param 字符串数组,查找的关键字
  // return promise对象,该对象then方法会对回调函数传入查找到的文章列表
  getSearchArticles: null,
  // param string类型的文章名
  // return string类型的markdown直链
  getArticle: null,
  // param string类型文章/文件夹名
  // return string类型的background直链
  getBackgroundUrl: null,
};
lispress.impl();