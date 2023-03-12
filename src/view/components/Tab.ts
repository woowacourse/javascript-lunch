import '../css/Tab.css';

import { useEvents } from '../../utils/core';
import { TAB } from '../../constants/lunchRecommendation';

interface TabOption {
  oftenOption: boolean;
  handleOftenTab: (isOften: boolean) => void;
}

function Tab({ oftenOption, handleOftenTab }: TabOption) {
  const [addEvent] = useEvents('.restaurant-tab-container');

  addEvent('click', '.restaurant-tab', (e) => {
    if (e.target instanceof HTMLButtonElement) {
      const id = e.target.dataset.id;
      handleOftenTab(id === TAB.OFTEN);
    }
  });

  return `
   <section class="restaurant-tab-container">
        <div class="restaurant-tab">
            <button class="tab-button ${
              !oftenOption ? 'active' : ''
            } text-subtitle" data-id="all">모든 음식점</button>
            <button class="tab-button ${
              oftenOption ? 'active' : ''
            } text-subtitle" data-id="often">자주 가는 음식점</button>
        </div>
    </section>
 `;
}

export { Tab };
