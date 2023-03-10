import { IMethods } from '../App';
import { Restaurant } from '../domain/Restaurant';
import RestaurantItem from './RestaurantItem';

interface IRestaurantList {
  restaurantList: Restaurant[];
  methods: IMethods;
}

export default class RestaurantList {
  $restaurantListSection = document.createElement('section');
  $ul = document.createElement('section');

  state: IRestaurantList;

  constructor(
    $root: HTMLElement,
    restaurantList: Restaurant[],
    methods: IMethods
  ) {
    this.$restaurantListSection.className = 'restaurant-list-container';
    this.$ul.className = 'restaurant-list';
    this.state = {
      restaurantList,
      methods,
    };

    this.render($root);
  }

  template() {
    this.$ul.innerHTML = '';
    if (!this.state.restaurantList.length) {
      this.$ul.innerHTML =
        '<p class="no-list-message text-body">조회 가능한 식당이 없습니다.</p>';

      return;
    }
    for (const restaurant of this.state.restaurantList) {
      this.$ul.insertAdjacentElement(
        'beforeend',
        RestaurantItem(restaurant, this.state.methods)
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
