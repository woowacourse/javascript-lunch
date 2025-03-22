import { selectElement } from '../utils/dom.ts';

function openRestaurantInfoModal(renderer: (id: number) => void) {
  const handleRestaurantClick = (event: Event) => {
    const target = event.target as HTMLElement;

    if (!target.closest('.restaurant-list') || target.closest('.restaurant__favorite')) {
      return;
    }

    const targetModal = selectElement('.restaurant-info-modal');
    targetModal.classList.add('modal--open');

    const restaurantItem = target.closest('.restaurant') as HTMLLIElement;
    const id = Number(restaurantItem.dataset.id);

    renderer(id);
  };

  const restaurantList = selectElement('.restaurant-list');
  restaurantList.addEventListener('click', handleRestaurantClick);
}

export default openRestaurantInfoModal;
