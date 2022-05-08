<script setup lang="ts">
import lispress from 'lispress';
</script>

<template>
  <div id="footer">
    <div>
      <a
        href="https://github.com/lisnote/lispress/"
        class="text-decoration-none"
        >LisPress</a
      >
      <span> powered by </span>
      <a href="https://github.com/lisnote" class="text-decoration-none"
        >lisnote</a
      >
    </div>
    <div>
      <a href="https://beian.miit.gov.cn/">{{lispress.config().record??''}}</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#footer {
  width: 100%;
  text-align: center;
  > div {
    padding-bottom: 10px;
    > a {
      color: gray;
      text-decoration: none;
    }
  }
}
</style>
