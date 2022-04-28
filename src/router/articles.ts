import ArticleContent from '../views/ArticleContent.vue';
import ChaptersIndex from '../views/ChaptersIndex.vue';

const articles = {
  path: '/articles',
  name: 'articles',
  components: {
    exhibitionArea: ArticleContent,
    sidebar: ChaptersIndex,
  },
};
export default articles;
