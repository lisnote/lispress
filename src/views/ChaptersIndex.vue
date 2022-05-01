<script setup lang="ts">
import store from '../store';
</script>

<template>
  <div v-html="store.article.innerHTML"></div>
</template>

<style lang="scss" scoped></style>
