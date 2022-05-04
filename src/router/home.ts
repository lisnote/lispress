const ArticleList = () => import('@/views/ArticleList.vue');
const UserInformation = () => import('@/views/UserInformation.vue');
import { RouteRecordRaw } from 'vue-router';

const route: RouteRecordRaw = {
  path: '/',
  name: 'home',
  components: {
    exhibitionArea: ArticleList,
    sidebar: UserInformation,
  },
};
export default route;
