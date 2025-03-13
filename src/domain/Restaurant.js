class Restaurant {
  information = {};

  constructor({ category, name, distance, description = "", link = "", favoriteStar = false }) {
    this.information.category = category;
    this.information.name = name;
    this.information.distance = distance;
    this.information.description = description;
    this.information.link = link;
    this.information.favoriteStar = favoriteStar;
  }

  toggleFavorite() {
    this.information.favoriteStar = !this.information.favoriteStar;
  }
}
export default Restaurant;
