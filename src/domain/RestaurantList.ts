import Restaurant from './Restaurant';

class RestaurantList {
  constructor(private list: Restaurant[] = []) {}

  add(restaurant: Restaurant) {
    this.list.push(restaurant);
  }

  filterByCategory() {}

  sortByCondition() {}
}
