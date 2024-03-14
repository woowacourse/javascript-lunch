import { DEFAULT_TAB } from '../../constant/constants';
import { TabMenuProps } from '../../interface/RestaurantInterfaces';
import { $ } from '../../utils/querySelector';

const TabMenu = (menuList: TabMenuProps[]) => {
  const initTab = () => {
    const defaultTab = $(`#${DEFAULT_TAB}`);
    defaultTab.classList.add('active');
  };

  const render = () => {
    const menuButtons = /* html */ menuList.map(menu => {
      return `<button id=${menu.id} class="button button--tabmenu">${menu.content}</button>`;
    });

    const tabContainer = $('.restaurant-tab-container');

    tabContainer.insertAdjacentHTML('beforeend', menuButtons.join(''));
    initTab();
  };

  render();
};

export default TabMenu;
