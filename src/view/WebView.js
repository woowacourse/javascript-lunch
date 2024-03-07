// 컴포넌트들을 저장하고 관리하는

export default class WebView {
  #categoryFilter;

  #sortingFilter;

  constructor() {
    this.#categoryFilter = document.querySelector('#category-filter');
    this.#sortingFilter = document.querySelector('#sorting-filter');
  }

  addEventListeners() {}
}
