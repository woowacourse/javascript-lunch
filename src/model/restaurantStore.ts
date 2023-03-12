import { Category, Order } from '@res/constants/enum';
import IRenderOptions from '@res/interfaces/IRenderOptions';
import { IRestaurantInput, IRestaurant } from '@res/interfaces/IRestaurantInput';
import { sampleData } from './storage';

const FAVORITE_DEFAULT = false;

export const restaurantStore = {
  init() {
    restaurantStore.setList(sampleData);
  },

  getList({ category, order, tab }: IRenderOptions) {
    if (tab === 'favorite') {
      return restaurantStore.getFavoriteList();
    }

    return restaurantStore.getFilteredList(category, order);
  },

  getItemById(id: number): IRestaurant {
    for (const restaurantItem of restaurantStore.fetchList()) {
      if (restaurantItem.id === id) return restaurantItem;
    }

    throw new Error('restaurantStore.getItemById() id값이 존재하지 않습니다.');
  },

  addList(restaurantInput: IRestaurantInput) {
    const restaurantList = restaurantStore.fetchList();

    const restaurantToAdd: IRestaurant = {
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

  setList(restaurantList: IRestaurantInput[]) {
    localStorage.setItem('restaurantList', JSON.stringify(restaurantList));

    return restaurantStore;
  },

  getNewID(restaurantList: IRestaurant[]): number {
    return (
      restaurantList.reduce((acc, { id }) => {
        return id > acc ? id : acc;
      }, 1) + 1
    );
  },

  fetchList(): IRestaurant[] {
    return [...JSON.parse(localStorage.getItem('restaurantList') || '[]')];
  },

  getFavoriteList(): IRestaurant[] {
    const restaurantList = restaurantStore.fetchList();
    return restaurantList.filter((restaurant) => restaurant.favorite === true);
  },

  getFilteredList(category: Category = Category.All, order: Order = Order.Name) {
    const restaurantList = restaurantStore.fetchList();
    const filteredList = restaurantStore.filterItems(restaurantList, category);
    return restaurantStore.sortItems(filteredList, order);
  },

  filterItems(restaurantList: IRestaurant[], category: Category): IRestaurant[] {
    if (category === Category.All) {
      return restaurantList;
    }

    return restaurantList.filter((restaurant: IRestaurant) => restaurant.category === category);
  },

  sortItems(restaurantList: IRestaurant[], order: Order): IRestaurant[] {
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

restaurantStore.getNewID([
  {
    id: 1,
    favorite: false,
    category: '한식',
    name: '얌샘김밥',
    distance: '5',
    description: '정말 마이따 마이따!',
    link: 'https://naver.com',
  },
  {
    id: 10,
    favorite: true,
    category: '한식',
    name: '고봉김밥',
    distance: '15',
    description: '정말 고봉이다.',
    link: 'https://naver.com',
  },
]);
