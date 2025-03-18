import { Restaurant } from "../../types/global";

const filterByCategory = (restaurants: Restaurant[], category: string) => {
  if (category === "전체") {
    return restaurants;
  }
  return restaurants.filter(
    (restaurant: Restaurant) => restaurant.category === category,
  );
};

export default filterByCategory;
