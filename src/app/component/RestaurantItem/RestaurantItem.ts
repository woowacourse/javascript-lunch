import { RestaurantType } from '../../type/restaurantTypes';
import { $ } from '../../util/domSelector';
import createCategoryContainer from '../../util/createCategoryContainer';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import RestaurantInfoContainer from '../RestaurantItemContainer/RestaurantItemContainer';

type RestaurantItemType = {
  restaurantData: RestaurantType;
  onClick: Function;
  onFavorite: Function;
};

export default class RestaurantItem extends HTMLElement {
  private restaurantData: RestaurantType;
  private restaurantInfoContainer: HTMLDivElement;
  private favoriteButton: FavoriteButton;
  private showRestaurantDetail: Function;
  private updateRestaurantFavorite: Function;

  constructor({ restaurantData, onClick, onFavorite }: RestaurantItemType) {
    super();
    this.restaurantData = restaurantData;
    this.restaurantInfoContainer = RestaurantInfoContainer(restaurantData);
    this.favoriteButton = new FavoriteButton(restaurantData.favorite ?? false);
    this.showRestaurantDetail = onClick;
    this.updateRestaurantFavorite = onFavorite;
    this.updateFavorite = this.updateFavorite.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  disconnectedCallback() {
    this.removeEvent();
  }

  getRestaurantName() {
    return this.restaurantData.name;
  }

  getRestaurantId() {
    return this.restaurantData.id;
  }

  setFavoriteButtonStyle(isFavorited: boolean) {
    this.favoriteButton.setFavorited(isFavorited);
  }

  private addEvent() {
    $('button.restaurant__favorite-button', this).addEventListener('click', this.updateFavorite);
    this.addEventListener('click', this.handleClick);
  }

  private removeEvent() {
    $('button.restaurant__favorite-button', this).removeEventListener('click', this.updateFavorite);
    this.removeEventListener('click', this.handleClick);
  }

  private handleClick(event: Event) {
    if (!(event.target instanceof HTMLButtonElement)) {
      this.showRestaurantDetail(this.restaurantData);
    }
  }

  private updateFavorite() {
    this.restaurantData.favorite = !this.restaurantData.favorite;
    this.setFavoriteButtonStyle(this.restaurantData.favorite);
    this.updateRestaurantFavorite(this.restaurantData.name, this.restaurantData.favorite);
  }

  private render() {
    this.classList.add('restaurant');

    this.appendChild(createCategoryContainer(this.restaurantData.category));
    this.appendChild(this.restaurantInfoContainer);
    this.appendChild(this.favoriteButton.render());
  }
}

customElements.define('restaurant-item', RestaurantItem);
