import { FOOD_CATEGORY } from "../../../constants/foodCategory";
import createRestaurantCards from "../../../service/createRestaurantCards";
import renderRestaurants from "../../../ui/renderRestaurant";
import createKeyValuePair from "../../../utils/createKeyValuePair";
import Select from "../../common/Select";

const CategorySelector = (restaurantList) => {
  const events = {
    change: (e) => {
      restaurantList.setCategory(e.target.value);
      renderRestaurants(createRestaurantCards(restaurantList.filter()));
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
