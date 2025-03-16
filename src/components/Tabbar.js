import createElement from '../utils/createElement.js';

function createTabBar(onTabClick) {
  const tabBarContainer = createElement('div', 'restaurant-tab-bar-container');

  const allTab = createElement('div', 'tab-item', '모든 음식점');
  allTab.classList.add('tab-item-selected');

  const favoriteTab = createElement('div', 'tab-item', '자주 가는 음식점');

  const handleTabClick = (tab) => {
    if (tab === 'all') {
      allTab.classList.add('tab-item-selected');
      favoriteTab.classList.remove('tab-item-selected');
    } else {
      favoriteTab.classList.add('tab-item-selected');
      allTab.classList.remove('tab-item-selected');
    }
    onTabClick(tab);
  };

  allTab.addEventListener('click', () => handleTabClick('all'));
  favoriteTab.addEventListener('click', () => handleTabClick('favorite'));

  tabBarContainer.appendChild(allTab);
  tabBarContainer.appendChild(favoriteTab);

  return tabBarContainer;
}

export default createTabBar;
