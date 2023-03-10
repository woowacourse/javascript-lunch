import { useEvents } from '../../utils/core';
import '../css/Tab.css';

interface TabOption {
  oftenOption: boolean;
  handleOftenTab: (isOften: boolean) => void;
}

function Tab({ oftenOption, handleOftenTab }: TabOption) {
  const [addEvent] = useEvents('.restaurant-tab-container');

  addEvent('click', '.restaurant-tab', (e) => {
    if (e.target instanceof HTMLButtonElement) {
      const id = e.target.dataset.id;
      const isOften = id === 'often';
      // console.log(id, isOften);
      handleOftenTab(isOften);
    }
  });

  return `
   <section class="restaurant-tab-container">
        <div class="restaurant-tab">
            <button class="tab-button ${
              !oftenOption ? 'active' : ''
            }" data-id="all"><h3 class="text-subtitle">모든 음식점</h3></button>
            <button class="tab-button ${
              oftenOption ? 'active' : ''
            }" data-id="often"><h3 class="text-subtitle">자주 가는 음식점</button>
        </div>
    </section>
 `;
}

export { Tab };
