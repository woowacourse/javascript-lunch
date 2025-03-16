import { selectElement } from '../utils/dom.ts';

function toggleFavoriteButton(
  dataHandler: (id: number) => boolean,
  renderer: (id: number, isFavorite: boolean) => void,
) {
  const handleFavoriteClick = (event: Event) => {
    const target = event.target as HTMLButtonElement;
    const restaurantItem = target.closest('.restaurant') as HTMLLIElement;
    if (!restaurantItem || !target.closest('.restaurant__favorite')) return;

    const id = Number(restaurantItem.dataset.id);
    const isFavorite = dataHandler(id);

    renderer(id, isFavorite);
  };

  selectElement('.restaurant-list').addEventListener('click', handleFavoriteClick);
  selectElement('.restaurant-info-modal').addEventListener('click', handleFavoriteClick);
}

export default toggleFavoriteButton;
