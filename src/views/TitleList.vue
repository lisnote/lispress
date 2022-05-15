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
      <router-link :to="prePage" class="pre-page" v-show="page > 1"
        >上一页</router-link
      >
      <router-link :to="nextPage" class="next-page" v-show="isShowNextPage()"
        >下一页</router-link
      >
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
        padding-left: 10px;
        h1 {
          margin: 0;
          overflow: hidden;
          color: black;
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
        }
      }
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
