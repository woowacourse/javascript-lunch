export default class Portal {
  #portal: HTMLElement;

  constructor(id: string) {
    const portal = document.getElementById(id);

    if (!portal) throw new Error('id를 가진 포탈을 돔 트리에 만들어주세요!');

    this.#portal = portal;
  }

  append(element: HTMLElement) {
    this.#portal.append(element);
  }

  clear() {
    this.#portal.innerHTML = '';
  }
}
