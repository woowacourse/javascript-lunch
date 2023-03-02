import { Restaurant, CategoryFilter } from './types';
import RestaurantItems from './components/RestaurantItems';

interface Store {
  restaurants: Restaurant[];
  addRestaurants: (restaurant: Restaurant) => void;
  filterRestaurants: (categoryFilter: CategoryFilter) => void;
}

export const store: Store = {
  restaurants: [
    {
      category: '한식',
      name: '피양콩할마니',
      distance: 10,
      description: `"평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는곳으로,‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다."`,
    },
    {
      category: '중식',
      name: '친친',
      distance: 5,
      description: `"Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다."`,
    },
  ],

  addRestaurants(restaurant: Restaurant) {
    this.restaurants = [...this.restaurants, restaurant];
    const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
      typeof RestaurantItems
    >;
    $restaurantItems.render(this.restaurants);
    localStorage.setItem('store', JSON.stringify(this.restaurants));
  },

  filterRestaurants(categoryFilter: CategoryFilter) {
    const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
      typeof RestaurantItems
    >;
    if (categoryFilter === '전체') {
      return $restaurantItems.render(store.restaurants);
    }
    const filteredRestaurants = this.restaurants.filter(
      (restaurant) => restaurant.category === categoryFilter,
    );
    $restaurantItems.render(filteredRestaurants);
  },
};

export default store;
