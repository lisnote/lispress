export default function (obj: Config = {}): Config {
  if (Reflect.has(obj, 'username')) {
    config.username = obj.username;
  } else if (config.username == null) {
    config.username = getUsername();
  }
  config = {
    ...init(config.username),
    ...config,
    ...obj,
  };
  return config;
}

declare interface Config {
  username?: string;
  clientID?: string;
  clientSecret?: string;
  articles?: string;
  article?: string;
  background?: string;
  avatar?: string;
}

// data container
let config: Config = {};

// init data
function init(username: string): object {
  return {
    articles: `https://api.github.com/repos/${username}/${username}.github.io/contents/articles`,
    article: `https://${username}.github.io/articles/{title}`,
    background: `https://${username}.github.io/articles/assets/{title}/background.jpg`,
    avatar: `https://avatars.githubusercontent.com/${username}`,
  };
}

// get username from host
function getUsername(): string {
  let username: string;
  let index = location.host.indexOf('.github.io');
  if (index == -1) {
    console.error(
      'Failed to obtain username,have you set the github.username in config.js?'
    );
    return 'lisnote';
  }
  username = location.host.substring(0, index);
  return username;
}
