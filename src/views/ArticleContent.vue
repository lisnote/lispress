<script setup lang="ts">
import { useRoute } from 'vue-router';
import lispress from 'lispress';
import { marked } from '../util/marked.esm';
import hljs from 'highlight.js/lib/common';
import { PressStore } from '../store';
import { nextTick, onUnmounted } from 'vue';
import Gitalk from 'gitalk';

let pressStore = PressStore();
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
  pressStore.article = element;
});

let config = lispress.config();
const gitalk = new Gitalk({
  clientID: config.clientID + '',
  clientSecret: config.clientSecret + '',
  repo: config.username + '.github.io',
  owner: config.username as string,
  admin: [config.username as string],
  id: title.substring(0, 49),
  distractionFreeMode: false,
});
nextTick(() => {
  gitalk.render('gitalk-container');
});
onUnmounted(() => {
  pressStore.article.innerHTML = '';
});
</script>

<template>
  <div id="article-content">
    <div>
      <div id="article" v-html="pressStore.article.innerHTML"></div>
      <hr />
      <div id="gitalk-container"></div>
    </div>
  </div>
</template>

<style lang="scss">
@import 'highlight.js/styles/default.css';
@import 'gitalk/dist/gitalk.css';

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
    }
    #gitalk-container {
      padding: 10px 0;
    }
  }
  .gt-meta{
    z-index: 0;
  }
}
</style>
