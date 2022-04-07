import config from './config';

export default function (title: string) {
  return config().background.replace(/\{title\}/g, title);
}
