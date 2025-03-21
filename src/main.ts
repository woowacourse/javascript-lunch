import { DOM } from './dom';
import $Header from './UI/components/header/Header';
import AddRestaurantModal from './UI/pages/modal/components/AddRestaurantModal';
import RestaurantFilterContainer from './UI/pages/filter/RestaurantFilterContainer';
import RestaurantListRenderer from './UI/components/restaurant/RestaurantListRenderer';

document.addEventListener('DOMContentLoaded', () => {
  const restaurantListRenderer = RestaurantListRenderer.getInstance();

  const addRestaurantModal = new AddRestaurantModal(() => restaurantListRenderer.refreshRestaurantList());

  const $header = new $Header(() => addRestaurantModal.handleToggleModal());
  DOM.APP?.prepend($header.getElement());

  const initializeFilters = () => {
    if (!DOM.APP) return;

    const filterContainer = new RestaurantFilterContainer(
      (category) => {
        const sortingFilter = filterContainer.getSortingValue();
        restaurantListRenderer.handleFilterChange(category, sortingFilter);
      },
      (sortBy) => {
        const categoryFilter = filterContainer.getCategoryValue();
        restaurantListRenderer.handleFilterChange(categoryFilter, sortBy);
      },
    );

    const filterElement = filterContainer.getElement();
    filterElement.id = 'restaurant-filter-container';

    const mainElement = DOM.APP.querySelector('main');
    if (mainElement) {
      const toggleContainer = document.getElementById('restaurant-toggle-container');
      if (toggleContainer && toggleContainer.nextSibling) {
        mainElement.insertBefore(filterElement, toggleContainer.nextSibling);
      } else {
        mainElement.appendChild(filterElement);
      }
    }

    DOM.RESTAURANT_FILTER_CONTAINER = filterElement;

    restaurantListRenderer.handleFilterChange('전체', 'name');
  };

  const initializeApp = () => {
    initializeFilters();
  };

  initializeApp();
});
