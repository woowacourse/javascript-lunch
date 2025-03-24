import { HTMLTagName } from "../type";

export const getHTML = (id: string) =>
  document.getElementById(id) as HTMLElement;

export const createElement = (tag: HTMLTagName) => document.createElement(tag);

export function toElement(htmlString: string): HTMLElement {
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  return template.content.firstElementChild as HTMLElement;
}
