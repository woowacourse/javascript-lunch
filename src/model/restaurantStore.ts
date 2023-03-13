import { Category, Order, Tab } from '../constants/enum';
import RenderOptions from '../interfaces/RenderOptions';
import { Restaurant, RestaurantInput } from '../interfaces/RestaurantInput';
import { sampleData } from './storage';

const FAVORITE_DEFAULT = false;

export const restaurantStore = {
  init() {
    restaurantStore.setList(sampleData);
  },

  getList({ category, order, tab }: RenderOptions) {
    if (tab === Tab.Favorite) {
      return restaurantStore.getFavoriteList();
    }

    return restaurantStore.getFilteredList(category, order);
  },

  getItemById(id: number): Restaurant {
    for (const restaurantItem of restaurantStore.fetchList()) {
      if (restaurantItem.id === id) return restaurantItem;
    }

    throw new Error('restaurantStore.getItemById() id값이 존재하지 않습니다.');
  },

  addList(restaurantInput: RestaurantInput) {
    const restaurantList = restaurantStore.fetchList();

    const restaurantToAdd: Restaurant = {
      id: restaurantStore.getNewID(restaurantList),
      favorite: FAVORITE_DEFAULT,
      ...restaurantInput,
    };

    restaurantStore.setList([...restaurantList, restaurantToAdd]);

    return this;
  },

  deleteById(id: number) {
    const restaurantList = restaurantStore.fetchList().filter((restaurant) => restaurant.id !== id);

    restaurantStore.setList(restaurantList);
  },

  setList(restaurantList: RestaurantInput[]) {
    localStorage.setItem('restaurantList', JSON.stringify(restaurantList));

    return restaurantStore;
  },

  getNewID(restaurantList: Restaurant[]): number {
    return (
      restaurantList.reduce((acc, { id }) => {
        return id > acc ? id : acc;
      }, 1) + 1
    );
  },

  fetchList(): Restaurant[] {
    return [...JSON.parse(localStorage.getItem('restaurantList') || '[]')];
  },

  getFavoriteList(): Restaurant[] {
    const restaurantList = restaurantStore.fetchList();
    return restaurantList.filter((restaurant) => restaurant.favorite === true);
  },

  getFilteredList(category: Category = Category.All, order: Order = Order.Name) {
    const restaurantList = restaurantStore.fetchList();
    const filteredList = restaurantStore.filterItems(restaurantList, category);
    return restaurantStore.sortItems(filteredList, order);
  },

  filterItems(restaurantList: Restaurant[], category: Category): Restaurant[] {
    if (category === Category.All) {
      return restaurantList;
    }

    return restaurantList.filter((restaurant: Restaurant) => restaurant.category === category);
  },

  sortItems(restaurantList: Restaurant[], order: Order): Restaurant[] {
    if (order === Order.Name) {
      return restaurantList.sort((first, second) => first.name.localeCompare(second.name, 'ko'));
    }

    return restaurantList.sort((first, second) => Number(first.distance) - Number(second.distance));
  },

  toggleFavorite(targetId: number) {
    const restaurantList = restaurantStore.fetchList().map((restaurant) => {
      if (restaurant.id === targetId) {
        restaurant.favorite = !restaurant.favorite;
      }
      return restaurant;
    });

    restaurantStore.setList(restaurantList);
  },
};
