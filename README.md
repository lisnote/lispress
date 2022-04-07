The core of [lispress](https://github.com/lisnote/lispress)

# Example

```html
<script src="https://cdn.jsdelivr.net/npm/lispress/dist/lispress.min.js"></script>
<script>
    lispress.config({
        // username: '',
        // clientID: '',
        // clientSecret: '',
        // articles: '',
        // article: '',
        // background: '',
        // avatar: '',
    })
    lispress.setAvatar("#avatar");
    lispress.setUsername("#username");
    lispress.setGithubUrl("#githubUrl")
    lispress.getArticleContent("Vue3.md").then(article => console.log(article.substring(0, 100)))
    // The next two lines must comment one of both
    // lispress.getArticlesTitle().then(arr => console.log(arr))
    lispress.getSearchArticlesTitle(["Java", "test"]).then(arr => console.log(arr))
</script>
```