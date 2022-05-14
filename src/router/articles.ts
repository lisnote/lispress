import { RouteRecordRaw } from 'vue-router';
import asyncImport from '../util/asyncImport';

const articles: RouteRecordRaw = {
  path: '/articles',
  name: 'articles',
  components: {
    exhibitionArea: asyncImport('ArticleContent'),
    sidebar: asyncImport('ChaptersIndex'),
  },
};
export default articles;
