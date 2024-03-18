export function createFavoriteButton({
  name,
  favoriteRestaurantNames,
  favoriteCallback = '',
}) {
  const favoriteButton = render({ name, favoriteRestaurantNames });
  if (favoriteCallback)
    favoriteButton.addEventListener('click', (event) => {
      favoriteCallback(event);
    });
  return favoriteButton;
}

function render({ name, favoriteRestaurantNames }) {
  const buttonImage = document.createElement('img');
  if (favoriteRestaurantNames.includes(name)) {
    buttonImage.className = 'star filled';
    buttonImage.src = './favorite-icon-filled.png';
  } else {
    buttonImage.className = 'star lined';
    buttonImage.src = './favorite-icon-lined.png';
  }
  buttonImage.alt = '추천별';
  return buttonImage;
}
