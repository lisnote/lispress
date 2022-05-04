import { createPinia, defineStore } from 'pinia';

const pinia = createPinia();
const PressStore = defineStore('main', {
  state: () => {
    return {
      titles: [] as string[],
      article: document.createElement('div'),
    };
  },
});

export {pinia as default,PressStore}