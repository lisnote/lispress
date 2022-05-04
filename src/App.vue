<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import MainContent from './components/MainContent.vue';
import BackToTop from './components/BackToTop.vue';
</script>

<template>
  <nav>
    <div>
      <div><nav-bar /></div>
    </div>
  </nav>
  <div>
    <div><main-content /></div>
  </div>
  <back-to-top />
</template>

<style lang="scss">
@import '@/styles/Common.scss';
// 结构样式
body {
  margin: 0;
}
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  > nav {
    height: $navbar-height;
    > div {
      position: fixed;
      z-index: 1000;
      width: 100%;
      height: $navbar-height;
      display: flex;
      justify-content: center;
      > div {
        width: 1200px;
        height: $navbar-height;
        background: white;
        border-bottom: 1px solid #ddd;
      }
    }
  }
  > div {
    flex: 1;
    min-width: 0;
    display: flex;
    justify-content: center;
    > div {
      width: 1200px;
    }
  }
}
</style>
