import './style.css';

import { DROP_BOX_MAP } from '../../constants';
import { RestaurantList } from '../../domains';
import { Category, RestaurantInfo, SortingOption } from '../../types';
import RestaurantListTemplate, {
  RestaurantListTemplateProps,
} from '../RestaurantListTemplate';

class AllRestaurantList extends RestaurantListTemplate {
  constructor(restaurantListTemplateProps: RestaurantListTemplateProps) {
    const CLASS_NAME = 'all-restaurant-list';
    const allRestaurantListClassList = restaurantListTemplateProps.classList
      ? restaurantListTemplateProps.classList.concat(CLASS_NAME)
      : [CLASS_NAME];
    const allRestaurantListProps = {
      ...restaurantListTemplateProps,
      classList: allRestaurantListClassList,
    };

    super(allRestaurantListProps);
    this.#addDropBoxGroupToContainer();
    this.#addEventToFilteringAndSorting();
  }

  #addDropBoxGroupToContainer() {
    const $allRestaurantList = document.querySelector('.all-restaurant-list');
    const $parent = $allRestaurantList?.parentElement;

    if (!$parent) return;

    const $dropBoxGroup = document.createElement('div');
    $dropBoxGroup.className = 'drop-box-group';

    const $filteringCategory = document.createElement('drop-box');
    $filteringCategory.setAttribute('name', 'filteringCategory');
    const $filteringSorting = document.createElement('drop-box');
    $filteringSorting.setAttribute('name', 'filteringSorting');

    $dropBoxGroup.appendChild($filteringCategory);
    $dropBoxGroup.appendChild($filteringSorting);
    $parent.prepend($dropBoxGroup);
  }

  #addEventToFilteringAndSorting() {
    const $filteringCategory = document.getElementById('filtering-category');
    const $filteringSorting = document.getElementById('filtering-sorting');

    $filteringCategory?.addEventListener('change', () => {
      this.#changeAllListByFilteringAndSorting();
    });

    $filteringSorting?.addEventListener('change', () => {
      this.#changeAllListByFilteringAndSorting();
    });
  }

  #changeAllListByFilteringAndSorting() {
    const option = this.#getSelectedOption();

    if (!option) return;

    const { category, sorting } = option;
    const filteredList = this.#filteringList(category);
    const sortedList = this.#sortingList(filteredList, sorting);
    const $allRestaurantList = document.querySelector('.all-restaurant-list');
    const $parent = $allRestaurantList?.parentElement;

    if (!$parent) return;
    // drop box 를 제외한 리스만 변경
    const $newAllRestaurantList = document.createElement(
      $allRestaurantList.tagName,
    );
    $newAllRestaurantList.className = $allRestaurantList.className;

    const $list = this.createListLayout(sortedList);
    $newAllRestaurantList.appendChild($list);

    $parent.replaceChild($newAllRestaurantList, $allRestaurantList);
  }

  #getSelectedOption() {
    const $filteringCategory = document.querySelector('#filtering-category');
    const $filteringSorting = document.querySelector('#filtering-sorting');

    if (
      $filteringCategory instanceof HTMLSelectElement &&
      $filteringSorting instanceof HTMLSelectElement
    ) {
      return {
        category: this.#getSelectedValue($filteringCategory),
        sorting: this.#getSelectedValue($filteringSorting),
      };
    }

    return undefined;
  }

  /**
   * select 요소에서 선택된 option 값 가져오기
   */
  #getSelectedValue(selectElement: HTMLSelectElement) {
    const selectedIndex = selectElement?.selectedIndex;
    const selectedValue = selectElement?.options[selectedIndex].value;

    return selectedValue;
  }

  /**
   * 선택된 음식점 카테고리에 해당하는 음식점 리스트 반환
   */
  #filteringList(category: string) {
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
  }

  /**
   * 음식점 리스트를 선택된 정렬 옵션에 따라 정렬한 뒤 이를 반환
   */
  #sortingList(list: RestaurantInfo[] | undefined, sorting: string) {
    if (!list) return;
    const sortingOptions = DROP_BOX_MAP.get('filteringSorting')?.options.map(
      (option) => option.value,
    );
    const isInvalidSortingOption =
      !sorting || !sortingOptions?.includes(sorting);

    if (isInvalidSortingOption) return;

    const restaurantList = new RestaurantList();

    return restaurantList.sortRestaurants(list, sorting as SortingOption);
  }
}

export default AllRestaurantList;
