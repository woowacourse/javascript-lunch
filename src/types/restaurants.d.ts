interface Restaurants {
  restaurants: Restaurant[];
  filterByCategory: (category: Category) => Restaurant[];
}
