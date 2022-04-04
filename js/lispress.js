// 实现lispress的方法
// 将占位id的内容替换为有效值
function githubImpl() {
  // 获取username,若获取失败则使用lisnote作为用户名
  if (githubConfig.username == '') {
    try {
      githubConfig.username = /.*\/(.*)\.github\.io.*/.exec(location.href)[1];
    } catch (error) {
      console.error(
        'Failed to obtain username,have you set the github.username in config.js?'
      );
      githubConfig.username = 'lisnote';
    }
  }
  // 准备常用数据
  githubConfig.articles = `https://api.github.com/repos/${githubConfig.username}/${githubConfig.username}.github.io/contents/articles`;
  githubConfig.article = `https://${githubConfig.username}.github.io/articles/{article}`;
  githubConfig.background = `https://${githubConfig.username}.github.io/articles/assets/{article}/background.jpg`;
  githubConfig.avatar = `https://avatars.githubusercontent.com/${githubConfig.username}`;
  // 实现lispress对象的四个方法
  lispress.getArticles = getSortArticles;
  lispress.getSearchArticles = getSearchArticles;
  lispress.getArticle = (article) =>
    githubConfig.article.replace(/{article}/g, article);
  lispress.getBackgroundUrl = (article) =>
    githubConfig.background.replace(/{article}/g, article);
  // 将占位id的内容替换为有效值
  $(() => {
    $('#avatar').attr('src', githubConfig.avatar);
    $('#username').text(githubConfig.username);
    $('#githubUrl').attr('href', `https://github.com/${githubConfig.username}`);
    // Gitalk
    let article = getSearchParameter('article');
    if (
      article != '' &&
      githubConfig.username != '' &&
      githubConfig.clientID != ''
    ) {
      $('#comments').attr('id', 'gitalk-container');
      var gitalk = new Gitalk({
        clientID: githubConfig.clientID,
        clientSecret: githubConfig.clientSecret,
        repo: githubConfig.username + '.github.io',
        owner: githubConfig.username,
        admin: [githubConfig.username],
        id: article.substring(0, 49), // Ensure uniqueness and length less than 50
        distractionFreeMode: false, // Facebook-like distraction free mode
      });
      gitalk.render('gitalk-container');
    }
  });

  // 获取一个promise对象,该对象then方法会对回调函数传入排序后的文章列表
  async function getSortArticles() {
    let articles = [];
    let dateMap = {};
    return Promise.all([getArticles(articles), getDateMap(dateMap)]).then(
      () => {
        articles.sort((x, y) => {
          return dateMap[y] - dateMap[x];
        });
        return articles;
      }
    );
  }

  // param 字符串数组,查找的关键字
  // return promise对象,该对象then方法会对回调函数传入查找到的文章列表
  function getSearchArticles(keywords) {
    let articles = [];
    let dateMap = {};
    return Promise.all([getArticles(articles), getDateMap(dateMap)])
      .then(() => {
        let promises = [];
        let filter = [];
        for (let article of articles) {
          let promise = fetch(lispress.getArticle(article))
            .then((resp) => resp.text())
            .then((text) => {
              if (hasKeywords(keywords, article, text)) {
                filter.push(article);
              }
            });
          promises.push(promise);
        }
        return Promise.all(promises).then(() => {
          return filter;
        });
      })
      .then((filter) => {
        filter.sort((x, y) => {
          return dateMap[y] - dateMap[x];
        });
        return filter;
      });

    function hasKeywords(keywords, title, article) {
      for (let keyword of keywords) {
        if (title.indexOf(keyword) < 0 && article.indexOf(keyword) < 0) {
          return false;
        }
      }
      return true;
    }
  }

  // 获取文章队列
  async function getArticles(articles) {
    return fetch(githubConfig.articles, {
      headers: {
        authorization:
          'Basic ' +
          btoa(githubConfig.clientID + ':' + githubConfig.clientSecret),
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        json.forEach((obj) => {
          if (obj.name != 'assets' && obj.name != 'index.html') {
            articles.push(obj.name);
          }
        });
      });
  }

  // 获取文章与日期的映射
  async function getDateMap(dateMap) {
    await fetch(
      `https://api.github.com/search/code?q=date%20in:file%20user:${githubConfig.username}%20path:articles/%20language:markdown`,
      {
        headers: {
          Accept: 'application/vnd.github.v3.text-match+json',
          authorization:
            'Basic ' +
            btoa(githubConfig.clientID + ':' + githubConfig.clientSecret),
        },
      }
    )
      .then((resp) => resp.json())
      .then((result) => {
        result = result.items.filter((element) => {
          return !/articles\/.*\//.test(element.path);
        });
        result.forEach((element) => {
          try {
            dateMap[element.name] = Number(
              element.text_matches[0].fragment
                .match(/\d{4}(-\d{2}){2} \d{2}(:\d{2}){2}/)[0]
                .replace(/-| |:/g, '')
            );
          } catch {
            dateMap[element.name] = 0;
          }
        });
      });
  }
}

function customImpl() {}
