<script setup lang="ts">
import { mainStore } from '../store';
import { computed, ComputedRef, nextTick } from 'vue';

let store = mainStore();
let chapters = computed(function () {
  let nodes: NodeListOf<HTMLElement> =
    store.article.querySelectorAll('h1,h2,h3,h4,h5,h6');
  return Array.from(nodes);
});
nextTick(() => {
  let chaptersIndex = document.querySelector('#chapters-index');
  chaptersIndex?.addEventListener('click', (e) => {
    let id = (e.target as HTMLElement).dataset.id;
    if (id?.indexOf('#') == 0) {
      document.documentElement.scrollTop = (
        document.querySelector(id) as HTMLElement
      )?.offsetTop;
    }
  });
});
</script>

<template>
  <div id="chapters-index">
    <div
      v-for="chapter in chapters"
      :key="chapter.id"
      :style="{ '--level': Number(chapter.tagName.substring(1)) * 10 }"
    >
      <span :data-id="`#${chapter.id}`">
        {{ chapter.innerText }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#chapters-index {
  padding: 15px;
  > div {
    margin-left: calc(var(--level) * 1px);
    > span {
      cursor: pointer;
    }
  }
}
</style>
