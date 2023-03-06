import { Category, Order } from '@res/constants/enum';
import IRestaurantInput from '@res/interfaces/IRestaurantInput';
import sortItemsByName from '@res/utils/sortByName';

export const restaurantStore = {
  addList(restaurantInput: IRestaurantInput) {
    const restaurantList = this.getList();
    this.setList([...restaurantList, restaurantInput]);

    return this;
  },

  setList(restaurantList: IRestaurantInput[]) {
    localStorage.setItem('restaurantList', JSON.stringify(restaurantList));

    return this;
  },

  getList(): IRestaurantInput[] {
    return [...JSON.parse(localStorage.getItem('restaurantList') || '[]')];
  },

  getFiltered(category: Category, order: Order) {
    const restaurantList = this.getList().filter(
      (restaurant: IRestaurantInput) => restaurant.category === category
    );

    if (order === Order.Name) {
      return sortItemsByName(restaurantList);
    }

    if (order === Order.Distance) {
      return restaurantList.sort(
        (first, second) => Number(first.distance) - Number(second.distance)
      );
    }
  },
};
