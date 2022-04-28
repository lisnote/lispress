<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import MainContent from "./components/MainContent.vue";
import BackToTop from "./components/BackToTop.vue";
</script>

<template>
  <nav>
    <div><navbar /></div>
  </nav>
  <div>
    <div><main-content /></div>
  </div>
  <back-to-top />
</template>

<style lang="scss">
// 结构样式
body {
  margin: 0;
}
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  > nav {
    position: sticky;
    top: 0;
    display: flex;
    height: 60px;
    justify-content: center;
    background: white;
    > div {
      width: 1200px;
      border-bottom: 1px solid #ddd;
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

// 公共样式
.show {
  display: block !important;
}
</style>
