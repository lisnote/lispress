import ArticleList from '../views/ArticleList.vue';
import UserInformation from '../views/UserInformation.vue';

const route = {
  path: '/',
  name: 'home',
  components: {
    exhibitionArea: ArticleList,
    sidebar: UserInformation,
  },
};
export default route;
