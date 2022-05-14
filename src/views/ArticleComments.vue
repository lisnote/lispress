<script setup lang="ts">
import { useRoute } from 'vue-router';
import { nextTick } from 'vue';
import Gitalk from 'gitalk';
import lispress from 'lispress';

let title = useRoute().query.article as string;
let config = lispress.config();
const gitalk = new Gitalk({
  clientID: config.clientID + '',
  clientSecret: config.clientSecret + '',
  repo: config.username + '.github.io',
  owner: config.username as string,
  admin: [config.username as string],
  id: title.substring(0, 49),
  distractionFreeMode: false,
});
nextTick(() => {
  gitalk.render('gitalk-container');
});
</script>

<template>
  <div>
    <div id="gitalk-container"></div>
  </div>
</template>

<style lang="scss">
@import 'gitalk/dist/gitalk.css';
</style>
