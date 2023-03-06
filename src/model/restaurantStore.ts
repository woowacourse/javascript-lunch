import { Category, Order } from '@res/constants/enum';
import IRestaurantInput from '@res/interfaces/IRestaurantInput';
import sortItemsByName from '@res/utils/sortByName';

export const restaurantStore = {
  add(restaurantInput: IRestaurantInput) {
    const restaurantList = this.get();
    this.set([...restaurantList, restaurantInput]);

    return this;
  },

  set(restaurantList: IRestaurantInput[]) {
    console.log('set', restaurantList);
    localStorage.setItem('restaurantList', JSON.stringify(restaurantList));

    return this;
  },

  get(): IRestaurantInput[] {
    return [...JSON.parse(localStorage.getItem('restaurantList') || '[]')];
  },

  filter(category: Category, order: Order) {
    const restaurantList = this.get().filter(
      (restaurant: IRestaurantInput) => restaurant.name === category
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
