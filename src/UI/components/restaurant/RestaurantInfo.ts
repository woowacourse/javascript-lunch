import Restaurant from '../../../Domain/Restaurant';
import FavoriteIcon from './FavoriteIcon';

class RestaurantInfo {
  private restaurant: Restaurant;
  private element: HTMLDivElement;

  constructor(restaurant: Restaurant) {
    this.restaurant = restaurant;
    this.element = this.#createRestaurantInfo(restaurant);
  }

  #createRestaurantInfo(restaurant: Restaurant): HTMLDivElement {
    const restaurantInfo = document.createElement('div');
    restaurantInfo.classList.add('restaurant__info');

    restaurantInfo.appendChild(this.#createTopContainer());
    restaurantInfo.appendChild(this.#createRestaurantDescription());

    return restaurantInfo;
  }

  #createTopContainer(): HTMLDivElement {
    const topContainer = document.createElement('div');
    topContainer.classList.add('restaurant__top-container');

    topContainer.appendChild(this.#createNameDistanceContainer());
    topContainer.appendChild(this.#createFavoriteIcon());

    return topContainer;
  }

  #createNameDistanceContainer(): HTMLDivElement {
    const nameDistanceContainer = document.createElement('div');
    nameDistanceContainer.classList.add('restaurant__name-distance');

    const restaurantName = document.createElement('h3');
    restaurantName.classList.add('restaurant__name', 'text-subtitle');
    restaurantName.textContent = this.restaurant.getName();

    const restaurantDistance = document.createElement('span');
    restaurantDistance.classList.add('restaurant__distance', 'text-body');
    restaurantDistance.textContent = `캠퍼스부터 ${this.restaurant.getDistance()}분 내`;

    nameDistanceContainer.appendChild(restaurantName);
    nameDistanceContainer.appendChild(restaurantDistance);

    return nameDistanceContainer;
  }

  #createFavoriteIcon(): HTMLDivElement {
    const favoriteIcon = new FavoriteIcon(this.restaurant.isFavorite(), null, false);
    return favoriteIcon.getElement();
  }

  #createRestaurantDescription(): HTMLParagraphElement {
    const restaurantDescription = document.createElement('p');
    restaurantDescription.classList.add('restaurant__description', 'text-body');
    restaurantDescription.textContent = this.restaurant.getDescription();

    return restaurantDescription;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export default RestaurantInfo;
