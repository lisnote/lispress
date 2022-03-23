// 实现lispress的方法
// 将占位id的内容替换为有效值
function githubImpl() {
  // 获取username,若获取失败则使用lisnote作为用户名
  if (githubConfig.username == "") {
    try {
      githubConfig.username = /.*\/(.*)\.github\.io.*/.exec(location.href)[1];
    } catch (error) {
      console.error(
        "Failed to obtain username,have you set the github.username in config.js?"
      );
      githubConfig.username = "lisnote";
    }
  }
  // 准备常用数据
  githubConfig.articles = `https://api.github.com/repos/${githubConfig.username}/${githubConfig.username}.github.io/contents/articles`;
  githubConfig.article = `https://${githubConfig.username}.github.io/articles/{article}`;
  githubConfig.background = `https://${githubConfig.username}.github.io/articles/assets/{article}/background.jpg`;
  githubConfig.avatar = `https://avatars.githubusercontent.com/${githubConfig.username}`;
  // 实现lispress对象的四个方法
  lispress.articles = articlesDecorator();
  lispress.getSearchArticles;
  lispress.getArticle = (article) =>
    githubConfig.article.replace(/{article}/g, article);
  lispress.getBackground = (article) =>
    githubConfig.background.replace(/{article}/g, article);
  // 将占位id的内容替换为有效值
  $(() => {
    $("#avatar").attr("src", githubConfig.avatar);
    $("#username").text(githubConfig.username);
    $("#githubUrl").attr("href", `https://github.com/${githubConfig.username}`);
    // Gitalk
    let article = getSearchParameter("article");
    if (
      article != "" &&
      githubConfig.username != "" &&
      githubConfig.clientID != ""
    ) {
      $("#comments").attr("id", "gitalk-container");
      var gitalk = new Gitalk({
        clientID: githubConfig.clientID,
        clientSecret: githubConfig.clientSecret,
        repo: githubConfig.username + ".github.io",
        owner: githubConfig.username,
        admin: [githubConfig.username],
        id: article.substring(0, 49), // Ensure uniqueness and length less than 50
        distractionFreeMode: false, // Facebook-like distraction free mode
      });
      gitalk.render("gitalk-container");
    }
  });

  // 解析articles文件目录为数组并返回,忽略assets/和index.html
  function articlesDecorator() {
    let articles = [];
    if (location.pathname != "/") {
      return articles;
    }
    articles = getArticles();
    sortArticles(articles);
    return articles;
  }
  // 获取文章
  function getArticles() {
    let articles = [];
    if (location.pathname == "/") {
      $.ajax({
        url: githubConfig.articles,
        async: false,
        headers: {
          authorization:
            "Basic " + btoa(githubConfig.clientID + ":" + githubConfig.clientSecret),
        },
        success: function (result) {
          for (let i = 0; i < result.length; i++) {
            if (result[i].name == "assets" || result[i].name == "index.html")
              continue;
            articles.push(result[i].name);
          }
        },
      });
    }
    return articles;
  }
  // 对传入文章进行排序
  function sortArticles(articles) {
    let dateMap = {};
    $.get({
      url: `https://api.github.com/search/code?q=date%20in:file%20user:${githubConfig.username}%20path:articles/%20language:markdown`,
      headers: {
        Accept: "application/vnd.github.v3.text-match+json",
      },
      async: false,
      success(result) {
        result = result.items.filter((element) => {
          return !/articles\/.*\//.test(element.path);
        });
        result.forEach((element) => {
          try {
            dateMap[element.name] = Number(
              element.text_matches[0].fragment
                .match(/\d{4}(-\d{2}){2} \d{2}(:\d{2}){2}/)[0]
                .replace(/-| |:/g, "")
            );
          } catch {
            dateMap[element.name] = 0;
          }
        });
      },
    });
    articles.sort((x, y) => {
      return dateMap[y] - dateMap[x];
    });
  }
}

function customImpl() {}
