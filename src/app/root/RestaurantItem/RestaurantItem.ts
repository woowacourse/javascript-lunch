import { RestaurantDataType } from '../../../type/restaurantDataType';
import createCategoryContainer from '../../../util/createCategoryContainer';
import FavoriteButton from '../../component/FavoriteButton/FavoriteButton';
import RestaurantInfoContainer from '../../component/RestaurantInfoContainer/RestaurantInfoContainer';

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
