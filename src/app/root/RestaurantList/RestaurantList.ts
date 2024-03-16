import RestaurantItem from '../RestaurantItem/RestaurantItem';
import { RestaurantDataType } from '../../../type/restaurantDataType';
import { $$ } from '../../../util/domSelector';

export default class RestaurantList extends HTMLElement {
  private restaurants: RestaurantDataType[];
  private showRestaurantDetail: Function;

  constructor(restaurants: RestaurantDataType[], onClick: Function) {
    super();
    this.restaurants = restaurants;
    this.showRestaurantDetail = onClick;
    this.handleClickRestaurantItem = this.handleClickRestaurantItem.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventForEachRestaurant();
  }

  disconnectedCallback() {
    this.removeEventForEachRestaurant();
  }

  updateRestaurantList(newRestaurants: RestaurantDataType[]) {
    this.restaurants = newRestaurants;
    this.clear();
    this.render();
    this.addEventForEachRestaurant();
  }

  private addEventForEachRestaurant() {
    $$('restaurant-item').forEach((item) => {
      item.addEventListener('updateFavorite', this.handleUpdateFavorite.bind(this));
    });
  }

  private removeEventForEachRestaurant() {
    $$('restaurant-item').forEach((item) => {
      item.removeEventListener('updateFavorite', this.handleUpdateFavorite.bind(this));
    });
  }

  private handleUpdateFavorite(event: Event) {
    if (event instanceof CustomEvent) {
      this.dispatchEvent(
        new CustomEvent('updateRestaurantFavorite', {
          detail: {
            name: event.detail.name,
            isFavorited: event.detail.isFavorited,
          },
        }),
      );
    }
  }

  private handleClickRestaurantItem(restaurantData: RestaurantDataType) {
    this.showRestaurantDetail(restaurantData);
  }

  private clear() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }

  private render() {
    this.classList.add('restaurant-list-container');
    this.restaurants.forEach((restaurantData) => {
      const restaurantItem = new RestaurantItem(restaurantData, this.handleClickRestaurantItem);
      this.appendChild(restaurantItem);
    });
  }
}

customElements.define('restaurant-list', RestaurantList);
