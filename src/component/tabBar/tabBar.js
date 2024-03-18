import { $ } from '../../utils/selector.js';

function createTabBar(tabInfoList) {
  const tabBarBaseComponent = $('.restaurant-tab-bar-container');

  const tabBar = renderTabBar(tabInfoList);
  tabBarBaseComponent.appendChild(tabBar);
}

function renderTabBar(tabInfoList) {
  const tabContainer = document.createElement('ul');
  tabContainer.classList.add('tab-bar');

  const tabItemList = tabInfoList.map(({ name, render }, i) => {
    const tabItem = document.createElement('li');
    tabItem.classList.add('tab__item', 'tab__item__text');
    if (i === 0) tabItem.classList.add('selected__tab');

    tabItem.innerText = name;

    tabItem.addEventListener('click', (event) => {
      render();
      const beforeSelectedTab = tabContainer.querySelector('.selected__tab');
      beforeSelectedTab.classList.remove('selected__tab');

      const afterSelectedTab = event.target;
      afterSelectedTab.classList.add('selected__tab');
    });

    return tabItem;
  });

  // const selectedTabBar = document.createElement('div');
  // selectedTabBar.classList.add('selected__tab__bar');

  tabItemList.forEach((tabItem) => {
    tabContainer.appendChild(tabItem);
  });

  // tabContainer.appendChild(selectedTabBar);

  return tabContainer;
}

export default createTabBar;
