import RestaurantItem from '../RestaurantItem/RestaurantItem';
import { RestaurantType } from '../../../type/restaurantTypes';
import { $ } from '../../../util/domSelector';

type RestaurantListType = {
  restaurants: RestaurantType[];
  onRestaurantClick: Function;
  onRestaurantFavorite: Function;
};

export default class RestaurantList extends HTMLElement {
  private restaurantItems: RestaurantItem[];
  private showRestaurantDetail: Function;
  private updateRestaurantItemFavorite: Function;

  constructor({ restaurants, onRestaurantClick, onRestaurantFavorite }: RestaurantListType) {
    super();
    this.showRestaurantDetail = onRestaurantClick;
    this.updateRestaurantItemFavorite = onRestaurantFavorite;
    this.handleClickRestaurant = this.handleClickRestaurant.bind(this);
    this.handleClickFavoriteButton = this.handleClickFavoriteButton.bind(this);
    this.handleUpdateRestaurantFavorite = this.handleUpdateRestaurantFavorite.bind(this);
    this.restaurantItems = this.createRestaurantItems(restaurants);
  }

  connectedCallback() {
    this.render();
    $('#restaurant-detail-modal').addEventListener('updateRestaurantFavorite', this.handleUpdateRestaurantFavorite);
  }

  disconnectedCallback() {
    $('#restaurant-detail-modal').removeEventListener('updateRestaurantFavorite', this.handleUpdateRestaurantFavorite);
  }

  updateRestaurantList(restaurants: RestaurantType[]) {
    this.restaurantItems = this.createRestaurantItems(restaurants);
    this.clear();
    this.render();
  }

  private createRestaurantItems(restaurants: RestaurantType[]) {
    return restaurants.map(
      (restaurant) =>
        new RestaurantItem({
          restaurantData: restaurant,
          onClick: this.handleClickRestaurant,
          onFavorite: this.handleClickFavoriteButton,
        }),
    );
  }

  private handleClickRestaurant(restaurant: RestaurantType) {
    this.showRestaurantDetail(restaurant);
  }

  private handleClickFavoriteButton(restaurantName: string, isFavorited: boolean) {
    this.updateRestaurantItemFavorite(restaurantName, isFavorited);
  }

  private handleUpdateRestaurantFavorite(event: Event) {
    if (event instanceof CustomEvent) {
      const restaurant = this.restaurantItems.find(
        (restaurantItem: RestaurantItem) => restaurantItem.getRestaurantId() === event.detail.id,
      );
      this.setRestaurantItemFavoriteButtonStyle(event.detail.isFavorited, restaurant);
    }
  }

  private setRestaurantItemFavoriteButtonStyle(isFavorited: boolean, restaurant?: RestaurantItem) {
    if (restaurant) {
      restaurant.setFavoriteButtonStyle(isFavorited);
    }
  }

  private clear() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }

  private render() {
    this.classList.add('restaurant-list-container');
    this.append(...this.restaurantItems);
  }
}

customElements.define('restaurant-list', RestaurantList);
