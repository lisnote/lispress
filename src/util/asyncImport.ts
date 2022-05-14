import { defineAsyncComponent } from 'vue';
const asyncImport = (path: string) =>
  defineAsyncComponent(() => import(`../views/${path}.vue`));
export default asyncImport;
