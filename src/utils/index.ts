import { RestaurantList } from '../domains';
import { Attributes } from '../types';

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
  const $customModal = document.querySelector('custom-modal');
  const $modal = $customModal?.shadowRoot?.querySelector('.modal');
  const modalContainerChildEl = document.querySelector(
    '#modal-container-child',
  );
  const $body = document.querySelector('body');

  if ($customModal instanceof HTMLElement) {
    $customModal.style.width = 'inherit';
    $customModal.style.height = 'inherit';
  }

  if ($modal && modalContainerChildEl) {
    $modal.classList.add('open');
    modalContainerChildEl.innerHTML = `${childTag}`;
  }

  if ($body) {
    $body.style.overflowY = 'hidden';
  }
};

export const closeModal = () => {
  const $customModal = document.querySelector('custom-modal');
  const $modal = $customModal?.shadowRoot?.querySelector('.modal');

  const $modalContainerChild = document.querySelector('#modal-container-child');

  if ($customModal instanceof HTMLElement) {
    $customModal.style.width = '';
    $customModal.style.height = '';
  }

  if ($modal && $modalContainerChild) {
    $modal?.classList.remove('open');
    $modalContainerChild.firstChild?.remove();
  }

  const $body = document.querySelector('body');
  if ($body) $body.style.overflowY = 'scroll';
};

export const findRestaurant = (storeName: string | null) => {
  const restaurantList = new RestaurantList().list;

  const store = restaurantList.find(
    (restaurant) => restaurant.name === storeName,
  );

  return store;
};
