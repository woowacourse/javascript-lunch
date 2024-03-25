import { $ } from '../../utils/querySelector';

interface TabMenuItem {
  id: string;
  content: string;
}

interface Props {
  tabs: TabMenuItem[];
  defaultTab: string;
}

const createTabMenu = ({ tabs, defaultTab }: Props) => {
  const initTab = () => {
    const tab = $(`#${defaultTab}`);
    tab.classList.add('active');
  };

  const render = () => {
    const menuButtons = tabs.map(menu => {
      return /* html */ `
        <button id=${menu.id} class="button button--tabmenu">${menu.content}</button>
      `;
    });

    const tabContainer = $('.restaurant-tab-container');
    tabContainer.insertAdjacentHTML('beforeend', menuButtons.join(''));

    initTab();
  };

  render();
};

export default createTabMenu;
