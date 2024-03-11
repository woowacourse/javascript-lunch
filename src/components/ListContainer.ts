class ListContainer extends HTMLUListElement {
  constructor() {
    super();
    this.className = 'restaurant-lists'
  }
}

customElements.define('matzip-list-container', ListContainer, { extends: 'ul' });

export default ListContainer;
