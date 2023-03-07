import { CLASS } from '../../constants';
import { IRestaurant } from '../../domain/RestaurantListItem';
import Restaurant from './Restaurant';

const RestaurantList = {
  template(restaurantList: IRestaurant[]) {
    return `
    <section class="${CLASS.RESTAURANT_LIST_CONTAINER}">
      <ul class='restaurant-list'>
        ${restaurantList.map((restaurant) => Restaurant.template(restaurant)).join('')}
      </ul>
    </section>`;
  },
  update(restaurantList: IRestaurant[]) {
    const restaurantListContainer = document.querySelector(`.${CLASS.RESTAURANT_LIST_CONTAINER}`) as HTMLDivElement;
    restaurantListContainer.innerHTML = this.template(restaurantList);
  },
};

export default RestaurantList;
