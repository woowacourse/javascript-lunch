import { RestaurantDataType } from '../../../type/restaurantDataType';
import { Asset } from '../../../asset/asset';
import { Category } from '../../../enum/enums';
import './RestaurantItem.css';

export default class RestaurantItem extends HTMLElement {
  private restaurantData: RestaurantDataType;
  private restaurantInfoContainer: RestaurantInfoContainer;
  private favoriteButton: FavoriteButton;

  constructor(restaurantData: RestaurantDataType) {
    super();
    this.restaurantData = restaurantData;
    this.restaurantInfoContainer = new RestaurantInfoContainer(restaurantData);
    this.favoriteButton = new FavoriteButton(restaurantData.favorite ?? false);
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  disconnectedCallback() {
    this.querySelector('button.restaurant__favorite-button')?.removeEventListener(
      'click',
      this.toggleFavorite.bind(this),
    );
  }

  private addEvent() {
    this.querySelector('button.restaurant__favorite-button')?.addEventListener('click', this.toggleFavorite.bind(this));
  }

  private toggleFavorite() {
    this.restaurantData.favorite = !this.restaurantData.favorite;
    this.favoriteButton.setFavorited(this.restaurantData.favorite);
    this.dispatchEvent(
      new CustomEvent('updateFavorite', {
        detail: { name: this.restaurantData.name, isFavorited: this.restaurantData.favorite },
      }),
    );
  }

  private render() {
    this.classList.add('restaurant');

    this.appendChild(createCategoryContainer(this.restaurantData.category));
    this.appendChild(this.restaurantInfoContainer.render());
    this.appendChild(this.favoriteButton.render());
  }
}

customElements.define('restaurant-item', RestaurantItem);

export function createCategoryContainer(category: Category) {
  const createCategoryContainer = document.createElement('div');
  createCategoryContainer.classList.add('restaurant__category');

  const categoryIcon = document.createElement('img');
  categoryIcon.classList.add('category-icon');
  categoryIcon.setAttribute('src', Asset.imageUrl[category]);
  categoryIcon.setAttribute('alt', category);
  createCategoryContainer.appendChild(categoryIcon);

  return createCategoryContainer;
}

export class RestaurantInfoContainer {
  private restaurantData: RestaurantDataType;

  constructor(restaurantData: RestaurantDataType) {
    this.restaurantData = restaurantData;
  }

  render() {
    const container = document.createElement('div');
    container.classList.add('restaurant__info');

    container.appendChild(this.createRestaurantTitle());
    container.appendChild(this.createRestaurantDistance());
    container.appendChild(this.createRestaurantDescription());

    return container;
  }

  private createRestaurantTitle() {
    const title = document.createElement('h3');
    title.classList.add('restaurant__name', 'text-subtitle');
    title.textContent = this.restaurantData.name;
    return title;
  }

  private createRestaurantDistance() {
    const distance = document.createElement('span');
    distance.classList.add('restaurant__distance', 'text-body');
    distance.textContent = `캠퍼스부터 ${this.restaurantData.distanceByWalk}분 내`;
    return distance;
  }

  private createRestaurantDescription() {
    const description = document.createElement('p');
    description.classList.add('restaurant__description', 'text-body');
    description.textContent = this.restaurantData.description ?? '';
    return description;
  }
}

export class FavoriteButton {
  private button: HTMLButtonElement;

  constructor(isFavorited: boolean) {
    this.button = document.createElement('button');
    this.button.classList.add('restaurant__favorite-button');
    this.setFavorited(isFavorited);
  }

  setFavorited(isFavorited: boolean) {
    this.button.classList.toggle('favorited', isFavorited);
  }

  render() {
    return this.button;
  }
}
