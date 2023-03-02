import type { Category } from './types/restaurantTypes';
import image from './img/images';
import Restaurants from './model/Restaurants';
import Component from './components/Component';
import Modal from './components/Modal';

export default class App extends Component {
  restuarants: Restaurants | undefined;

  constructor($target: HTMLElement) {
    super($target);
    this.restuarants = new Restaurants(this.$state!.restaurants);
  }
  setup() {
    this.$state = {
      filter: '전체',
      sort: 'name',
      restaurants: [
        {
          name: '피양콩할마니',
          category: '한식',
          distance: 10,
          description:
            '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.',
        },
        {
          name: '친친',
          category: '중식',
          distance: 5,
          description:
            'Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다',
        },
        {
          name: '잇쇼우',
          category: '일식',
          distance: 10,
          description:
            '잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다',
        },
        {
          name: '이태리키친',
          category: '양식',
          distance: 20,
          description: '늘 변화를 추구하는 이태리키친입니다.',
        },
        {
          name: '쌀국수',
          category: '아시안',
          distance: 20,
          description: '쌀국수 맛있어요.',
        },
        {
          name: '도스타코스',
          category: '기타',
          distance: 30,
          description: '타코 맛있어요!.',
        },
        {
          name: '오토상',
          category: '일식',
          distance: 5,
          description: '스시 맛있어요!.',
        },
        {
          name: '곤방와',
          category: '일식',
          distance: 15,
          description: '라멘 전문 레스토랑!.',
        },
      ],
    };
  }

  template() {
    return `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src="${image.추가버튼}" alt="음식점 추가">
      </button>
    </header>
    <main>
    <!-- 카테고리/정렬 필터 -->
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
      <select name="sorting" id="sorting-filter" class="restaurant-filter" >
        <option value="name">이름순</option>
        <option value="distance">거리순</option>
      </select>
    </section>

    <!-- 음식점 목록 -->
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
        ${this.$state!.restaurants.map(
          ({ name, category, distance, description }) => `
          <li class="restaurant">
            <div class="restaurant__category">
              <img src="${image[category]}" alt="${category}" class="category-icon">
            </div>
            <div class="restaurant__info">
              <h3 class="restaurant__name text-subtitle">${name}</h3>
              <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
              <p class="restaurant__description text-body">${description}</p>
            </div>
          </li>
        `
        ).join('')}
      </ul>        
    </section>
    </main>
    `;
  }

  render(): void {
    this.$target.innerHTML = this.template();

    const categoryFilter = this.$target.querySelector('#category-filter');
    if (categoryFilter instanceof HTMLSelectElement) {
      categoryFilter.value = this.$state!.filter;
    }

    const sortFilter = this.$target.querySelector('#sorting-filter');
    if (sortFilter instanceof HTMLSelectElement) {
      sortFilter.value = this.$state!.sort;
    }
    this.listenEvent();
  }

  listenEvent() {
    this.$target.querySelector('.gnb__button')!.addEventListener('click', (event: Event) => {
      new Modal(this.$target);
    });

    this.$target.querySelector('#category-filter')!.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = target.value;
      const filteredRestuarant = this.restuarants!.filterByCategory(value as Category);
      this.setState({ filter: value, restaurants: filteredRestuarant });
    });

    this.$target.querySelector('#sorting-filter')!.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = target.value;

      if (value === 'name') {
        const sortedByName = this.restuarants!.sortByName(this.$state!.filter as Category);
        this.setState({ sort: value, restaurants: sortedByName });
        return;
      }
      if (value === 'distance') {
        const sortedByDistance = this.restuarants!.sortByDistance(this.$state!.filter as Category);
        this.setState({ sort: value, restaurants: sortedByDistance });
        return;
      }
    });
  }
}
