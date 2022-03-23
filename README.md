[简体中文](assets/other/README_CN.md)

[DEMO](https://lisnote.github.io)

Record your learning in lispress.

# Description

I'm try to make blog deployment as simple as possible, such as:

1. Not required to configure action
2. Not required to manage the server
3. Not required to write a note also have to go to the website

# Deploy

1. Fork the repository

2. Renamed the repository that your fork as **YourUsername.github.io**

3. Wait a minute, deploy has started, and then visit **YourUsername.github.io**

# Usage

* Publish article
  
  Place your markdown files in the `articles` folder,deploy will autostart
* Add article cover
  
  For example, the `articles/assets/MarkdownTest.md/background.jpg` will be the cover image for `articles/MarkdownTest.md`
* Use auth
  
  Authorizing Oauth Apps in config. js to improve accessibility and activate gitalk comments system
* Custom domain
  
  The `githubConfig.username` option in `config.js` must be set before custom domain
* Independent pages
  
  Not only markdown will be indexed, but all files in articles except `assets` and `index.html` will be. The repository itself is an example, you should take a look at `articles` directory