<script setup lang="ts">
import lispress from "lispress";
import { reactive, nextTick } from "vue";
import { useRouter } from "vue-router";

// 读取数据
let data: { titles: Array<string> } = reactive({ data: null });
lispress.getArticlesTitle().then((titles) => {
  console.log(titles);
  data.titles = titles;
});
</script>

<template>
  <router-link to="/articles">查看文章</router-link>
  <p>Article List</p>
  <div id="article-list">
    <div class="article-cart" v-for="title in data.titles" :key="title">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-cart {
  margin: 1.5rem;
  background: #ddd;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  &::after {
    display: block;
    padding-top: 56.25%;
    content: "";
    background-image: url(https://lisnote.github.io/articles/assets/FrontEnd.md/background.jpg);
    background-size: cover;
  }
  > * {
    position: absolute;
    margin: 0;
    padding: 0 10px;
    width: 100%;
    background: rgba(245, 245, 245, 0.85);
  }
}
</style>
