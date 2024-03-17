import RestaurantItem from '../RestaurantItem/RestaurantItem';
import { RestaurantDataType } from '../../../type/restaurantDataType';

type RestaurantListType = {
  restaurants: RestaurantDataType[];
  onRestaurantItemClick: Function;
  onRestaurantItemFavorite: Function;
};

export default class RestaurantList extends HTMLElement {
  private restaurants: RestaurantDataType[];
  private showRestaurantDetail: Function;
  private updateRestaurantItemFavorite: Function;

  constructor({ restaurants, onRestaurantItemClick, onRestaurantItemFavorite }: RestaurantListType) {
    super();
    this.restaurants = restaurants;
    this.showRestaurantDetail = onRestaurantItemClick;
    this.updateRestaurantItemFavorite = onRestaurantItemFavorite;
    this.handleClickRestaurantItem = this.handleClickRestaurantItem.bind(this);
    this.handleClickFavoriteButton = this.handleClickFavoriteButton.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  updateRestaurantList(newRestaurants: RestaurantDataType[]) {
    this.restaurants = newRestaurants;
    this.clear();
    this.render();
  }

  private handleClickRestaurantItem(restaurantData: RestaurantDataType) {
    this.showRestaurantDetail(restaurantData);
  }

  private handleClickFavoriteButton(restaurantName: string, isFavorited: boolean) {
    this.updateRestaurantItemFavorite(restaurantName, isFavorited);
  }

  private clear() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }

  private render() {
    this.classList.add('restaurant-list-container');
    this.restaurants.forEach((restaurantData) => {
      const restaurantItem = new RestaurantItem({
        restaurantData: restaurantData,
        onClick: this.handleClickRestaurantItem,
        onFavorite: this.handleClickFavoriteButton,
      });
      this.appendChild(restaurantItem);
    });
  }
}

customElements.define('restaurant-list', RestaurantList);
