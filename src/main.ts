import { DOM } from './dom';
import Header from './UI/components/header/Header';
import AddRestaurantModal from './UI/pages/modal/components/AddRestaurantModal';
import RestaurantFilterContainer from './UI/pages/filter/RestaurantFilterContainer';
import RestaurantListRenderer from './UI/components/restaurant/RestaurantListRenderer';

const restaurantListRenderer = RestaurantListRenderer.getInstance();

const addRestaurantModal = new AddRestaurantModal(() => restaurantListRenderer.refreshRestaurantList());
new Header(() => addRestaurantModal.handleToggleModal());

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

  const mainElement = DOM.APP.querySelector('main');
  if (mainElement) {
    if (mainElement.firstChild) {
      mainElement.insertBefore(filterContainer.getElement(), mainElement.firstChild);
    } else {
      mainElement.appendChild(filterContainer.getElement());
    }
  }

  restaurantListRenderer.handleFilterChange('전체', 'name');
};

const initializeApp = () => {
  initializeFilters();
};

initializeApp();
