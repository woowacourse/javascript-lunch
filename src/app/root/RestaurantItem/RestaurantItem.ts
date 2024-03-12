import { RestaurantDataType } from '../../../type/restaurantDataType';
import { Asset } from '../../../asset/asset';

export default class RestaurantItem extends HTMLElement {
  private restaurantData: RestaurantDataType;

  constructor(restaurantData: RestaurantDataType) {
    super();
    this.restaurantData = restaurantData;
  }

  connectedCallback() {
    this.render();
  }

  private createCategoryBox(): HTMLDivElement {
    const categoryBox = document.createElement('div');
    categoryBox.classList.add('restaurant__category');

    const categoryImg = document.createElement('img');
    categoryImg.classList.add('category-icon');
    categoryImg.setAttribute('src', Asset.imageUrl[this.restaurantData.category]);
    categoryImg.setAttribute('alt', this.restaurantData.category);
    categoryBox.appendChild(categoryImg);

    return categoryBox;
  }

  private createInfoBox(): HTMLDivElement {
    const infoBox = document.createElement('div');
    infoBox.classList.add('restaurant__info');

    infoBox.appendChild(this.createRestaurantTitle());
    infoBox.appendChild(this.createRestaurantDistance());
    infoBox.appendChild(this.createRestaurantDescription());

    return infoBox;
  }

  private createRestaurantTitle(): HTMLHeadingElement {
    const title = document.createElement('h3');
    title.classList.add('restaurant__name', 'text-subtitle');
    title.textContent = this.restaurantData.name;
    return title;
  }

  private createRestaurantDistance(): HTMLSpanElement {
    const distance = document.createElement('span');
    distance.classList.add('restaurant__distance', 'text-body');
    distance.textContent = `캠퍼스부터 ${this.restaurantData.distanceByWalk}분 내`;
    return distance;
  }

  private createRestaurantDescription(): HTMLParagraphElement {
    const description = document.createElement('p');
    description.classList.add('restaurant__description', 'text-body');
    description.textContent = this.restaurantData.description ?? '';
    return description;
  }

  private render() {
    this.classList.add('restaurant');

    this.appendChild(this.createCategoryBox());
    this.appendChild(this.createInfoBox());
  }
}

customElements.define('restaurant-item', RestaurantItem);
