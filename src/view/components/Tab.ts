import '../css/Tab.css';

import { useEvents } from '../../utils/core';
import updateActiveTab from '../../utils/common/tabStyleHandler';

interface TabProps {
  often: VoidFunction;
}

function Tab({ often }: TabProps) {
  const [addEvent] = useEvents('.restaurant-tab');

  addEvent('click', '.often-tab', (e) => {
    updateActiveTab('.often-tab');
    often();
  });

  return `
   <section class="restaurant-tab-container">
        <div class="restaurant-tab">
            <button class="all-tab" id="active"><h3 class="text-subtitle">모든 음식점</h3></button>
            <button class="often-tab"><h3 class="text-subtitle">자주 가는 음식점</button>
        </div>
    </section>
 `;
}

export { Tab };
