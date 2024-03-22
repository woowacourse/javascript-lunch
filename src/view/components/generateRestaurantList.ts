import RestaurantList from "../../domain/RestaurantList";
import createElementByTag from "../utils/createElementByTag";
import generateRestaurantItem from "./generateRestaurantItem";

const generateRestaurantList = ({
  restaurantList,
  category,
  sortStandard,
}: {
  restaurantList: RestaurantList;
  category: Category;
  sortStandard: SortStandard;
}) => {
  const ul = createElementByTag({
    tag: "ul",
    classes: ["restaurant-list"],
  });
  const restaurantItems = restaurantList
    .getOrderedRestaurant({
      category,
      sortStandard,
    })
    .map((restaurant) => {
      return generateRestaurantItem(restaurant);
    });

  ul.append(...restaurantItems);

  return ul;
};

export default generateRestaurantList;
