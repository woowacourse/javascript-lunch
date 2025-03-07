import { DOM } from "./utils/dom.js";
import IconButton from "./component/IconButton.js";
import Modal from "./component/Modal.js";
import TextButton from "./component/TextButton.js";
import LunchInfoCard from "./component/LunchInfoCard.js";
import SelectForm from "./component/SelectForm.js";
import TextareaForm from "./component/TextareaForm.js";
import InputForm from "./component/InputForm.js";
import Header from "./component/Header.js";
import render from "./utils/render.js";
import state from "./state.js";
import AddLunchModalForm from "./component/AddLunchModalForm.js";

DOM.$body.prepend(Header.create());

renderRestaurantList();

DOM.$main.append(Modal.create());

export function renderRestaurantList() {
  DOM.$restaurantList.replaceChildren();
  state.restaurantList.forEach(
    ({ src, name, distance, description, label }) => {
      render(
        LunchInfoCard.create({ src, name, distance, description, label }),
        DOM.$restaurantList
      );
    }
  );
}
