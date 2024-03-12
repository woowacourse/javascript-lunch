export default class RestaurantItem extends HTMLLIElement {
  constructor() {
    super();

    const template = document.querySelector('#template-restaurant-item');
    const content = template.content.cloneNode(true);
    this.appendChild(content);
    this.classList.add('restaurant');
  }

  static observedAttributes = ['data-restaurant'];

  get restaurant() {
    if (!this.dataset.restaurant) {
      return {};
    }
    return JSON.parse(this.dataset.restaurant);
  }

  set restaurant(value) {
    this.setAttribute('data-restaurant', JSON.stringify(value));
  }

  attributeChangedCallback() {
    this.#initRestaurantItem();
  }

  #initRestaurantItem() {
    const { category, name, distance, description } = this.restaurant;

    this.querySelector('.restaurant__name').textContent = name;
    this.querySelector('.restaurant__distance').textContent = `캠퍼스로부터 ${distance}분 내 `;
    this.querySelector('.restaurant__description').textContent = description;
    this.querySelector('.category-icon').src = this.#getCategoryIconUrl(category);
    this.querySelector('.category-icon').alt = category;
  }

  #getCategoryIconUrl(category) {
    if (category === '한식') return './category-korean.png';
    if (category === '중식') return './category-chinese.png';
    if (category === '일식') return './category-japanese.png';
    if (category === '양식') return './category-western.png';
    if (category === '아시안') return './category-asian.png';
    if (category === '기타') return './category-etc.png';
    return '';
  }
}
