<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import lispress from 'lispress';

// 基本数据
let route = useRoute();
let page = computed(() => {
  return Number(route.query.page ?? 1);
});
let pageLength = 10;
let allTitles = ref<string[]>([]);
let titles = computed<string[]>(() => {
  return allTitles.value.slice(
    (page.value - 1) * pageLength,
    page.value * pageLength,
  );
});
let search = computed(() => {
  return route.query.search ?? '';
});

// 文章更新
refreshTitles();
watch(search, () => {
  allTitles.value = [];
  refreshTitles();
});
function refreshTitles() {
  if (search.value) {
    lispress
      .getSearchArticlesTitle((search.value as string).split(' '))
      .then((titles) => {
        allTitles.value = titles;
      });
  } else {
    lispress.getArticlesTitle().then((titles) => {
      allTitles.value = titles;
    });
  }
}

// 翻页按钮逻辑
function isShowNextPage() {
  return page.value < Math.ceil(allTitles.value.length / pageLength);
}
let prePage = computed(() => {
  let query = {
    ...route.query,
  };
  if (page.value == 2) {
    delete query.page;
  } else {
    query.page = page.value - 1 + '';
  }
  return { query };
});
let nextPage = computed(() => {
  let query = {
    ...route.query,
  };
  query.page = page.value + 1 + '';
  return { query };
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
      <router-link :to="prePage" class="pre-page" v-show="page > 1"
        >上一页</router-link
      >
      <router-link :to="nextPage" class="next-page" v-show="isShowNextPage()"
        >下一页</router-link
      >
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
    a {
      margin: 15px;
      text-decoration: none;
      color: black;
    }
  }
}
</style>
