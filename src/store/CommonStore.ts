import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';
export default defineStore('common', {
  state: () => {
    return {
      route: undefined as RouteLocationNormalized | undefined,
    };
  },
});
