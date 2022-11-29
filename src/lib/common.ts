import config from './config';
declare global {
  interface DateMap {
    [key: string]: number;
  }
}
function getArticles(): Promise<Array<string>> {
  return fetch(config().articles, {
    headers: {
      authorization:
        'Basic ' + btoa(config().clientID + ':' + config().clientSecret),
    },
  })
    .then((resp) => resp.json())
    .then((json) => {
      return json
        .map((obj: any) => obj.name)
        .filter((obj: string) => obj != 'index.html' && obj != 'assets');
    });
}

function getDateMap(): Promise<DateMap> {
  let dateMap: DateMap = {};
  return fetch(
    `https://api.github.com/search/code?q=date%20user:${
      config().username
    }%20path:articles/%20language:markdown`,
    {
      headers: {
        Accept: 'application/vnd.github.v3.text-match+json',
        authorization:
          'Basic ' + btoa(config().clientID + ':' + config().clientSecret),
      },
    },
  )
    .then((resp) => resp.json())
    .then((result) => {
      try {
        result = result.items.filter((element: any) => {
          return !/articles\/.*\//.test(element.path);
        });
        result.forEach((element: any) => {
          try {
            dateMap[element.name] = Number(
              element.text_matches[0].fragment
                .match(/\d{4}(-\d{2}){2} \d{2}(:\d{2}){2}/)[0]
                .replace(/-| |:/g, ''),
            );
          } catch {
            console.error("Fail to sort by date, API rate limit exceeded.");
            dateMap[element.name] = 0;
          }
        });
        return dateMap;
      } catch (e) {
        throw new Error('Sort failed, API rate limit exceeded.');
      }
    });
}

export default {
  getArticles,
  getDateMap,
};
