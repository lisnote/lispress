<script setup lang="ts">
import ExhibitionArea from "./ExhibitionArea.vue";
import SideBar from "./Sidebar.vue";
import { nextTick } from "@vue/runtime-core";

// 侧边栏状态切换
nextTick(function () {
  let toggle = document.querySelector("#sidebar-toggle");
  let sidebar = document.querySelector("#main-content>div:nth-child(2)");
  function sidebarToggle() {
    if (sidebar?.classList.contains("show")) {
      sidebar?.classList.remove("show");
    } else {
      sidebar?.classList.add("show");
    }
  }
  toggle?.addEventListener("click", sidebarToggle);
  sidebar?.addEventListener("click", sidebarToggle);
});
</script>

<template>
  <div id="main-content">
    <div>
      <exhibition-area />
    </div>
    <div>
      <div>SideBar</div>
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
      background: white;
      @media screen and (max-width: 800px) {
        display: none;
        position: fixed;
        top: 60px;
        right: 0;
        bottom: 0px;
      }
      div {
        overflow-y: auto;
        position: fixed;
        width: 300px;
        top: 60px;
        bottom: 0;
      }
    }
  }
}
</style>
