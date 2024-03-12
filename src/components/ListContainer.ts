class ListContainer extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
    <section class="restaurant-list-container"></section>
    `;
  }
}

customElements.define('matzip-list-container', ListContainer);
