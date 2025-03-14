import { DOM } from "./utils/dom.js";
import Modal from "./component/Modal.js";
import Header from "./component/Header.js";
import AddLunchModalForm from "./component/AddLunchModal/AddLunchModalForm.js";
import RestaurantList from "./component/RestaurantList.js";

DOM.$body.prepend(Header.create());
initRestaurantList();
initAddLunchModal();

function initRestaurantList() {
  DOM.$body.append(RestaurantList.create());
  RestaurantList.applyData();
}

function initAddLunchModal() {
  const addLunchModalContent = AddLunchModalForm.create();
  const addLunchModalElement = Modal.create("addLunch", addLunchModalContent);
  DOM.$main.append(addLunchModalElement);
}
