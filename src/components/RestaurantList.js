import { geid, qs } from '../utils/domHelpers.js';
import RestaurantItem from './RestaurantItem.js';
import Component from '../Component.js';

export default class RestaurantList extends Component {
  constructor($target) {
    super($target);

    this.restaurantManager.subscribe(this.reRender.bind(this));

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
            geid(`restaurant__${idx}`),
            this.restaurantManager.getRestaurantList()[idx]
          );
        })
      : restaurantList.forEach((restaurant, idx) => {
          new RestaurantItem(geid(`restaurant__${idx}`), restaurant);
        });
  }

  template(restaurantList) {
    restaurantList === null
      ? `${this.restaurantManager
          .getRestaurantList()
          .map((_, index) => `<li class="restaurant" id="restaurant__${index}"></li>`)
          .join('')}`
      : `${restaurantList
          .map((_, index) => `<li class="restaurant" id="restaurant__${index}"></li>`)
          .join('')}`;
  }
}
