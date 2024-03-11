import RestaurantList from "../domain/RestaurantList";
import generateRestaurantItem from "./generateComponent/generateRestaurantItem";

const renderRestaurantItem = ({
  restaurantList,
  category,
  sortStandard,
}: {
  restaurantList: RestaurantList;
  category: Category;
  sortStandard: SortStandard;
}) => {
  const ul = document.getElementById("restaurant-list-ul");
  const restaurantItems = restaurantList
    .getOrderedRestaurant({
      category,
      sortStandard,
    })
    .map((restaurant) => {
      return generateRestaurantItem(restaurant);
    });

  ul!.replaceChildren(...restaurantItems);
};

export default renderRestaurantItem;
