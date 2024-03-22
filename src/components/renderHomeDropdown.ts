import type RestaurantListContainer from './restaurantList/RestaurantListContainer';
import type RestaurantList from '@/domain/RestaurantList';
import type { TCategory, TSorting, TTabMenu } from '@/types/restaurant';

import Dropdown from './common/dropdown/Dropdown';

import { FILTERED_CATEGORY, FILTERED_CATEGORY_ATTRIBUTE, SORTING, SORTING_ATTRIBUTE } from '@/constants/filter';
import dom from '@/utils/dom';
import dropdown from '@/utils/dropdown';

interface ICreateDropdown {
  $restaurantFilterContainer: HTMLElement;
  restaurantListContainer: RestaurantListContainer;
  restaurantList: RestaurantList;
  tabKind: TTabMenu;
}

const renderHomeDropdown = (
  restaurantListContainer: RestaurantListContainer,
  restaurantList: RestaurantList,
  tabKind: TTabMenu,
) => {
  const $restaurantFilterContainer = dom.getElement('.restaurant-filter-container');
  $restaurantFilterContainer.replaceChildren();
  renderCategoryDropdown({ $restaurantFilterContainer, restaurantListContainer, restaurantList, tabKind });
  renderSortingDropdown({ $restaurantFilterContainer, restaurantListContainer, restaurantList, tabKind });
};

const renderCategoryDropdown = ({
  $restaurantFilterContainer,
  restaurantListContainer,
  restaurantList,
  tabKind,
}: ICreateDropdown) => {
  new Dropdown({
    $target: $restaurantFilterContainer,
    props: {
      attributes: FILTERED_CATEGORY_ATTRIBUTE,
      options: FILTERED_CATEGORY,
      onSelect: () => {
        const category = dropdown.getSelectedValue<TCategory>('#category-filter');
        const sortingCondition = dropdown.getSelectedValue<TSorting>('#sorting-filter');
        restaurantList.filterByCategory(category, tabKind);
        restaurantList.sortByCondition(sortingCondition);
        restaurantListContainer.renderRestaurantList(restaurantList, tabKind);
      },
    },
  });
};

const renderSortingDropdown = ({
  $restaurantFilterContainer,
  restaurantListContainer,
  restaurantList,
  tabKind,
}: ICreateDropdown) => {
  new Dropdown({
    $target: $restaurantFilterContainer,
    props: {
      attributes: SORTING_ATTRIBUTE,
      options: SORTING,
      onSelect: () => {
        const sortingCondition = dropdown.getSelectedValue<TSorting>('#sorting-filter');
        restaurantList.sortByCondition(sortingCondition);
        restaurantListContainer.renderRestaurantList(restaurantList, tabKind);
      },
    },
  });
};

export default renderHomeDropdown;
