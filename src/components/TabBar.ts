import { Component } from '../interface';
import { TabBarSelect } from '../type';

type TabBarState = {
  tabBarSelect: TabBarSelect;
  onClickTabBar: (e: Event) => void;
};

type TabBarProps = {
  $parent: HTMLElement;
  tabBarSelect: TabBarSelect;
  onClickTabBar: (e: Event) => void;
};

export default class TabBar implements Component<TabBarState> {
  $target: HTMLElement;
  state: TabBarState;

  constructor({ $parent, tabBarSelect, onClickTabBar }: TabBarProps) {
    this.$target = document.createElement('div');
    this.$target.classList.add('tab-bar');
    this.state = { tabBarSelect, onClickTabBar };

    $parent.appendChild(this.$target);
  }

  addEvent() {
    const buttons = this.$target.querySelectorAll('.tab-bar-select');
    for (const button of buttons) {
      button.addEventListener('click', this.state.onClickTabBar);
    }
  }

  render() {
    this.$target.innerHTML = `
            <button class='tab-bar-select' data-select='${
              this.state.tabBarSelect === 'all'
            }' data-type='all'>
                모든 음식점
            </button>
            <button class='tab-bar-select' data-select='${
              this.state.tabBarSelect === 'favorite'
            }' data-type='favorite'>
                자주 가는 음식점 
            </button>
        `;
    this.addEvent();
  }
}
