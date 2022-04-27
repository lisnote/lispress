<script setup lang="ts">
import ExhibitionArea from "./ExhibitionArea.vue";
import SideBar from "./SideBar.vue";
</script>

<template>
  <div id="main-content">
    <div>
      <exhibition-area />
    </div>
    <div>
      <side-bar />
    </div>
  </div>
</template>

<style lang="scss">
#main-content {
  display: flex;
  height: 100%;
  > div {
    &:nth-child(1) {
      flex: 1;
    }
    &:nth-child(2) {
      border-left: 1px solid #ddd;
      width: 300px;
      background: whitesmoke;
    }
  }
}
</style>
