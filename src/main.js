import { DOM } from "./utils/dom.js";
import IconButton from "./component/IconButton.js";
import AddLunchModal from "./component/AddLunchModal.js";
import TextButton from "./component/TextButton.js";
import LunchInfoCard from "./component/LunchInfoCard.js";
import SelectForm from "./component/SelectForm.js";
import TextareaForm from "./component/TextareaForm.js";
import InputForm from "./component/InputForm.js";
import Header from "./component/Header.js";
import render from "./utils/render.js";
import state from "./state.js";
import ModalForm from "./component/ModalForm.js";

DOM.$body.prepend(Header.create());

renderRestaurantList();

render(ModalForm.create(), DOM.$modalContainer);

function renderRestaurantList() {
  state.restaurantList.forEach(
    ({ src, name, distance, description, label }) => {
      render(
        LunchInfoCard.create({ src, name, distance, description, label }),
        DOM.$restaurantList
      );
    }
  );
}
