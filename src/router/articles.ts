import { defineAsyncComponent } from 'vue';

const ArticleContent = defineAsyncComponent(
  () => import('../views/ArticleContent.vue')
);
const ChaptersIndex = defineAsyncComponent(
  () => import('../views/ChaptersIndex.vue')
);

const articles = {
  path: '/articles',
  name: 'articles',
  components: {
    exhibitionArea: ArticleContent,
    sidebar: ChaptersIndex,
  },
};
export default articles;
