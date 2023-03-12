import Header from "@/component/main/Header";
import AddModal from "@/component/main/AddModal";
import PageTab from "./component/main/PageTab";
import SelectContainer from "./component/main/SelectContainer";
import AppController from "./AppController";
import RestaurantList from "./component/main/RestaurantList";
import { Restaurant } from "./type/type";
import ItemModal from "./component/common/ItemModal";

class App {
  constructor(body: HTMLElement) {
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
    PageTab.addEvent(this.toggleSelectContainer, this.rerenderList);
    SelectContainer.addEvent(this.rerenderList);
    RestaurantList.addEvent(this.openItemModal, this.rerenderList);
    AddModal.addEvent(this.rerenderList);
  }

  toggleSelectContainer = (page: string) => {
    if (page === "every") {
      SelectContainer.show();
      return;
    }

    SelectContainer.hide();
  };

  rerenderList = () => {
    const newRestaurants = AppController.getRestaurantList();
    RestaurantList.updateList(newRestaurants);
  };

  openItemModal = (id: string) => {
    const restaurant = <Restaurant>AppController.getRestaurant(id);
    const itemModal = new ItemModal(restaurant);
    itemModal.render();
    itemModal.addEvent(this.rerenderList);
  };
}

export default App;
