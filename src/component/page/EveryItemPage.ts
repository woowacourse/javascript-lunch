import AddModal from "@/component/main/AddModal";
import RestaurantList from "@/component/main/RestaurantList";
import SelectContainer from "@/component/main/SelectContainer";
import AppController from "@/AppController";
import Page from "./Page";
import { Constants } from "@/constant/Restaurant";

class EveryItemPage extends Page {
  constructor(body: Element) {
    super(body, Constants.EVERY_PAGE);
  }

  renderComponents(body: Element) {
    SelectContainer.render(body);
    super.renderComponents(body);
  }

  addEvents() {
    super.addEvents();
    SelectContainer.addEvent(AppController.setSelectedValue, this.rerenderList);
  }
}

export default EveryItemPage;
