interface Window {
  lispress: Lispress;
}

interface Lispress {
  config: (config?: Config) => Config;
  getArticleContent?: (title:string) => Promise<string>;
  getArticlesTitle?: () => Promise<Array<string>>;
  getBackgroundUrl?: (title:string) => string;
  getSearchArticlesTitle?: (keywords:Array<string>) => Promise<Array<string>>;
  setAvatar?: (selector: string) => void;
  setGithubUrl?: (selector: string) => void;
  setUsername?: (selector: string) => void;
}

interface Config {
  username?: string;
  clientID?: string;
  clientSecret?: string;
  articles?: string;
  article?: string;
  background?: string;
  avatar?: string;
}

interface DateMap {
  [key: string]: number;
}