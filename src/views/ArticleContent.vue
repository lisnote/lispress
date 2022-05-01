<script setup lang="ts">
import { useRoute } from 'vue-router';
import lispress from 'lispress';
import { marked } from 'marked';
import hljs from 'highlight.js/lib/common';
import store from '../store';
import { onUnmounted } from 'vue';

let title = useRoute().query.article as string;
lispress.getArticleContent(title).then((text) => {
  if (text.indexOf('---') == 0) {
    text = text.replace(/---(.*\r?\n)*?---/, '');
  }
  let element = document.createElement('div');
  element.innerHTML = marked(text);
  element.querySelectorAll('pre>code').forEach((el) => {
    hljs.highlightElement(el as HTMLElement);
  });
  store.article = element;
});

onUnmounted(() => {
  store.article.innerHTML = '';
});
</script>

<template>
  <div id="article-content">
    <div id="article" v-html="store.article.innerHTML"></div>
  </div>
</template>

<style lang="scss">
@import 'highlight.js/styles/default.css';
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
