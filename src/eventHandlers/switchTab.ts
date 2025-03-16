import { RestaurantState } from '../../types/domain';
import { selectElement } from '../utils/dom.ts';

function switchTab(
  stateHandler: (state: Partial<RestaurantState>) => void,
  renderer: (isFavoriteTab: boolean) => void,
) {
  let selected = selectElement('.selected');

  const handleTabClick = (event: Event) => {
    const target = event.target as HTMLButtonElement;
    const tab = target.classList.contains('tab');
    if (!tab) {
      return;
    }

    if (selected) {
      selected.classList.remove('selected');
    }

    selected = target;
    selected.classList.add('selected');

    const isFavoriteTab = target.dataset.tab === 'favorite';
    stateHandler({ isFavoriteTab });

    renderer(isFavoriteTab);
  };

  const tabContainer = selectElement('.tab-container');
  tabContainer.addEventListener('click', handleTabClick);
}

export default switchTab;
