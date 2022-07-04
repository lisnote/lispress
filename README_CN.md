[English](./README.md)

[演示](https://lisnote.com)

部署简单的网站,用来记记笔记

# 关于lispress

将部署博客简单化

1. 不需要配置action
2. 不需要管理服务器
3. 不需要写个笔记还得到网站进行编辑

# 部署

1. fork本仓库

2. 命名仓库名为 **你的用户名.github.io**

3. 部署自动开始,稍后即可访问 **你的用户名.github.io**

# 基本用法

* 写好的markdown放到articles文件夹下就可以自动发布
* 在articles/assets/下的目录名如果存在对应的文章,该目录下的background.jpg文件将会成为该文章的标题图片
* 在config.js配置token可提高github api使用次数(每小时5000),还可以开启gitalk留言
* articles文件夹下的markdown文件会被解析,而非markdown文件则会被直接索引,这意味着你可以建一个文件夹放一些单独的页面