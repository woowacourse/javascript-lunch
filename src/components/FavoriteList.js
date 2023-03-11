import { geid, qs } from '../utils/domHelpers.js';
import Component from '../Component';
import RestaurantItem from './RestaurantItem';

export default class FavoriteList extends Component {
  constructor($target) {
    super($target);

    this.favoriteRestaurant.subscribe(this.reRender.bind(this));

    this.lazyRender();
  }

  reRender(restaurantList) {
    this.render(restaurantList);
    this.lazyRender(restaurantList);
  }

  lazyRender(restaurantList = null) {
    if (!restaurantList) {
      [...this.$target.children].forEach((_, idx) => {
        new RestaurantItem(
          geid(`restaurant__${idx}`),
          this.favoriteRestaurant.getRestaurantList()[idx]
        );
      });
    }

    if (restaurantList) {
      restaurantList.forEach((restaurant, idx) => {
        new RestaurantItem(geid(`restaurant__${idx}`), restaurant);
      });
    }
  }

  template(restaurantList) {
    if (!restaurantList) {
      return `${this.favoriteRestaurant
        .getRestaurantList()
        .map((_, index) => `<li class="restaurant" id="restaurant__${index}"></li>`)
        .join('')}`;
    }

    if (restaurantList) {
      return `${restaurantList
        .map((_, index) => `<li class="restaurant" id="restaurant__${index}"></li>`)
        .join('')}`;
    }
  }
}
