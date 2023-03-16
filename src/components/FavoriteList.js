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
    restaurantList === null
      ? [...this.$target.children].forEach((_, idx) => {
          new RestaurantItem(
            geid(`restaurant__favorite__${idx}`),
            this.favoriteRestaurant.getRestaurantList()[idx]
          );
        })
      : restaurantList.forEach((restaurant, idx) => {
          new RestaurantItem(geid(`restaurant__favorite__${idx}`), restaurant);
        });
  }

  template(restaurantList) {
    if (!restaurantList) {
      return `${this.favoriteRestaurant
        .getRestaurantList()
        .map((_, idx) => `<li class="restaurant" id="restaurant__favorite__${idx}"></li>`)
        .join('')}`;
    }

    if (restaurantList) {
      return `${restaurantList
        .map((_, idx) => `<li class="restaurant" id="restaurant__favorite__${idx}"></li>`)
        .join('')}`;
    }
  }
}
