<script setup lang="ts">
import { ref } from "vue";
import lispress from "lispress";
import { marked } from "marked";

let article = ref();
lispress.getArticleContent("markdown基础语法与测试.md").then((text) => {
  if (text.indexOf("---") == 0) {
    text = text.replace(/---(.*\r?\n)*?---/, "");
  }
  text = marked(text);
  console.log(text);
  // article.value = text;
});
</script>

<template>
  <div id="article-content">
    <div id="all">
      <div id="main">
          <pre>asdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasdasdfasdfasdfasd</pre
          >
      </div>
      <div id="sidebar">侧边栏</div>
    </div>
  </div>
  <!-- <div id="article-content" v-html="article"></div> -->
</template>

<style lang="scss">
#article-content {
  #all {
    display: flex;
  }
  #main {
    flex: 1;
    min-width: 0;
    background-color: red;
  }
  #main > pre {
    max-width: 100%;
    overflow: auto;
  }
  #sidebar {
    /* background-color: black; */
    width: 500px;
  }
}
</style>