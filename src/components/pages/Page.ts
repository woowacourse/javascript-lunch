import restaurantListHandler from "../../domain/restaurantListHandler";
import { Constants, OptionValue } from "../../utils/Constants";
import RestaurantItemBottomSheet from "../RestaurantItemBottomSheet";
import RestaurantList from "../RestaurantList";
import SelectContainer from "../SelectContainer";
import { Restaurant } from "./../../types/type";

class Page {
  restaurantList: Restaurant[];

  constructor(target: Element, restaurantList: Restaurant[], pageName: string) {
    this.restaurantList = restaurantList;

    if (pageName === "total")
      SelectContainer.initialize(target, this.setSortListFilterById);

    RestaurantList.initialize(
      target,
      this.restaurantList,
      this.createItemBottomSheet
    );
  }

  setSortListFilterById = (id: string, value: string) => {
    if (id === Constants.CATEGORY_FILTER) {
      this.restaurantList =
        value === ""
          ? restaurantListHandler.getRestaurants()
          : restaurantListHandler.getFilteredByCategory(value);
    }

    if (id === Constants.SORTING_FILTER) {
      this.restaurantList =
        value === OptionValue.TAKING_TIME_ORDER
          ? restaurantListHandler.getSortedByTakingTime(this.restaurantList)
          : restaurantListHandler.getSortedByName(this.restaurantList);
    }

    RestaurantList.updateRestaurantList(this.restaurantList);
  };

  createItemBottomSheet = (id: string) => {
    this.restaurantList = restaurantListHandler.getRestaurants();

    const restaurant = <Restaurant>(
      restaurantListHandler.getSelectedItem(id, this.restaurantList)
    );
    const itemSheet = new RestaurantItemBottomSheet(
      restaurant,
      this.deleteRestaurantItem
    );
    itemSheet.initialize();
  };

  deleteRestaurantItem = (id: string) => {
    this.restaurantList = restaurantListHandler.setDeleteItem(
      id,
      this.restaurantList
    );

    RestaurantList.updateRestaurantList(this.restaurantList);
  };
}

export default Page;
