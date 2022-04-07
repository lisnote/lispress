import config from "./config";
export default function (title: string) {
  return fetch(config().article.replace(/\{title\}/g,title))
  .then((resp) => resp.text())
}
