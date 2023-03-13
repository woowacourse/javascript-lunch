import { CLASS } from '../../constants';
import RestaurantListItem, { IRestaurant } from '../../domain/RestaurantListItem';
import DetailModal from './DetailModal';
import Restaurant from './Restaurant';

const RestaurantList = {
  template(restaurantList: IRestaurant[]) {
    return `
      <ul class='${CLASS.RESTAURANT_LIST}'>
        ${restaurantList.map((restaurant) => Restaurant.template(restaurant)).join('')}
      </ul>`;
  },
  setEvent(RestaurantListItem: RestaurantListItem) {
    const restaurantList = document.querySelector(`.${CLASS.RESTAURANT_LIST}`);

    restaurantList?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      if (target.className === CLASS.RESTAURANT) {
        this.handleDetailModal(RestaurantListItem, target.dataset.id);
      }

      if (target.parentElement?.parentElement?.className === CLASS.RESTAURANT) {
        this.handleDetailModal(RestaurantListItem, target.parentElement?.parentElement?.dataset.id);
      }
    });
  },
  handleDetailModal(RestaurantListItem: RestaurantListItem, id: string | undefined) {
    if (id) {
      const restaurant = RestaurantListItem.getItemByDataId(id) as IRestaurant;
      DetailModal.openModal(restaurant);
      DetailModal.setEvent(RestaurantListItem);
    } else {
      alert('올바르지 않은 id 값입니다.');
    }
  },
};

export default RestaurantList;
