const sortAndFilter = (
  restaurantList,
  sortOption = "name",
  filterOption = "전체"
) => {
  const filterByCategory = (restaurantList, category) => {
    if (category === "전체") {
      return restaurantList;
    }
    return restaurantList.filter(
      (restaurant) => restaurant.category === category
    );
  };

  const sorting = (restaurantList, option) => {
    const sortByOptions = {
      name: (array) => [...array].sort((a, b) => a.name.localeCompare(b.name)),
      distance: (array) => [...array].sort((a, b) => a.distance - b.distance),
    };
    return sortByOptions[option](restaurantList);
  };

  return sorting(filterByCategory(restaurantList, filterOption), sortOption);
};

export default sortAndFilter;
