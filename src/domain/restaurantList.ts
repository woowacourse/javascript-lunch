import { RestaurantCardComponent } from '../components/RestaurantCardComponent';
import { RestaurantInfo, SortingFilterType, CategoryValues } from '../types/types';
import restaurantAPI from './restaurantAPI';

export default class RestaurantList {
  #category: CategoryValues = '전체';
  #sorting: '이름순' | '거리순' = '이름순';

  #restaurantData = initialData;

  private async initialize() {
    const additionalData = await restaurantAPI.load();

    return [...initialData, ...additionalData];
  }

  constructor() {
    this.updateRestaurants();
    this.render();
  }

  setCategory(category: CategoryValues) {
    this.#category = category;

    this.updateRestaurants();
  }

  setSort(sortingKey: '이름순' | '거리순') {
    this.#sorting = sortingKey;

    this.updateRestaurants();
  }

  async getRestaurants(): Promise<RestaurantInfo[]> {
    this.#restaurantData = await this.initialize();
    return this.#restaurantData;
  }

  async filterByCategory(category: CategoryValues): Promise<RestaurantInfo[]> {
    this.#restaurantData = await this.initialize();

    if (category === '전체') return this.#restaurantData;

    return [...this.#restaurantData].filter((restaurant) => restaurant.category === category);
  }

  sortByKey(data: RestaurantInfo[], sorting: '이름순' | '거리순'): RestaurantInfo[] {
    // this.#restaurantData = await this.initialize();

    const result = data.slice().sort((a, b) => {
      if (sorting === '이름순') {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      if (sorting === '거리순') {
        return a.distance - b.distance;
      }

      return 0;
    });

    return result;
  }

  async updateRestaurants() {
    const filteredData = await this.filterByCategory(this.#category);
    const sortedData = this.sortByKey(filteredData, this.#sorting);

    this.#restaurantData = sortedData;
    this.render();
  }

  render() {
    const restaurantCardComponent = RestaurantCardComponent();
    const $restaurantListContainer = document.querySelector(
      '.restaurant-list-container'
    ) as HTMLElement;

    $restaurantListContainer.replaceChildren();

    this.#restaurantData.forEach(({ category, name, distance, description }) => {
      const node = restaurantCardComponent.getTemplate({ category, name, distance, description });
      $restaurantListContainer.appendChild(node);
    });
  }
}

const initialData: RestaurantInfo[] = [
  {
    category: '한식',
    name: '피양콩할마니',
    distance: 10,
    description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은
    되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께
    운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을
    선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며
    만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이
    먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`
  },
  {
    category: '중식',
    name: '친친',
    distance: 5,
    description: `Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를
    펼쳐갑니다`
  },
  {
    category: '일식',
    name: '잇쇼우',
    distance: 5,
    description: `Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를
    펼쳐갑니다`
  },
  {
    category: '양식',
    name: '호아빈 삼성점',
    distance: 15,
    description: `늘 변화를 추구하는 이태리키친입니다.`
  },
  {
    category: '양식',
    name: '이태리키친',
    distance: 20,
    description: `푸짐한 양에 국물이 일품인 쌀국수.`
  }
];
