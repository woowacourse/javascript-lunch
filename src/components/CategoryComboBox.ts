import $ from '../util/dom';

class CategoryComboBox {
  #template;

  constructor() {
    this.#template = `<select name="category" id="category-filter" class="restaurant-filter">${[
      '전체',
      '한식',
      '중식',
      '일식',
      '양식',
      '아시안',
      '기타',
    ]
      .map((category) => `<option value="${category}">${category}</option>`)
      .join('')}</select>`;
    $('.restaurant-filter-container').insertAdjacentHTML('beforeend', this.#template);
  }
}

export default CategoryComboBox;
