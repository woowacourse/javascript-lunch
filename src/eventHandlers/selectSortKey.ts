import { RestaurantState } from '../../types/domain';
import { selectElement } from '../utils/dom.ts';

function selectSortKey(stateHandler: (state: Partial<RestaurantState>) => void, renderer: () => void) {
  const sortSelector = selectElement('#sort-selector');

  sortSelector.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    const sortKey = target.value;

    stateHandler({ sort: sortKey });

    renderer();
  });
}

export default selectSortKey;
