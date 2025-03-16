import RestaurantType from "../../types/restaurant";

class Restaurant {
  restaurant: RestaurantType;

  constructor({ category, name, distance, description = "", link = "", favoriteStar = false }: RestaurantType) {
    this.restaurant = { category, name, distance, description, link, favoriteStar };
  }

  toggleFavorite(): void {
    this.restaurant.favoriteStar = !this.restaurant.favoriteStar;
  }
}
export default Restaurant;
