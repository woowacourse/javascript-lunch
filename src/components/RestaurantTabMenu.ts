class RestaurantTabMenu {
  create() {
    return `
      <nav class="restaurant-navigation">
        <button class="restaurant-menu restaurant-menu--active text-body">모든 음식점</button>
        <button class="restaurant-menu text-body">자주 가는 음식점</button>
      </nav>
    `;
  }
}

export default new RestaurantTabMenu();
