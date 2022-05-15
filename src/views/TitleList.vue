<script lang="ts" setup>
import { computed, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import lispress from 'lispress';
import PoweredBy from './PoweredBy.vue';

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
  <div id="title-list">
    <div class="article-card">
      <transition-group
        appear
        enter-active-class="fadeInUp"
        leave-active-class="fadeOutUp"
      >
        <div v-for="title in titles" :key="title">
          <router-link :to="`/articles/?article=${title}`">
            <div
              :style="{
                'background-image': `url(https://${
                  lispress.config().username
                }.github.io/articles/assets/${title}/background.jpg)`,
              }"
            >
              <div>
                <h1>{{ title }}</h1>
              </div>
            </div>
          </router-link>
        </div>
      </transition-group>
    </div>

    <div class="page-turn">
      <router-link :to="prePage" class="pre-page" v-show="page > 1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="currentColor"
          class="bi bi-caret-left-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"
          />
        </svg>
      </router-link>
      <router-link :to="nextPage" class="next-page" v-show="isShowNextPage()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="currentColor"
          class="bi bi-caret-right-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
          />
        </svg>
      </router-link>
    </div>
    <powered-by />
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/animate.scss';

#title-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  .article-card {
    flex: 1 1;
    > div > a > div {
      margin: 1.5rem;
      background: #ddd;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      background-size: cover;
      background-position: center;
      transition: all 0.5s;
      box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
        0 1px 5px 0 rgb(0 0 0 / 12%);
      &:hover {
        box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%),
          0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%);
      }
      &::after {
        display: block;
        padding-top: 56.25%;
        content: '';
      }
      div {
        position: absolute;
        width: 100%;
        background: rgba(245, 245, 245, 0.85);
        h1 {
          padding: 0 10px 5px 10px;
          margin: 0;
          overflow: hidden;
          color: black;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .page-turn {
    text-align: center;
    a > svg {
      width: 50px;
      height: 50px;
      cursor: pointer;
      color: gray;
      transition: all 0.5s;
      &:hover {
        color: black;
      }
    }
  }
}
</style>
