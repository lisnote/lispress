<script setup lang="ts">
import lispress from "lispress";
import { reactive, nextTick } from "vue";
import { useRouter } from "vue-router";

// 读取数据
let data: { titles: Array<string> } = reactive({ titles: [] });
lispress.getArticlesTitle().then((titles) => {
  data.titles = titles;
});
</script>

<template>
  <div id="article-list">
    <router-link
      v-for="title in data.titles"
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
  </div>
</template>

<style lang="scss" scoped>
.article-cart {
  margin: 1.5rem;
  background: #ddd;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  z-index: -1;
  background-size: cover;
  &::after {
    display: block;
    padding-top: 56.25%;
    content: "";
  }
  > h1 {
    position: absolute;
    margin: 0;
    padding: 0 10px;
    width: 100%;
    background: rgba(245, 245, 245, 0.85);
  }
}
</style>
