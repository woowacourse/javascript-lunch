import korean from '../../templates/category-korean.png';
import chinese from '../../templates/category-chinese.png';
import japanese from '../../templates/category-japanese.png';
import western from '../../templates/category-western.png';
import asian from '../../templates/category-asian.png';
import etc from '../../templates/category-etc.png';

const CATEGORY_IMAGE_PATH = {
  한식: korean,
  중식: chinese,
  일식: japanese,
  양식: western,
  아시안: asian,
  기타: etc,
};

export default class RestaurantList {
  constructor(rootElement, restaurants) {
    this.$root = rootElement;
    this.restaurants = restaurants;
  }

  render() {
    this.$root.insertAdjacentHTML('beforeend', this.template());
  }

  template() {
    return `
      <ul class="restaurant-list">
        ${this.restaurants.reduce((html, restaurant) => {
          return html + RestaurantItemTemplate(restaurant);
        }, '')}
      </ul>
    `;
  }

  remove() {
    const list = this.$root.querySelector('.restaurant-list');
    list.remove();
  }
}

const RestaurantItemTemplate = ({ category, distance, name, description }) => {
  return `
    <li class="restaurant">
      <div class="restaurant__category">
        <img src="${CATEGORY_IMAGE_PATH[category]}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${description ?? ''}</p>
      </div>
    </li>
  `;
};
