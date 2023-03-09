import { CLASS } from '../../constants';
import RestaurantListItem, { IRestaurant } from '../../domain/RestaurantListItem';
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
  setEvent(RestaurantListItem: RestaurantListItem) {
    Restaurant.setEvent(RestaurantListItem);
  },
  update(restaurantList: IRestaurant[]) {
    const restaurantListContainer = document.querySelector(`.${CLASS.RESTAURANT_LIST_CONTAINER}`) as HTMLDivElement;
    restaurantListContainer.innerHTML = this.template(restaurantList);
  },
  append(restaurant: IRestaurant) {
    const restaurantListContainer = document.querySelector(`.${CLASS.RESTAURANT_LIST_CONTAINER}`) as HTMLDivElement;
    const template = Restaurant.template(restaurant);
    restaurantListContainer.insertAdjacentHTML('afterbegin', template);
  },
};

export default RestaurantList;
