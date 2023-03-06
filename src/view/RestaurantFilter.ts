import { $ } from '../util/querySelector';

type RestaurantFilterType = {
  parentElement: HTMLElement;
  parentEvent: {
    onSortByChange: (sortBy: string) => void;
    onFilterByChange: (category: string) => void;
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
      const newChoice = (event.target as HTMLSelectElement).value;

      this.#parentEvent.onFilterByChange(newChoice);
    });

    $(`#sorting-filter`).addEventListener('change', (event) => {
      const newChoice = (event.target as HTMLSelectElement).value;

      this.#parentEvent.onSortByChange(newChoice);
    });
  }

  #render() {
    const template = `
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
