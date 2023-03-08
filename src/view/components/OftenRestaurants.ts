import updateActiveTab from '../../utils/common/tabStyleHandler';
import { useEvents } from '../../utils/core';

interface OftenProps {
  all: VoidFunction;
}

function OftenRestaurants({ all }: OftenProps) {
  const [addEvent] = useEvents('.restaurant-tab');

  addEvent('click', '.all-tab', (e) => {
    updateActiveTab('.all-tab');
    all();
  });

  return `
        <section class="often-restaurant-container">
            안뇽
        </section>
    `;
}

export { OftenRestaurants };
