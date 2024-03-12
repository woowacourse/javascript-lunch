const FavoritesRepository = {
  toggleFavorites(restaurant: IRestaurant) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.findIndex((favorite: IRestaurant) => favorite.name === restaurant.name);

    if (index === -1) {
      localStorage.setItem('favorites', JSON.stringify([...favorites, restaurant]));
    } else {
      localStorage.setItem('favorites', JSON.stringify(favorites.slice(index, 1)));
    }
  },
};

export default FavoritesRepository;
