const createRestaurantList = () => {
  const restaurant_list_container = document.querySelector(
    ".restaurant-list-container"
  );
  const restaurantList = `
  <ul class="restaurant-list"></ul>
  `;

  restaurant_list_container.insertAdjacentHTML("beforeend", restaurantList);
};

export default createRestaurantList;
