import { Tab } from '@res/constants/enum';
import Component from '@res/core/Component';
import { eventBus } from '@res/core/eventBus';
import { $, on } from '@res/utils/domUtils';

class MenuTabBar extends Component {
  tabToggle: Tab;

  constructor(element: HTMLElement) {
    super(element);

    this.tabToggle = Tab.All;
    this.render().subscribe().setEvent();
  }

  subscribe() {
    eventBus.subscribe('@delete-restaurant', () => {
      eventBus.dispatch('@click-tab', this.tabToggle);
    });

    return this;
  }

  template() {
    return `
      <button class="all-restaurant-button">모든 음식점</button>
      <button class="favorite-restaurant-button">자주 가는 음식점</button>
    `;
  }

  setEvent() {
    on($('.all-restaurant-button'), 'click', () => {
      this.tabToggle = Tab.All;
      eventBus.dispatch('@click-tab', this.tabToggle);
    });

    on($('.favorite-restaurant-button'), 'click', () => {
      this.tabToggle = Tab.Favorite;
      eventBus.dispatch('@click-tab', this.tabToggle);
    });

    return this;
  }
}

export default MenuTabBar;
