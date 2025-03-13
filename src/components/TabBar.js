import { CATEGORY_OPTIONS, SORT_OPTIONS } from '../../public/restaurantData.js';
import createElement from '../utils/createElement.js';
import createSectionContainer from './common/SectionContainer.js';
import { createSelectBox } from './common/SelectBox.js';

function createTabBar(onClick) {
  const section = createSectionContainer('restaurant-tab-bar-container');
  const allTabDiv = createElement({
    tag: 'div',
    className: 'tab-item tab-item-selected',
    textContent: '모든 음식점',
    attributes: {
      value: 'all',
    },
  });
  const favoriteTabDiv = createElement({
    tag: 'div',
    className: 'tab-item',
    textContent: '자주 가는 음식점',
    attributes: {
      value: 'favorite',
    },
  });

  allTabDiv.addEventListener('click', (event) => {
    toggleTab(allTabDiv, favoriteTabDiv);
    onClick(event);
  });

  favoriteTabDiv.addEventListener('click', (event) => {
    toggleTab(allTabDiv, favoriteTabDiv);
    onClick(event);
  });

  section.append(allTabDiv, favoriteTabDiv);

  return section;
}

function toggleTab(allTabDiv, favoriteTabDiv) {
  allTabDiv.classList.toggle('tab-item-selected');
  favoriteTabDiv.classList.toggle('tab-item-selected');
}

export default createTabBar;
