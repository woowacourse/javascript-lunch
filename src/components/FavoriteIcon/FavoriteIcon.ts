interface Props {
  isFavorite: boolean;
  id?: string;
}

const createFavoriteIcon = ({ isFavorite, id }: Props) => {
  const favoriteBox = document.createElement('div');
  favoriteBox.classList.add('restaurant__favorite');
  if (id) favoriteBox.id = id;

  const starredIcon = document.createElement('img');

  starredIcon.setAttribute('src', 'favorite-icon-filled.png');
  starredIcon.classList.add('favorite');
  favoriteBox.appendChild(starredIcon);

  const unstarredIcon = document.createElement('img');
  unstarredIcon.setAttribute('src', 'favorite-icon-lined.png');
  unstarredIcon.classList.add('favorite');
  favoriteBox.appendChild(unstarredIcon);

  if (isFavorite) unstarredIcon.classList.add('hidden');
  else starredIcon.classList.add('hidden');

  favoriteBox.addEventListener('click', (e: Event) => {
    e.stopPropagation();
    if (starredIcon.classList.contains('hidden')) {
      starredIcon.classList.remove('hidden');
      unstarredIcon.classList.add('hidden');
    } else {
      starredIcon.classList.add('hidden');
      unstarredIcon.classList.remove('hidden');
    }
  });

  return favoriteBox;
};

export default createFavoriteIcon;
