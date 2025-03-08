import CATEGORY from '../constant/category.js';

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
    const url = `https://h0ngju.github.io/javascript-lunch/public/assets/category-`;
    return `${url}${CATEGORY[category]}.png` || `${url}${CATEGORY['기타']}.png`;
  };

  getElement() {
    return this.element;
  }
}

export default RestaurantIcon;
