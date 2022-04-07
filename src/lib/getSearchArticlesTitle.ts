import common from './common';
import getArticleContent from './getArticleContent';
export default function (keywords: Array<string>) {
  let titles: Array<string>;
  let dateMap: DateMap;
  let getarticles = common
    .getArticles()
    .then((thatTitles) => (titles = thatTitles));
  let getDateMap = common
    .getDateMap()
    .then((thatDateMap) => (dateMap = thatDateMap));
  return Promise.all([getarticles, getDateMap]).then(() => {
    let promises:Array<Promise<void>> = [];
    let filter:Array<string> = [];
    for (let title of titles) {
      let promise = getArticleContent(title)
        .then((article) => {
          if (hasKeywords(keywords, title, article)) {
            filter.push(title);
          }
        });
      promises.push(promise);
    }
    return Promise.all(promises).then(() => {
      filter.sort((x, y) => {
        return dateMap[y] - dateMap[x];
      });
      return filter;
    });
  });

  function hasKeywords(
    keywords: Array<string>,
    title: string,
    article: string
  ): boolean {
    for (let keyword of keywords) {
      if (title.indexOf(keyword) < 0 && article.indexOf(keyword) < 0) {
        return false;
      }
    }
    return true;
  }
}
