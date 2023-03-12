import ItemModal from "@/component/common/ItemModal";
import AddModal from "@/component/main/AddModal";
import Header from "@/component/main/Header";
import PageTab from "@/component/main/PageTab";
import RestaurantList from "@/component/main/RestaurantList";
import SelectContainer from "@/component/main/SelectContainer";
import { Constants } from "@/constant/Restaurant";
import { PageTabOption, Restaurant } from "@/type/type";

class Render {
  init(target: Element) {
    Header.render(target);
    PageTab.render(target);
    SelectContainer.render(target);
    RestaurantList.render(target);
    AddModal.render(target);
  }

  addEvents() {
    Header.addEvent();
    PageTab.addEvent();
    SelectContainer.addEvent();
    RestaurantList.addEvent();
    AddModal.addEvent();
  }

  updateRestaurantList(newRestaurants: Restaurant[]) {
    RestaurantList.updateList(newRestaurants);
  }

  toggleSelectContainer(page: PageTabOption) {
    if (page === Constants.EVERY_PAGE) {
      SelectContainer.show();
      return;
    }

    SelectContainer.hide();
  }

  openItemModal(restaurant: Restaurant) {
    const itemModal = new ItemModal(restaurant);
    itemModal.render();
    itemModal.addEvent();
  }

  openAddModal() {
    AddModal.open();
  }
}

export default new Render();
