import { Restaurant } from '../domain/Restaurant';
import { appendModal, showModal } from '../modal';
import RestaurantInfo from './RestaurantInfo';
import RestaurantItem, { toggleFavoriteFilled } from './RestaurantItem';

interface IRestaurantList {
  restaurantList: Restaurant[];
  deleteHandler?: (id: number) => void;
}

export default class RestaurantList {
  $restaurantListSection = document.createElement('section');
  $ul = document.createElement('section');
  state!: IRestaurantList;

  constructor(
    $root: HTMLElement,
    restaurants: Restaurant[],
    deleteHandler: (id: number) => void
  ) {
    this.$restaurantListSection.className = 'restaurant-list-cotainer';
    this.$ul.className = 'restaurant-list';

    this.setState({ restaurantList: restaurants, deleteHandler });
    this.render($root);
  }

  template() {
    this.$ul.innerHTML = '';
    for (const restaurant of this.state.restaurantList) {
      this.$ul.insertAdjacentElement(
        'beforeend',
        RestaurantItem(restaurant, this.state.deleteHandler)
      );
    }
  }

  render = ($targetElement: HTMLElement) => {
    this.$restaurantListSection.innerHTML = '';
    this.template();
    this.$restaurantListSection.appendChild(this.$ul);

    $targetElement.insertAdjacentElement(
      'beforeend',
      this.$restaurantListSection
    );
  };

  setState = (state: IRestaurantList) => {
    this.state = { ...this.state, ...state };
  };
}
