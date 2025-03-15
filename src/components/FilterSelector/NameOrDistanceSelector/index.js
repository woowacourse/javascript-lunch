import changeModalContents from "../../../changeModalContents";
import storage from "../../../domain/storage";
import createRestaurantCards from "../../../service/createRestaurantCards";
import renderRestaurants from "../../../ui/renderRestaurant";
import createKeyValuePair from "../../../utils/createKeyValuePair";
import { $ } from "../../../utils/dom";
import Select from "../../common/Select";

const NameOrDistanceSelector = (restaurantList) => {
  const events = {
    change: (e) => {
      storage.saveNameOrDistance(e.target.value);
      restaurantList.setNameOrDistance(e.target.value);
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
    name: "sorting",
    required: false,
    options: createKeyValuePair(["name", "distance"], ["이름순", "거리순"]),
    defaultOptionText: "전체",
    events,
  });
};

export default NameOrDistanceSelector;
