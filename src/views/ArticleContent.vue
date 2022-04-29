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
  article.value = text;
});
</script>

<template>
  <div id="article-content">
    <div id="article" v-html="article"></div>
  </div>
</template>

<style lang="scss">
#article-content {
  position: relative;
  z-index: -1;
  #article {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: red;
    pre {
      overflow-x: auto;
    }
    p,
    li {
      word-wrap: break-word;
      word-break: break-word;
    }
    blockquote {
      border-left: 5px solid #ddd;
      padding-left: 5px;
    }
    table {
      word-break: break-word;
      overflow: auto;
      background: #ddd;
      * {
        background: white;
      }
    }
    img {
      max-width: 100%;
    }
  }
}
</style>