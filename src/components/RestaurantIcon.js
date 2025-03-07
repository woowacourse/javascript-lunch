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
    if (category === CATEGORY.KOREAN.ALT) return CATEGORY.KOREAN.SRC;
    if (category === CATEGORY.CHINESE.ALT) return CATEGORY.CHINESE.SRC;
    if (category === CATEGORY.JAPANESE.ALT) return CATEGORY.JAPANESE.SRC;
    if (category === CATEGORY.WESTERN.ALT) return CATEGORY.WESTERN.SRC;
    if (category === CATEGORY.ASIAN.ALT) return CATEGORY.ASIAN.SRC;
    if (category === CATEGORY.ETC.ALT) return CATEGORY.ETC.SRC;
  };

  getElement() {
    return this.element;
  }
}

export default RestaurantIcon;
