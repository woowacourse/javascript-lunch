import { RestaurantDataType } from '../../../type/restaurantDataType';
import createCategoryContainer from '../../../util/createCategoryContainer';
import { $ } from '../../../util/domSelector';
import FavoriteButton from '../../component/FavoriteButton/FavoriteButton';
import RestaurantInfoContainer from '../../component/RestaurantItemContainer/RestaurantItemContainer';

export default class RestaurantItem extends HTMLElement {
  private restaurantData: RestaurantDataType;
  private restaurantInfoContainer: HTMLDivElement;
  private favoriteButton: FavoriteButton;
  private showRestaurantDetail: Function;

  constructor(restaurantData: RestaurantDataType, onClick: Function) {
    super();
    this.restaurantData = restaurantData;
    this.restaurantInfoContainer = RestaurantInfoContainer(restaurantData);
    this.favoriteButton = new FavoriteButton(restaurantData.favorite ?? false);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showRestaurantDetail = onClick;
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  disconnectedCallback() {
    this.removeEvent();
  }

  private addEvent() {
    $('button.restaurant__favorite-button', this).addEventListener('click', this.toggleFavorite);
    this.addEventListener('click', this.handleClick);
  }

  private removeEvent() {
    $('button.restaurant__favorite-button', this).removeEventListener('click', this.toggleFavorite);
    this.removeEventListener('click', this.handleClick);
  }

  private handleClick(event: Event) {
    if (!(event.target instanceof HTMLButtonElement)) {
      this.showRestaurantDetail(this.restaurantData);
    }
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
    this.appendChild(this.restaurantInfoContainer);
    this.appendChild(this.favoriteButton.render());
  }
}

customElements.define('restaurant-item', RestaurantItem);
