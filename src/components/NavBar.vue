<script setup lang="ts"></script>

<template>
  <div id="nav-bar">
    <div>Lispress</div>
    <form>
      <input type="text" />
    </form>
  </div>
</template>

<style lang="scss">
#nav-bar {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 10px;
  > form {
    margin: 0 5px;
    > input {
      height: 30px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  }
  > div {
    font-size: 25px;
  }
}
</style>
