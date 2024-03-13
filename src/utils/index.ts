import { STORAGE_KEY } from '../constants';
import { INITIAL_RESTAURANT_DATA } from '../data/restaurantData';
import { Attributes, RestaurantInfo } from '../types';

export const getDeepCopiedArray = <T>(array: T): T =>
  JSON.parse(JSON.stringify(array)) as T;

export const setObjectAttribute = (
  attributes: Attributes,
  el: HTMLElement,
): HTMLElement => {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value === null) return;

    if (key === 'required' && 'required' in el) {
      el.setAttribute('required', '');
      return;
    }

    if (key === 'disabled' && 'disabled' in el) {
      el.setAttribute('disabled', '');
      return;
    }

    el.setAttribute(key, value);
  });

  return el;
};

export const getFavoriteAttributeValue = (favorite?: boolean) =>
  favorite ? 'true' : 'false';

export const openModal = (childTag: string) => {
  const modalEl = document
    .querySelector('custom-modal')
    ?.shadowRoot?.querySelector('.modal');
  const modalContainerChildEl = document.querySelector(
    '#modal-container-child',
  );
  const bodyEl = document.querySelector('body');

  if (modalEl && modalContainerChildEl) {
    modalEl.classList.add('open');
    modalContainerChildEl.firstChild?.remove();
    modalContainerChildEl.innerHTML = `${childTag}`;
  }

  if (bodyEl) {
    bodyEl.style.overflowY = 'hidden';
  }
};

export const closeModal = () => {
  const modalEl = document
    .querySelector('custom-modal')
    ?.shadowRoot?.querySelector('.modal');

  const modalContainerChildEl = document.querySelector(
    '#modal-container-child',
  );

  if (modalEl && modalContainerChildEl) {
    modalEl?.classList.remove('open');
    modalContainerChildEl.firstChild?.remove();
  }

  const bodyEl = document.querySelector('body');
  if (bodyEl) bodyEl.style.overflowY = 'scroll';
};

export const findStoreFromLocalStorage = (storeName: string | null) => {
  const localStorageItem = localStorage.getItem(STORAGE_KEY.restaurants);
  const storeData: RestaurantInfo[] = localStorageItem
    ? (JSON.parse(localStorageItem) as RestaurantInfo[])
    : INITIAL_RESTAURANT_DATA;
  const store = storeData.find((data) => data.name === storeName);

  return store;
};
