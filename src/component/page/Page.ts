import AppController from "@/AppController";
import { Restaurant } from "@/type/type";
import AddModal from "../main/AddModal";
import RestaurantList from "../main/RestaurantList";
import ItemModal from "../common/ItemModal";

class Page {
  page: string;

  constructor(body: Element, page: string) {
    this.page = page;
    this.renderComponents(body);
    this.addEvents();
    this.rerenderList();
  }

  renderComponents(body: Element) {
    RestaurantList.render(body);
    AddModal.render(body);
  }

  addEvents() {
    RestaurantList.addEvent(
      this.openItemModal,
      AppController.toggleBookmark,
      this.rerenderList
    );
    AddModal.addEvent(AppController.addNewRestaurant, this.rerenderList);
  }

  rerenderList = () => {
    const newRestaurants = AppController.getRestaurantList(this.page);
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

export default Page;
