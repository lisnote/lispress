<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import lispress from "lispress";
import { marked } from "marked";
import hljs from "highlight.js";

let article = ref();
const route = useRoute();
lispress.getArticleContent(route.query.article).then((text) => {
  if (text.indexOf("---") == 0) {
    text = text.replace(/---(.*\r?\n)*?---/, "");
  }
  text = marked(text);

  let element = document.createElement("div");
  element.innerHTML = text;
  console.log(element)
  let temp = element.querySelectorAll("div");
  console.log(temp)

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
  #article {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 15px;
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