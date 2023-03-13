import $ from '../util/dom';

class SortComboBox {
  #template;

  constructor() {
    this.#template = `<select name="sorting" id="sorting-filter" class="restaurant-filter">
    ${['이름', '거리']
      .map((condition) => `<option value="${condition}">${condition}순</option>`)
      .join('')}</select>`;
    $('.restaurant-filter-container').insertAdjacentHTML('beforeend', this.#template);
  }
}

export default SortComboBox;
