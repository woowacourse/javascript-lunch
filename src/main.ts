import { DOM } from './dom';
import $Header from './UI/components/header/Header';
import AddRestaurantModal from './UI/pages/modal/components/AddRestaurantModal';
import RestaurantFilterContainer from './UI/pages/filter/RestaurantFilterContainer';
import RestaurantListRenderer from './UI/components/restaurant/RestaurantListRenderer';
import RestaurantDetailModal from './UI/pages/modal/components/RestaurantDetailModal';
import Restaurant from './Domain/Restaurant';

document.addEventListener('DOMContentLoaded', () => {
  // 상세 모달 초기화
  let detailModal: RestaurantDetailModal | null = null;

  // 레스토랑 리스트 렌더러 초기화
  const restaurantListRenderer = RestaurantListRenderer.getInstance((restaurant: Restaurant) => {
    if (!detailModal) {
      detailModal = new RestaurantDetailModal(restaurant, () => restaurantListRenderer.refreshRestaurantList());
      if (DOM.APP) {
        DOM.APP.appendChild(detailModal.getElement());
      }
    } else {
      detailModal.updateRestaurant(restaurant);
    }
    detailModal.open();
  });

  // 레스토랑 리스트 DOM에 추가
  if (DOM.APP) {
    const mainElement = DOM.APP.querySelector('main');
    if (mainElement) {
      mainElement.appendChild(restaurantListRenderer.getElement());
    }
  }

  // 추가 모달 초기화 및 DOM에 추가
  const addRestaurantModal = new AddRestaurantModal(() => restaurantListRenderer.refreshRestaurantList());
  if (DOM.APP) {
    DOM.APP.appendChild(addRestaurantModal.getElement());
  }

  // 헤더 초기화 및 DOM에 추가
  const header = new $Header(() => addRestaurantModal.open());
  if (DOM.APP) {
    DOM.APP.prepend(header.getElement());
  }

  // 토글 이벤트 바인딩
  if (DOM.ALL_RESTAURANTS_TOGGLE && DOM.FAVORITE_RESTAURANTS_TOGGLE) {
    DOM.ALL_RESTAURANTS_TOGGLE.addEventListener('click', () => {
      DOM.ALL_RESTAURANTS_TOGGLE?.classList.add('active');
      DOM.FAVORITE_RESTAURANTS_TOGGLE?.classList.remove('active');
      if (DOM.RESTAURANT_FILTER_CONTAINER) {
        DOM.RESTAURANT_FILTER_CONTAINER.style.display = '';
      }
      restaurantListRenderer.handleToggleChange(false);
    });

    DOM.FAVORITE_RESTAURANTS_TOGGLE.addEventListener('click', () => {
      DOM.ALL_RESTAURANTS_TOGGLE?.classList.remove('active');
      DOM.FAVORITE_RESTAURANTS_TOGGLE?.classList.add('active');
      if (DOM.RESTAURANT_FILTER_CONTAINER) {
        DOM.RESTAURANT_FILTER_CONTAINER.style.display = 'none';
      }
      restaurantListRenderer.handleToggleChange(true);
    });
  }

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
