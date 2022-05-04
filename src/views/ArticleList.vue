<script setup lang="ts">
import { computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PressStore } from '../store';

// 基本数据
let route = useRoute();
let router = useRouter();
let pressStore = PressStore();
let page = computed(() => {
  return Number(route.query.page ?? 1);
});

// 文章列表处理
let titles = computed(() => {
  return pressStore.titles.slice((page.value - 1) * 10, page.value * 10);
});

// 翻页按钮逻辑
function isShowNextPage() {
  return page.value < Math.ceil(pressStore.titles.length / 10);
}
nextTick(() => {
  let prePage = document.querySelector('#article-list .pre-page');
  let nextPage = document.querySelector('#article-list .next-page');
  prePage?.addEventListener('click', () => {
    let query = {
      ...route.query,
    };
    if (page.value == 2) {
      Reflect.deleteProperty(query, 'page');
    } else {
      query.page = page.value - 1 + '';
    }
    router.push({
      query,
    });
  });
  nextPage?.addEventListener('click', () => {
    router.push({
      query: {
        page: page.value + 1,
      },
    });
  });
});
</script>

<template>
  <div id="article-list">
    <router-link
      v-for="title in titles"
      :key="title"
      :to="`/articles/?article=${title}`"
    >
      <div
        class="article-cart"
        :style="{
          'background-image': `url(https://lisnote.github.io/articles/assets/${title}/background.jpg)`,
        }"
      >
        <h1>{{ title }}</h1>
      </div>
    </router-link>
    <div class="page-turn">
      <button class="pre-page" v-show="page > 1">上一页</button>
      <button class="next-page" v-show="isShowNextPage()">下一页</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#article-list {
  .article-cart {
    margin: 1.5rem;
    background: #ddd;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    // z-index: -1;
    background-size: cover;
    &::after {
      display: block;
      padding-top: 56.25%;
      content: '';
    }
    > h1 {
      position: absolute;
      margin: 0;
      padding: 0 10px;
      width: 100%;
      background: rgba(245, 245, 245, 0.85);
    }
  }
  .page-turn {
    text-align: center;
    padding-bottom: 15px;
    button {
      background: none;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
