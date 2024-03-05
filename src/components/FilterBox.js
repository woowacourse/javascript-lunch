class FilterBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.isConnected) {
      this.render();
      this.setEvent();
    }
  }

  disconnectedCallback() {
    this.removeEvent();
  }

  render() {
    const option = this.getAttribute('option');

    if (option === 'category') this.innerHTML = this.categoryTemplate();
    if (option === 'sorting') this.innerHTML = this.sortingTemplate();
  }

  setEvent() {}

  removeEvent() {}

  categoryTemplate() {
    const categoryOption = ['전체', '한식', '일식', '양식', '아시안', '기타'];

    return `
      <select name="category" class="restaurant-filter">
        ${categoryOption.map((categoryName) => `<option value=${categoryName}>${categoryName}</option>`)}
      </select>
    `;
  }

  sortingTemplate() {
    const sortingOption = ['이름순', '거리순'];

    return `
      <select name="sorting" class="restaurant-filter">
        ${sortingOption.map((sortingName) => `<option value=${sortingName}>${sortingName}</option>`)}
      </select>
    `;
  }
}

export default FilterBox;
