import RestaurantItem from '../RestaurantItem/RestaurantItem';
import { RestaurantDataType } from '../../../type/restaurantDataType';
import { $ } from '../../../util/domSelector';

type RestaurantListType = {
  restaurants: RestaurantDataType[];
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

  updateRestaurantList(restaurants: RestaurantDataType[]) {
    this.restaurantItems = this.createRestaurantItems(restaurants);
    this.clear();
    this.render();
  }

  private createRestaurantItems(restaurants: RestaurantDataType[]) {
    return restaurants.map(
      (restaurantData) =>
        new RestaurantItem({
          restaurantData: restaurantData,
          onClick: this.handleClickRestaurant,
          onFavorite: this.handleClickFavoriteButton,
        }),
    );
  }

  private handleClickRestaurant(restaurantData: RestaurantDataType) {
    this.showRestaurantDetail(restaurantData);
  }

  private handleClickFavoriteButton(restaurantName: string, isFavorited: boolean) {
    this.updateRestaurantItemFavorite(restaurantName, isFavorited);
  }

  private handleUpdateRestaurantFavorite(event: Event) {
    if (event instanceof CustomEvent) {
      const restaurant = this.restaurantItems.find(
        (restaurantItem: RestaurantItem) => restaurantItem.getRestaurantName() === event.detail.name,
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
