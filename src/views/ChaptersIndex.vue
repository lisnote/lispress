<script setup lang="ts">
import store from '../store';
import { computed } from 'vue';
let chapters = computed(() => {
  return store.article.querySelectorAll('h1,h2,h3,h4,h5,h6');
});
</script>

<template>
  <div id="chapters-index">
    <div
      v-for="chapter in chapters"
      :key="chapter.id"
      :href="`#${chapter.id}`"
      :style="{ '--level': chapter.tagName.substring(1) * 10 + '' }"
    >
      {{ chapter.innerHTML }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
#chapters-index {
  padding: 15px;
  > div {
    border-left: calc(var(--level) * 1px) solid white;
  }
}
</style>
