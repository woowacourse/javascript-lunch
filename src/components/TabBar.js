import { TAB } from '../constants/SETTING.js';
import createElement from '../utils/createElement.js';
import createSectionContainer from './common/SectionContainer.js';

function toggleTab(allTabDiv, favoriteTabDiv) {
  allTabDiv.classList.toggle('tab-item-selected');
  favoriteTabDiv.classList.toggle('tab-item-selected');
}

function createTabBar(onClick) {
  const section = createSectionContainer('restaurant-tab-bar-container');
  const allTabDiv = createElement({
    tag: 'div',
    className: 'tab-item tab-item-selected',
    textContent: '모든 음식점',
    attributes: {
      id: TAB.ALL,
    },
  });
  const favoriteTabDiv = createElement({
    tag: 'div',
    className: 'tab-item',
    textContent: '자주 가는 음식점',
    attributes: {
      id: TAB.FAVORITE,
    },
  });

  allTabDiv.addEventListener('click', (event) => {
    const { id } = event.target;

    if (
      (id === TAB.ALL && allTabDiv.classList.contains('tab-item-selected')) ||
      (id === TAB.FAVORITE && favoriteTabDiv.classList.contains('tab-item-selected'))
    ) {
      return;
    }

    toggleTab(allTabDiv, favoriteTabDiv);
    onClick(event);
  });

  favoriteTabDiv.addEventListener('click', (event) => {
    const { id } = event.target;
    if (
      (id === TAB.ALL && allTabDiv.classList.contains('tab-item-selected')) ||
      (id === TAB.FAVORITE && favoriteTabDiv.classList.contains('tab-item-selected'))
    ) {
      return;
    }

    toggleTab(allTabDiv, favoriteTabDiv);
    onClick(event);
  });

  section.append(allTabDiv, favoriteTabDiv);

  return section;
}

export default createTabBar;
