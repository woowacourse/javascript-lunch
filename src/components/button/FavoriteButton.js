import { isRestaurantFavorite, updateFavoriteStatus } from '../../service/favoriteService.ts';
import createDOMElement from '../../util/createDomElement.js';
import { $, $all } from '../../util/selector.js';

const IMAGE_SRC = {
  filled: 'images/favorite-icon-filled.png',
  lined: 'images/favorite-icon-lined.png'
};

function FavoriteButton({ id }) {
  const imgElement = createDOMElement({
    tag: 'img',
    className: 'favorite-icon',
    src: IMAGE_SRC.lined,
    alt: '자주가는 음식점',
    onClick: async (event) => {
      await toggleFavoriteIcon(event, id, imgElement);
    }
  });

  async function updateFavoriteIcon() {
    const isFavorite = await isRestaurantFavorite(id);
    imgElement.src = isFavorite ? IMAGE_SRC.filled : IMAGE_SRC.lined;
  }

  updateFavoriteIcon();

  return createDOMElement({
    tag: 'div',
    className: 'restaurant__star',
    children: [imgElement]
  });
}

export default FavoriteButton;

async function toggleFavoriteIcon(event, id, imgElement) {
  event.stopPropagation();
  const isFavorite = await updateFavoriteStatus(id);
  imgElement.src = isFavorite ? IMAGE_SRC.filled : IMAGE_SRC.lined;
  updateSingleRestaurantItem(id);
  updateModalFavoriteIcon(id);
}

async function updateSingleRestaurantItem(id) {
  const restaurantItem = $(`.restaurant[data-id="${id}"]`);

  const imgElement = restaurantItem.querySelector('.favorite-icon');

  const isFavorite = await isRestaurantFavorite(id);
  imgElement.src = isFavorite ? IMAGE_SRC.filled : IMAGE_SRC.lined;
}

async function updateModalFavoriteIcon(id) {
  const modalFavoriteIcons = $all('.modal .favorite-icon');
  const isFavorite = await isRestaurantFavorite(id);
  modalFavoriteIcons.forEach((icon) => {
    icon.src = isFavorite ? IMAGE_SRC.filled : IMAGE_SRC.lined;
  });
}
