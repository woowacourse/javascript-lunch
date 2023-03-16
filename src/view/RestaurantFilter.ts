import { $ } from '../util/querySelector';

type RestaurantFilterType = {
  parentElement: HTMLElement;
  parentEvent: {
    onSortByChange: (sortBy: string) => void;
    onFilterByChange: (category: string) => void;
    onFavoriteByChange: (favoriteMode: string) => void;
  };
};

class RestaurantFilter {
  #parentElement;
  #parentEvent;

  constructor({ parentElement, parentEvent }: RestaurantFilterType) {
    this.#parentElement = parentElement;
    this.#parentEvent = parentEvent;

    this.#render();
    this.#setListeners();
  }

  #setListeners() {
    $(`#category-filter`).addEventListener('change', (event) => {
      if (event.target instanceof HTMLSelectElement) {
        const newChoice = event.target.value;

        this.#parentEvent.onFilterByChange(newChoice);
      }
    });

    $(`#sorting-filter`).addEventListener('change', (event) => {
      if (event.target instanceof HTMLSelectElement) {
        const newChoice = event.target.value;

        this.#parentEvent.onSortByChange(newChoice);
      }
    });

    $(`#favorite-filter-all`).addEventListener('click', (event) => {
      if (event.target instanceof HTMLInputElement) {
        this.#parentEvent.onFavoriteByChange('all');

        this.#closeOrOpenSelectFilter('open');
      }
    });

    $(`#favorite-filter-favorite`).addEventListener('click', (event) => {
      if (event.target instanceof HTMLInputElement) {
        this.#parentEvent.onFavoriteByChange('favorite');

        this.#closeOrOpenSelectFilter('close');
      }
    });
  }

  #closeOrOpenSelectFilter(command: string) {
    $(`#restaurant-filter-container`).style.display =
      command === 'open' ? 'flex' : 'none';
  }

  #render() {
    const template = `
      <section class="restaurant-favorite-container">
        <div class="favorite-menu">
          <input type="radio" id="favorite-filter-all" name="favorite" value="all" checked hidden />
          <label class="favorite-radio" for="favorite-filter-all">모든 음식점</label>
          <input type="radio" id="favorite-filter-favorite" name="favorite" value="favorite" hidden />
          <label class="favorite-radio" for="favorite-filter-favorite">자주 가는 음식점</label>
        </div>
      </section>
      <section class="restaurant-filter-container" id="restaurant-filter-container">
        <select name="category" id="category-filter" class="restaurant-filter">
          <option value="전체">전체</option>
          <option value="한식">한식</option>
          <option value="중식">중식</option>
          <option value="일식">일식</option>
          <option value="양식">양식</option>
          <option value="아시안">아시안</option>
          <option value="기타">기타</option>
        </select>
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          <option value="name">이름순</option>
          <option value="distance">거리순</option>
        </select>
      </section>
    `;

    this.#parentElement.innerHTML = template;
  }
}

export default RestaurantFilter;
