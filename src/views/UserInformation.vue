<script setup lang="ts">
import lispress from 'lispress';
let avatar = lispress.config().avatar;
let username = lispress.config().username;
let github = 'https://github.com/' + username;
</script>

<template>
  <div id="user-information">
    <div>
      <p><img :src="avatar" /></p>
      <p>{{ username }}</p>
      <p><a :href="github">Github</a></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#user-information {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 60px;
  bottom: 0;
  width: 300px;
  > div > p {
    text-align: center;
    > img {
      width: 100px;
      border-radius: 50px;
    }
    > a {
      text-decoration: none;
      color: gray;
    }
  }
}
</style>
