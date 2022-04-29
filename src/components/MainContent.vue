<script setup lang="ts">
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
    <div id="exhibition-area">
      <router-view name="exhibitionArea"></router-view>
    </div>
    <div id="sidebar">
      <div>
        <router-view name="sidebar"></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#main-content {
  display: flex;
  height: 100%;
  #exhibition-area {
    flex: 1;
    min-width: 0;
  }
  #sidebar {
    width: 300px;
    background: white;
    @media screen and (max-width: 800px) {
      display: none;
      position: fixed;
      top: 60px;
      right: 0;
      bottom: 0px;
      cursor: pointer;
    }
    >div{
      border-left: 1px solid #ddd;
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
</style>
