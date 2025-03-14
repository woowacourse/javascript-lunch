import { DOM } from './dom';
import { getRestaurantList, getFilteredRestaurants } from './Domain/services/RestaurantService';
import Restaurant from './Domain/Restaurant';
import Header from './UI/components/header/Header';
import RestaurantItem from './UI/components/restaurant/RestaurantItem';
import AddRestaurantModal from './UI/pages/modal/components/AddRestaurantModal';
import RestaurantFilterContainer from './UI/pages/filter/RestaurantFilterContainer';

const addRestaurantModal = new AddRestaurantModal();
new Header(() => addRestaurantModal.handleToggleModal());

const renderRestaurantList = (restaurantList: Restaurant[]) => {
  if (!DOM.RESTAURANT_LIST) return;

  DOM.RESTAURANT_LIST.innerHTML = '';

  restaurantList.forEach((restaurant: Restaurant) => {
    const restaurantItem = new RestaurantItem(restaurant).getElement();
    DOM.RESTAURANT_LIST!.appendChild(restaurantItem as unknown as Node);
  });
};

const handleFilterChange = (category: string, sortBy: string) => {
  const filteredRestaurants = getFilteredRestaurants(category, sortBy);
  renderRestaurantList(filteredRestaurants);
};

const initializeFilters = () => {
  if (!DOM.APP) return;

  const filterContainer = new RestaurantFilterContainer(
    (category) => {
      const sortingFilter = filterContainer.getSortingValue();
      handleFilterChange(category, sortingFilter);
    },
    (sortBy) => {
      const categoryFilter = filterContainer.getCategoryValue();
      handleFilterChange(categoryFilter, sortBy);
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

  handleFilterChange('전체', 'name');
};

const initializeApp = () => {
  initializeFilters();
};

initializeApp();
