import { FOOD_CATEGORY } from "../../../constants/foodCategory";
import renderRestaurants from "../../../ui/renderRestaurant";
import createKeyValuePair from "../../../utils/createKeyValuePair";
import Select from "../../common/Select";

const CategorySelector = (restaurantList) => {
  const events = {
    change: (e) => {
      if (e.target.value === "") {
        renderRestaurants(...restaurantList.list);
        return;
      }

      const filteredRestaurantList = restaurantList.filterByCategory(
        e.target.value
      );
      renderRestaurants(...filteredRestaurantList);
    },
  };

  return Select({
    name: "category",
    required: false,
    options: createKeyValuePair(
      Object.keys(FOOD_CATEGORY),
      Object.keys(FOOD_CATEGORY)
    ),
    defaultOptionText: "전체",
    events,
  });
};

export default CategorySelector;
