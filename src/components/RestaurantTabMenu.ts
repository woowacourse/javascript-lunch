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

    /**
     * 탭 변경시
     * 1. .restaurant-menu--active 클래스 추가 및 제거
     * 2. 음식점 목록 리렌더링 -> 1. 좋아요 있는 것들만 아니면 전체, 2. 필터/정렬대로 다시 목록 재가공
     */
  }
}

export default new RestaurantTabMenu();
