import changeModalContents from "../../../changeModalContents";
import { FOOD_CATEGORY } from "../../../constants/foodCategory";
import storage from "../../../domain/storage";
import createRestaurantCards from "../../../service/createRestaurantCards";
import renderRestaurants from "../../../ui/renderRestaurant";
import createKeyValuePair from "../../../utils/createKeyValuePair";
import { $ } from "../../../utils/dom";
import Select from "../../common/Select";

const CategorySelector = (restaurantList) => {
  const events = {
    change: (e) => {
      storage.saveCategory(e.target.value);
      restaurantList.setCategory(e.target.value);
      renderRestaurants(
        createRestaurantCards(restaurantList.filter(), {
          clickCard: (restaurant) => {
            $("#restaurant-detail-modal-backdrop").classList.add("open");
            changeModalContents(restaurant, restaurantList);
          },
          clickFavorite: () => {
            storage.saveRestaurantList(
              restaurantList.list.map((restaurant) => restaurant.value)
            );
          },
        })
      );
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
