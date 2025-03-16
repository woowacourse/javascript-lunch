import { RestaurantState } from '../../types/domain';
import { selectElement } from '../utils/dom.ts';

function selectCategory(stateHandler: (state: Partial<RestaurantState>) => void, renderer: () => void) {
  const categoryFilter = selectElement('#category-filter');

  categoryFilter.addEventListener('change', (event: Event) => {
    const target = event.target as HTMLSelectElement;
    const filteringKey = target.value;

    stateHandler({ category: filteringKey });

    renderer();
  });
}

export default selectCategory;
