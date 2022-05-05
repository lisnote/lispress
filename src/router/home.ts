const TitleList = () => import('@/views/TitleList.vue');
const UserInformation = () => import('@/views/UserInformation.vue');
import { RouteRecordRaw } from 'vue-router';

const route: RouteRecordRaw = {
  path: '/',
  name: 'home',
  components: {
    exhibitionArea: TitleList,
    sidebar: UserInformation,
  },
};
export default route;
