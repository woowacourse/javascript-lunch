import { TAB_BUTTON_ATTRIBUTE } from '../constants/domAttributes';
import TabButton from './TabButton';

class RestaurantTabMenu {
  private allTab: TabButton = new TabButton(TAB_BUTTON_ATTRIBUTE.ALL_RESTAURANTS, '모든 음식점');
  private favoriteTab: TabButton = new TabButton(
    TAB_BUTTON_ATTRIBUTE.FAVORITE_RESTAURANTS,
    '자주 가는 음식점'
  );

  create() {
    return `
      <nav class="restaurant-navigation">
        ${this.allTab.create()}
        ${this.favoriteTab.create()}
      </nav>
    `;
  }

  addEvent(onClick: CallableFunction) {
    this.allTab.addEvent(onClick);
    this.favoriteTab.addEvent(onClick);
  }
}

export default new RestaurantTabMenu();
