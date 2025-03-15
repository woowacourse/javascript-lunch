interface DOMElements {
  APP: HTMLElement | null;
  RESTAURANT_LIST: HTMLElement | null;
  ALL_RESTAURANTS_TOGGLE: HTMLElement | null;
  FAVORITE_RESTAURANTS_TOGGLE: HTMLElement | null;
  RESTAURANT_FILTER_CONTAINER: HTMLElement | null;
}

export const DOM: DOMElements = {
  APP: document.getElementById('app'),
  RESTAURANT_LIST: document.getElementById('restaurant-list'),
  ALL_RESTAURANTS_TOGGLE: document.getElementById('all-restaurants'),
  FAVORITE_RESTAURANTS_TOGGLE: document.getElementById('favorite-restaurants'),
  RESTAURANT_FILTER_CONTAINER: null,
};
