<script setup lang="ts">
import { useRoute } from 'vue-router';
import lispress from 'lispress';
import { marked } from '../util/marked.esm';
import hljs from 'highlight.js/lib/common';
import { PressStore } from '../store';
import { onUnmounted, defineAsyncComponent } from 'vue';
import PoweredBy from './PoweredBy.vue';
const ArticleComments = defineAsyncComponent(
  () => import('./ArticleComments.vue'),
);

let pressStore = PressStore();
pressStore.article.innerHTML = '<h3 class="loading-dot">Loading Article</h3>';
let title = useRoute().query.article as string;

marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code).value;
  },
  baseUrl: `https://${lispress.config().username}.github.io/articles/`,
});
lispress.getArticleContent(title).then((text) => {
  if (text.indexOf('---') == 0) {
    text = text.replace(/---(.*\r?\n)*?---/, '');
  }
  let element = document.createElement('div');
  element.innerHTML = marked.parse(text);
  pressStore.article = element;
});
</script>

<template>
  <div id="article-content">
    <div>
      <div id="article" v-html="pressStore.article.innerHTML"></div>
      <hr />
      <suspense>
        <template #default>
          <article-comments />
        </template>
        <template #fallback>
          <h3 class="loading-dot">Loading Comments</h3>
        </template>
      </suspense>
      <powered-by />
    </div>
  </div>
</template>

<style lang="scss">
@import 'highlight.js/styles/default.css';

#article-content {
  position: relative;
  > div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 15px;
    #article {
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
      pre {
        background: #f3f3f3;
        padding: 1em;
        color: #444;
      }
    }
  }
}

.loading-dot::after {
  content: '';
  animation: loading-dot 2s infinite;
}
@keyframes loading-dot {
  25% {
    content: '.';
  }
  50% {
    content: '..';
  }
  75% {
    content: '...';
  }
}
</style>
