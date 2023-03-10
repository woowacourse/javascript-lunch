import { TAB_BUTTON_ATTRIBUTE } from '../constants/domAttributes';
import { createTabButton } from '../template/TabButtonTemplate';
import { $ } from '../utils/domSelectors';

function addRestaurantTabMenuEvent(onChangeTab: CallableFunction) {
  const tabs = $<HTMLElement>('.restaurant-navigation');

  tabs.addEventListener('change', (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      onChangeTab(event.target.id);
    }
  });
}

function renderRestaurantTabMenus() {
  const tabs = $<HTMLElement>('.restaurant-navigation');

  tabs.insertAdjacentHTML(
    'beforeend',
    `
    ${createTabButton(
      TAB_BUTTON_ATTRIBUTE.ALL_RESTAURANTS_INPUT,
      TAB_BUTTON_ATTRIBUTE.ALL_RESTAURANTS_LABEL,
      '모든 음식점'
    )}
    ${createTabButton(
      TAB_BUTTON_ATTRIBUTE.FAVORITE_RESTAURANTS_INPUT,
      TAB_BUTTON_ATTRIBUTE.FAVORITE_RESTAURANTS_LABEL,
      '자주 가는 음식점'
    )}
    `
  );
}

export { addRestaurantTabMenuEvent, renderRestaurantTabMenus };
