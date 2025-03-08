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

addEventListener("keydown", (e) => {
  if (e.key === "Escape") Modal.close();
});

DOM.$body.prepend(Header.create());

renderRestaurantList();

DOM.$main.append(Modal.create(AddLunchModalForm.create()));

export function renderRestaurantList() {
  const restaurantElementList = state.restaurantList.map(
    ({ src, name, distance, description, label }) =>
      LunchInfoCard.create({ src, name, distance, description, label })
  );

  restaurantElementList.forEach((restaurantElement) =>
    render(restaurantElement, DOM.$restaurantList)
  );
}
