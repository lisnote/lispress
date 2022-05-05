import { defineStore } from 'pinia';

export default defineStore('press', {
  state: () => {
    return {
      titles: [] as string[],
      article: document.createElement('div'),
    };
  },
});
