const ArticleContent = () => import('@/views/ArticleContent.vue');
const ChaptersIndex = () => import('@/views/ChaptersIndex.vue');
import { RouteRecordRaw } from 'vue-router';

const articles: RouteRecordRaw = {
  path: '/articles',
  name: 'articles',
  components: {
    exhibitionArea: ArticleContent,
    sidebar: ChaptersIndex,
  },
};
export default articles;
