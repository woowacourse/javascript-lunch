import RestaurantItem from './RestaurantItem.js';
import RestaurantManager from '../domain/RestaurantManager.ts';

class Main {
  #restaurant;
  #restaurantManager;

  constructor() {
    this.#restaurant = new RestaurantItem();
    this.#restaurantManager = new RestaurantManager();
  }

  render() {
    this.#restaurantManager.initRestaurantList();
    const renderListData = this.#restaurantManager.getRestaurantList();

    return `
        <section class="restaurant-filter-container">
      <select name="category" id="category-filter" class="restaurant-filter">
        <option value="전체">전체</option>
        <option value="한식">한식</option>
        <option value="중식">중식</option>
        <option value="일식">일식</option>
        <option value="양식">양식</option>
        <option value="아시안">아시안</option>
        <option value="기타">기타</option>
      </select>

      <!-- 정렬 셀렉트 박스 -->
      <select name="sorting" id="sorting-filter" class="restaurant-filter">
        <option value="name">이름순</option>
        <option value="distance">거리순</option>
      </select>
    </section>

    <!-- 음식점 목록 -->
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
    ${renderListData.reduce((acc, element) => {
      acc += this.#restaurant.render(element);
      return acc;
    }, '')}      
      </ul>
    </section>
        `;
  }
}

export default Main;
