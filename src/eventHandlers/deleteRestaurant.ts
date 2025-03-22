import { selectElement } from '../utils/dom.ts';

function deleteRestaurant(dataHandler: (id: number) => void, renderer: () => void) {
  const handleDeleteClick = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    const targetModal = target.closest('.modal-container') as HTMLDivElement;

    const restaurantItem = selectElement('.restaurant', targetModal) as HTMLLIElement;
    const id = Number(restaurantItem.dataset.id);

    dataHandler(id);

    renderer();
  };

  const deleteItemButton = selectElement('.delete-item-button');
  if (deleteItemButton instanceof HTMLButtonElement) {
    deleteItemButton.addEventListener('click', handleDeleteClick);
  }
}

export default deleteRestaurant;
