export function createStarButton({name, favoriteRestaurantNames, starCallback = ''}) {
  const starButton = render({name, favoriteRestaurantNames});
  if (starCallback) starButton.addEventListener('click', (event) => {
      starCallback(event);
    });
  return starButton;
}

function render({name, favoriteRestaurantNames}) {
  const star = document.createElement('img');
  if (favoriteRestaurantNames.includes(name)) {
    star.className = 'star filled';
    star.src = './favorite-icon-filled.png';
  } else {
    star.className = 'star lined';
    star.src = './favorite-icon-lined.png';
  }
  star.alt = '추천별';
  return star;
}
