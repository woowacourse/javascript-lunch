import { TabMenuProps } from '../../interface/RestaurantInterfaces';
import { $ } from '../../utils/querySelector';

const TabMenu = (menuList: TabMenuProps[]) => {
  const render = () => {
    const menuButtons = /* html */ menuList.map(menu => {
      return `<button id=${menu.id} class="button button--tabmenu">${menu.content}</button>`;
    });

    const tabContainer = $('.restaurant-tab-container');

    tabContainer.insertAdjacentHTML('beforeend', menuButtons.join(''));
  };

  render();
};

export default TabMenu;
