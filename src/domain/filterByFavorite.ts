import { Restaurant } from '../../types/domain';

function filterByFavorite(isFavoriteTab: boolean, restaurants: Restaurant[]) {
  if (isFavoriteTab) {
    return restaurants.filter(({ favorite }) => favorite);
  }

  return restaurants;
}

export default filterByFavorite;
