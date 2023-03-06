import Header from "@/component/disposable/Header";
import Modal from "@/component/disposable/Modal";
import RestaurantList from "@/component/disposable/RestaurantList";
import SelectContainer from "@/component/disposable/SelectContainer";
import RestaurantItem from "@/component/reusable/RestaurantItem";
import { Constants, OptionValue } from "@/constant/Constants";
import restaurantListHandler from "@/domain/restaurantListHandler";
import { Category, Restaurant, Sort } from "@/type/type";

class App {
  restaurantList: Restaurant[];
  category: Category;
  sort: Sort;

  constructor(body: Element) {
    this.restaurantList = restaurantListHandler.getSortedByName();
    this.category = OptionValue.TOTAL as Category;
    this.sort = OptionValue.NAME_ORDER as Sort;

    this.renderComponents(body);
    this.addEvents();
    this.rerenderList();
  }

  renderComponents(body: Element) {
    Header.render(body);
    SelectContainer.render(body);
    RestaurantList.render(body);
    Modal.render(body);
  }

  addEvents() {
    Header.addEvent();
    SelectContainer.addEvent(this.setSelectedValue);
    Modal.addEvent(this.addNewRestaurant);
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
    RestaurantList.replaceTemplate(
      this.restaurantList
        .map((restaurant: Restaurant) =>
          new RestaurantItem(restaurant).template()
        )
        .join("")
    );
  }
}

export default App;
