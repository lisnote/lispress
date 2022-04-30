const ArticleContent = () => import('../views/ArticleContent.vue')
const ChaptersIndex = () => import('../views/ChaptersIndex.vue')

const articles = {
  path: '/articles',
  name: 'articles',
  components: {
    exhibitionArea: ArticleContent,
    sidebar: ChaptersIndex,
  },
};
export default articles;
