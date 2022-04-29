<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import lispress from "lispress";
import { marked } from "marked";
import hljs from "highlight.js";

let article = ref();
const route = useRoute();
lispress.getArticleContent(route.query.article as string).then((text) => {
  if (text.indexOf("---") == 0) {
    text = text.replace(/---(.*\r?\n)*?---/, "");
  }
  let element = document.createElement("div");
  element.innerHTML = marked(text);
  element.querySelectorAll("pre>code").forEach(el  => {
    hljs.highlightElement(el as HTMLElement);
  });
  article.value = element.innerHTML;
});
</script>

<template>
  <div id="article-content">
    <div id="article" v-html="article"></div>
  </div>
</template>

<style lang="scss">
@import url(https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/default.min.css);
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