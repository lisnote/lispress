import config from "./config";

export default function (selector: string): void {
  document.querySelectorAll(selector).forEach((obj: HTMLElement) => {
    obj.innerText = config().username;
  });
}
