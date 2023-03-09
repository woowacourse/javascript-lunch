import AddModal from "@/component/main/AddModal";
import RestaurantList from "@/component/main/RestaurantList";
import SelectContainer from "@/component/main/SelectContainer";
import AppController from "@/AppController";
import PageChoice from "@/component/main/PageChoice";
import Page from "../common/Page";
import { Constants } from "@/constant/Restaurant";

class EveryItemPage extends Page {
  constructor(body: Element) {
    super(body, Constants.EVERY_PAGE);
  }

  renderComponents(body: Element) {
    PageChoice.render(body);
    SelectContainer.render(body);
    RestaurantList.render(body);
    AddModal.render(body);
  }

  addEvents() {
    super.addEvents();
    SelectContainer.addEvent(AppController.setSelectedValue, this.rerenderList);
  }
}

export default EveryItemPage;
