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
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
        fill="currentColor"
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
  background: whitesmoke;
  border-radius: 10px;
  cursor: pointer;
}
</style>
