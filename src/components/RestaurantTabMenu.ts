import { TAB_BUTTON_ATTRIBUTE } from '../constants/domAttributes';
import { createTabButton } from '../template/TabButtonTemplate';
import { $ } from '../utils/domSelectors';

class RestaurantTabMenu {
  private tabMenu: HTMLElement = $<HTMLElement>('.restaurant-navigation');

  addEvent(handleTabChange: CallableFunction) {
    this.tabMenu.addEventListener('change', (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        handleTabChange(event.target.id);
      }
    });
  }

  render() {
    this.tabMenu.insertAdjacentHTML(
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
}

export default new RestaurantTabMenu();
