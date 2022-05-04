const ArticleList = () => import('@/views/ArticleList.vue');
const UserInformation = () => import('@/views/UserInformation.vue');
import { RouteRecordRaw } from 'vue-router';
import pinia, { PressStore } from '../store';

let pressStore = PressStore(pinia);
const route: RouteRecordRaw = {
  path: '/',
  name: 'home',
  components: {
    exhibitionArea: ArticleList,
    sidebar: UserInformation,
  },
  beforeEnter: (to, from) => {
    console.log(to, from);
    console.log(pressStore.article)
    return true;
  },
};
export default route;
