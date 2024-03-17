import { DROP_BOX_MAP, STORAGE_KEY } from '../constants';
import { RestaurantList } from '../domains';
import { Category, RestaurantInfo, SortingOption } from '../types';

const RestaurantListController = {
  /**
   * 사이트 초기에 실행 시, 서버 역할인 localStorage에 데이터를 채워 넣기
   */
  saveInitialDataToLocalStorage() {
    const data = localStorage.getItem(STORAGE_KEY.restaurants);

    if (!data) {
      new RestaurantList().saveListToLocalStore();
    }
  },
  /**
   * 인자로 받은 레스토랑 목록을 화면에 구현
   */
  injectRestaurantList(restaurantList?: RestaurantInfo[]) {
    const $restaurantList = document.querySelector('.restaurant-list');

    if (!$restaurantList) return;
    const $newRestaurantList = document.createElement($restaurantList.tagName);
    $newRestaurantList.className = $restaurantList.className;

    const $fragment = document.createDocumentFragment();

    // 새로운 목록 넣기
    if (!restaurantList || !restaurantList[0]) {
      $fragment.appendChild(document.createElement('none-restaurant'));
    } else {
      restaurantList?.forEach((info) => {
        const $item = document.createElement('restaurant-item');
        $item.setAttribute('name', info.name);

        $fragment.appendChild($item);
      });
    }

    $newRestaurantList.appendChild($fragment);
    $restaurantList.parentElement?.replaceChild(
      $newRestaurantList,
      $restaurantList,
    );
  },
  /**
   * 선택된 필터링,정렬 옵션에 따라 필터링 및 정렬된 레스토랑 목록을 화면에 구현
   */
  injectFilteringAndSortingRestaurantList() {
    const option = this.private_getSelectedOption();

    if (!option) return;

    const { category, sorting } = option;
    const filteredList = this.private_filteringList(category);
    const sortedList = this.private_sortingList(filteredList, sorting);

    this.injectRestaurantList(sortedList);
  },
  /**
   * 선택된 필터링, 정렬 옵션 가져오기
   */
  private_getSelectedOption():
    | { category: string; sorting: string }
    | undefined {
    const $filteringCategory = document.querySelector('#filtering-category');
    const $filteringSorting = document.querySelector('#filtering-sorting');

    if (
      $filteringCategory instanceof HTMLSelectElement &&
      $filteringSorting instanceof HTMLSelectElement
    ) {
      return {
        category: this.private_getSelectedValue($filteringCategory),
        sorting: this.private_getSelectedValue($filteringSorting),
      };
    }

    return undefined;
  },
  /**
   * select 요소에서 선택된 option 값 가져오기
   */
  private_getSelectedValue(selectElement: HTMLSelectElement) {
    const selectedIndex = selectElement?.selectedIndex;
    const selectedValue = selectElement?.options[selectedIndex].value;

    return selectedValue;
  },

  /**
   * 선택된 음식점 카테고리에 해당하는 음식점 리스트 반환
   */
  private_filteringList(category: string) {
    const restaurantList = new RestaurantList();
    const categoryOptions = DROP_BOX_MAP.get('filteringCategory')?.options.map(
      (option) => option.value,
    );

    const isInvalidFilteringOption =
      !category || !categoryOptions?.includes(category);

    if (isInvalidFilteringOption) return;

    const filteredList =
      category === 'all'
        ? restaurantList.list
        : restaurantList.filterRestaurantsByCategory(category as Category);

    return filteredList;
  },
  /**
   * 음식점 리스트를 선택된 정렬 옵션에 따라 정렬한 뒤 이를 반환
   */
  private_sortingList(list: RestaurantInfo[] | undefined, sorting: string) {
    if (!list) return;
    const sortingOptions = DROP_BOX_MAP.get('filteringSorting')?.options.map(
      (option) => option.value,
    );
    const isInvalidSortingOption =
      !sorting || !sortingOptions?.includes(sorting);

    if (isInvalidSortingOption) return;

    const restaurantList = new RestaurantList();

    return restaurantList.sortRestaurants(list, sorting as SortingOption);
  },
};

export default RestaurantListController;
