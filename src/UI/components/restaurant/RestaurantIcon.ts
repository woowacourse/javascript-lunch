import CATEGORY from '../../constant/category';

class RestaurantIcon {
  private element: HTMLDivElement;

  constructor(category: string) {
    this.element = this.#createRestaurantIcon(category);
  }

  #createRestaurantIcon(category: string): HTMLDivElement {
    const divIcon = document.createElement('div');
    divIcon.classList.add('restaurant__category');

    const img = document.createElement('img');
    img.classList.add('category-icon');
    img.src = this.#getImageSrc(category);
    img.alt = category;

    divIcon.appendChild(img);
    return divIcon;
  }

  #getImageSrc(category: string): string {
    switch (category) {
      case CATEGORY.KOREAN.ALT:
        return CATEGORY.KOREAN.SRC;
      case CATEGORY.CHINESE.ALT:
        return CATEGORY.CHINESE.SRC;
      case CATEGORY.JAPANESE.ALT:
        return CATEGORY.JAPANESE.SRC;
      case CATEGORY.WESTERN.ALT:
        return CATEGORY.WESTERN.SRC;
      case CATEGORY.ASIAN.ALT:
        return CATEGORY.ASIAN.SRC;
      default:
        return CATEGORY.ETC.SRC;
    }
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export default RestaurantIcon;
