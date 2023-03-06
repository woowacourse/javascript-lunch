import { Category, Order } from '@res/constants/enum';
import IRestaurantInput from '@res/interfaces/IRestaurantInput';

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
    const restaurantList = this.getList();
    const filteredList = this.filterItems(restaurantList, category);
    return this.sortItems(filteredList, order);
  },

  filterItems(restaurantList: IRestaurantInput[], category: Category) {
    if (category === Category.All) {
      return restaurantList;
    }

    return restaurantList.filter(
      (restaurant: IRestaurantInput) => restaurant.category === category
    );
  },

  sortItems(restaurantList: IRestaurantInput[], order: Order) {
    if (order === Order.Name) {
      return restaurantList.sort((first, second) =>
        first.name.localeCompare(second.name, 'ko')
      );
    }

    if (order === Order.Distance) {
      return restaurantList.sort(
        (first, second) => Number(first.distance) - Number(second.distance)
      );
    }
  },
};
