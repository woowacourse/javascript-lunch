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
    <div class="tab-container text-tab">
      <input type="radio" id="all-tab" name="tab" class="all-restaurant-button" checked />
      <label for="all-tab" >모든 음식점</label>
      <input type="radio" id="favorite-tab" name="tab" class="favorite-restaurant-button"/>
      <label for="favorite-tab">자주 가는 음식점</label>
    <div>
    `;
  }

  setEvent() {
    on({
      target: $('.all-restaurant-button'),
      eventName: 'click',
      handler: () => {
        this.tabToggle = Tab.All;

        eventBus.dispatch('@click-tab', this.tabToggle);
      },
    });

    on({
      target: $('.favorite-restaurant-button'),
      eventName: 'click',
      handler: () => {
        this.tabToggle = Tab.Favorite;

        eventBus.dispatch('@click-tab', this.tabToggle);
      },
    });

    return this;
  }
}

export default MenuTabBar;
