interface DOMElements {
  APP: HTMLElement | null;
  RESTAURANT_LIST: HTMLElement | null;
}

export const DOM: DOMElements = {
  APP: document.getElementById('app'),
  RESTAURANT_LIST: document.getElementById('restaurant-list'),
};
