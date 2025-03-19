import CATEGORY from '../../constant/category.js';

const RESTAURANT_ICON = (src, alt) => {
  return `<img src=${src} alt=${alt} class="category-icon">`;
};

class RestaurantIcon {
  constructor(category) {
    return this.#createRestaurantIcon(category);
  }

  #createRestaurantIcon = (category) => {
    const divIcon = document.createElement('div');
    divIcon.classList = 'restaurant__category';
    divIcon.innerHTML = RESTAURANT_ICON(this.#getImageSrc(category), category);

    return divIcon;
  };

  #getImageSrc = (category) => {
    const url = `https://h0ngju.github.io/javascript-lunch/assets/category-`;
    const key = CATEGORY[category] ? category : 'etc';
    return `${url}${key}.png`;
  };

  getElement() {
    return this.element;
  }
}

export default RestaurantIcon;
