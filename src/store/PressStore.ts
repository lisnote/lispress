import { defineStore } from 'pinia';

const PressStore = defineStore('press', {
  state: () => {
    return {
      article: document.createElement('div'),
    };
  },
});

export default PressStore;
