import RestaurantList from "../domain/RestaurantList";
import generateRestaurantItem from "./generateComponent/generateRestaurantItem";

const renderRestaurantItem = ({
  category,
  sortStandard,
}: {
  category: Category;
  sortStandard: SortStandard;
}) => {
  const ul = document.getElementById("restaurant-list-ul");
  const restaurantItems = RestaurantList.getOrderedRestaurant({
    category,
    sortStandard,
  }).map((restaurant) => {
    return generateRestaurantItem(restaurant);
  });

  ul!.replaceChildren(...restaurantItems);
};

export default renderRestaurantItem;
