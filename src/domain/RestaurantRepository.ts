function getRestaurants() {
  const restaurants = localStorage.getItem('restaurants');
  return restaurants ? JSON.parse(restaurants) : [];
}

function getFilteredByTheme(restaurants: IRestaurant[], theme: TTheme) {
  if (theme === '모든 음식점') return restaurants;
  if (theme === '자주 가는 음식점') {
    return restaurants.filter((restaurant) => restaurant.favorite === true);
  }
}

function getFilteredByCategory(restaurants: IRestaurant[], category: TAllCategory) {
  return category === '전체' ? restaurants : restaurants.filter((restaurant) => restaurant.category === category);
}

function getSortedByName(restaurants: IRestaurant[]) {
  return [
    ...restaurants.sort((a, b) => {
      return a.name.localeCompare(b.name);
    }),
  ];
}

function getSortedByDistance(restaurants: IRestaurant[]) {
  return [...restaurants.sort((a, b) => a.distance - b.distance)];
}

const RestaurantRepository = {
  addRestaurant(restaurant: IRestaurant) {
    const restaurants = localStorage.getItem('restaurants');

    if (restaurants) {
      localStorage.setItem('restaurants', JSON.stringify([...JSON.parse(restaurants), restaurant]));
    } else {
      localStorage.setItem('restaurants', JSON.stringify([restaurant]));
    }
  },

  changeFavoriteState(restaurantName: string) {
    const restaurants = getRestaurants();
    const updatedRestaurants = restaurants.map((restaurant: IRestaurant) => {
      if (restaurant.name === restaurantName) {
        return { ...restaurant, favorite: !restaurant.favorite };
      }
      return restaurant;
    });

    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
    return updatedRestaurants;
  },

  transformByTheme(theme: TTheme) {
    const restaurants = getRestaurants();
    const filteredRestaurants = getFilteredByTheme(restaurants, theme);
    return filteredRestaurants;
  },

  transformBySelector(filteredByThemeRestaurant: IRestaurant[], category: TAllCategory, sortingOption: TSortingOption) {
    const restaurants = filteredByThemeRestaurant;
    const filteredRestaurants = getFilteredByCategory(restaurants, category);
    return sortingOption === '이름순' ? getSortedByName(filteredRestaurants) : getSortedByDistance(filteredRestaurants);
  },
};

export default RestaurantRepository;
