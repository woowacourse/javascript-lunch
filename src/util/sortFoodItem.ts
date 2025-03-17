export function sortFoodItem(sortOption: string, foodItems: FoodItemType[]) {
  if (sortOption === "이름순") {
    foodItems.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortOption === "거리순") {
    foodItems.sort((a, b) => a.distance - b.distance);
  }
  return foodItems;
}
