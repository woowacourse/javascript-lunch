export const eventController = (restaurantCatalog) => {
  const $categorySelect = document.getElementById('category-select');

  $categorySelect.addEventListener('change', (e) => {
    const restaurants = restaurantCatalog.filterByCategory(e.target.value);

    const restaurantList = document.querySelector('.restaurant-list');

    restaurantList.setAttribute(
      'data-restaurants',
      JSON.stringify(restaurants.map((restaurant) => restaurant.getInfo())),
    );
  });
};
