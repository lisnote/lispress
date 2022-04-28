<script setup lang="ts">
import lispress from "lispress";
lispress.getSearchArticlesTitle().then(title=>console.log(title))
let titles = [1, 2, 3, 4];
</script>

<template>
  <router-link to="/articles">查看文章</router-link>
  <p>Article List</p>
  <div class="article-cart" v-for="title in titles" :key="title"></div>
</template>

<style lang="scss" scoped>
.article-cart {
  margin: 1.5rem;
  background: red;
  &::before {
    box-sizing: border-box;
    display: block;
    padding-top: 56.25%;
    content: "";
    background-image: url(https://lisnote.github.io/articles/assets/FrontEnd.md/background.jpg);
    background-size: cover;
  }
}
</style>
