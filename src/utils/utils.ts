import { HTMLTagName } from "../type";

export const getHTML = (id: string) =>
  document.getElementById(id) as HTMLElement;

export const createElement = (tag: HTMLTagName) => document.createElement(tag);
