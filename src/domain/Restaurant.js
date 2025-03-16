class Restaurant {
  restaurant = {};

  constructor({ category, name, distance, description = "", link = "", favoriteStar = false }) {
    this.restaurant.category = category;
    this.restaurant.name = name;
    this.restaurant.distance = distance;
    this.restaurant.description = description;
    this.restaurant.link = link;
    this.restaurant.favoriteStar = favoriteStar;
  }

  toggleFavorite() {
    this.restaurant.favoriteStar = !this.restaurant.favoriteStar;
  }
}
export default Restaurant;
