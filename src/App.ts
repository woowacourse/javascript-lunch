import Header from "@/component/disposable/Header";
import AddModal from "@/component/disposable/AddModal";
import RestaurantList from "@/component/disposable/RestaurantList";
import SelectContainer from "@/component/disposable/SelectContainer";
import RestaurantItem from "@/component/reusable/RestaurantItem";
import { Constants, OptionValue } from "@/constant/Constants";
import restaurantListHandler from "@/domain/restaurantListHandler";
import { Category, Restaurant, Sort } from "@/type/type";

class App {
  category: Category;
  sort: Sort;
  restaurantList: Restaurant[];

  constructor(body: Element) {
    this.category = OptionValue.TOTAL as Category;
    this.sort = OptionValue.NAME_ORDER as Sort;
    this.restaurantList = restaurantListHandler.getRestaurants(
      this.category,
      this.sort
    );

    this.renderComponents(body);
    this.addEvents();
    this.rerenderList();
  }

  renderComponents(body: Element) {
    Header.render(body);
    SelectContainer.render(body);
    RestaurantList.render(body);
    AddModal.render(body);
  }

  addEvents() {
    Header.addEvent();
    SelectContainer.addEvent(this.setSelectedValue);
    AddModal.addEvent(this.addNewRestaurant);
  }

  setSelectedValue = (sortId: string, selectedValue: Category | Sort) => {
    if (sortId === Constants.CATEGORY_FILTER) {
      this.category = selectedValue as Category;
    }

    if (sortId === Constants.SORTING_FILTER) {
      this.sort = selectedValue as Sort;
    }

    this.setRestaurantList();
    this.rerenderList();
  };

  setRestaurantList() {
    this.restaurantList = restaurantListHandler.getRestaurants(
      this.category,
      this.sort
    );
  }

  addNewRestaurant = (restaurant: Restaurant): void => {
    restaurantListHandler.addRestaurant(restaurant);
    this.setRestaurantList();
    this.rerenderList();
  };

  rerenderList() {
    RestaurantList.updateList(
      this.restaurantList
        .map((restaurant: Restaurant) =>
          new RestaurantItem(restaurant).template()
        )
        .join("")
    );
  }
}

export default App;
