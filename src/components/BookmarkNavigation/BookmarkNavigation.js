export default class BookmarkNavigation {
  #element;

  constructor(element) {
    this.#element = element;
    this.render();
  }

  render() {
    this.#element.innerHTML = /*html*/ `
      <ul class="restaurant-list-selector">
        <li class="restaurant-list-select-item selected--item">모든 음식점</li>
        <li class="restaurant-list-select-item">자주 가는 음식점</li>
      </ul>
    `;
  }
}
