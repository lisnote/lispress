const ArticleList = () => import('@/views/ArticleList.vue')
const UserInformation = () => import('@/views/UserInformation.vue')

const route = {
  path: '/',
  name: 'home',
  components: {
    exhibitionArea: ArticleList,
    sidebar: UserInformation,
  },
};
export default route;
