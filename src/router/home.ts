import { defineAsyncComponent } from 'vue';

const ArticleList = defineAsyncComponent(
  () => import('../views/ArticleList.vue')
);
const UserInformation = defineAsyncComponent(
  () => import('../views/UserInformation.vue')
);

const route = {
  path: '/',
  name: 'home',
  components: {
    exhibitionArea: ArticleList,
    sidebar: UserInformation,
  },
};
export default route;
