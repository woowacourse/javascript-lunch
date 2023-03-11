import RestaurantItem from '@res/components/RestaurantItem';
import { Category, Order } from '@res/constants/enum';
import { IRestaurantInput, IRestaurant } from '@res/interfaces/IRestaurantInput';
import { sampleData } from './storage';

const FAVORITE_DEFAULT = false;

export const restaurantStore = {
  init() {
    restaurantStore.setList(sampleData);
  },

  getItemById(id: number): IRestaurant {
    for (const restaurantItem of restaurantStore.getList()) {
      if (restaurantItem.id === id) return restaurantItem;
    }

    throw new Error('restaurantStore.getItemById() id값이 존재하지 않습니다.');
  },

  addList(restaurantInput: IRestaurantInput) {
    const restaurantList = restaurantStore.getList();

    const restaurantToAdd: IRestaurant = {
      id: restaurantStore.getNewID(restaurantList),
      favorite: FAVORITE_DEFAULT,
      ...restaurantInput,
    };

    restaurantStore.setList([...restaurantList, restaurantToAdd]);

    return this;
  },

  deleteById(id: number) {
    const restaurantList = restaurantStore.getList().filter((restaurant) => restaurant.id !== id);

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

  getList(): IRestaurant[] {
    return [...JSON.parse(localStorage.getItem('restaurantList') || '[]')];
  },

  getFavoriteList(): IRestaurant[] {
    const restaurantList = restaurantStore.getList();
    return restaurantList.filter((restaurant) => restaurant.favorite === true);
  },

  getFiltered(category: Category, order: Order) {
    const restaurantList = restaurantStore.getList();
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
    const restaurantList = restaurantStore.getList().map((restaurant) => {
      if (restaurant.id === targetId) {
        restaurant.favorite = !restaurant.favorite;
      }
      return restaurant;
    });

    console.log(restaurantList);

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
