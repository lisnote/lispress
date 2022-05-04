import { defineStore } from 'pinia';

export const mainStore = defineStore('main', {
  state() {
    return {
      article: document.createElement('div'),
    };
  },
});
