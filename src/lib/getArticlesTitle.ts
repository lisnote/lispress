import common from './common';

export default function () {
  let titles: Array<string>;
  let dateMap: DateMap;
  let getarticles = common
    .getArticles()
    .then((thatTitles) => (titles = thatTitles));
  let getDateMap = common
    .getDateMap()
    .then((thatDateMap) => (dateMap = thatDateMap));
  return Promise.all([getarticles, getDateMap]).then(() => {
    titles.sort((x, y) => {
      return dateMap[y] - dateMap[x];
    });
    return titles;
  });
}