import { RouteRecordRaw } from 'vue-router';
import asyncImport from '../util/asyncImport';

const route: RouteRecordRaw = {
  path: '/',
  name: 'home',
  components: {
    exhibitionArea: asyncImport('TitleList'),
    sidebar: asyncImport('UserInformation'),
  },
};
export default route;
