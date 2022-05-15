<script setup lang="ts">
import { nextTick } from 'vue';

nextTick(() => {
  let backToTop = document.querySelector('#back-to-top') as HTMLElement;
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });
});
</script>

<template>
  <div id="back-to-top">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
#back-to-top {
  display: none;
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  color: gray;
  transition: all 0.5s;
  &:hover {
    color: black;
  }
}
</style>
