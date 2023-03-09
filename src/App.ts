import Header from "@/component/main/Header";
import AddModal from "@/component/main/AddModal";
import { Constants } from "./constant/Restaurant";
import PageTab from "./component/main/PageTab";
import SelectContainer from "./component/main/SelectContainer";
import AppController from "./AppController";
import RestaurantList from "./component/main/RestaurantList";
import { PageTabOption, Restaurant } from "./type/type";
import ItemModal from "./component/common/ItemModal";

class App {
  pageState: string;

  constructor(body: HTMLElement) {
    this.pageState = "every";
    this.renderComponents(body);
    this.addEvents();
    this.rerenderList();
  }

  renderComponents(target: HTMLElement) {
    Header.render(target);
    PageTab.render(target);
    SelectContainer.render(target);
    RestaurantList.render(target);
    AddModal.render(target);
  }

  addEvents() {
    Header.addEvent(AddModal.openModal);
    PageTab.addEvent(this.setPageState, this.rerenderList);
    SelectContainer.addEvent(AppController.setSelectedValue, this.rerenderList);
    RestaurantList.addEvent(
      this.openItemModal,
      AppController.toggleBookmark,
      this.rerenderList
    );
    AddModal.addEvent(AppController.addNewRestaurant, this.rerenderList);
  }

  setPageState = (page: PageTabOption) => {
    this.pageState = page;

    if (page === Constants.EVERY_PAGE) {
      SelectContainer.show();
      return;
    }

    SelectContainer.hide();
  };

  rerenderList = () => {
    const newRestaurants = AppController.getRestaurantList(this.pageState);
    RestaurantList.updateList(newRestaurants);
  };

  openItemModal = (id: string) => {
    const restaurant = <Restaurant>AppController.getRestaurant(id);
    const itemModal = new ItemModal(restaurant);
    itemModal.render();
    itemModal.addEvent(
      AppController.deleteRestaurant,
      AppController.toggleBookmark,
      this.rerenderList
    );
  };
}

export default App;
