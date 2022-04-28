import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import home from './home';
import articles from './articles';

const routes: Array<RouteRecordRaw> = [home, articles];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
