import { DOM } from "./utils/dom.js";
import Modal from "./component/Modal.js";
import LunchInfoCard from "./component/LunchInfoCard.js";
import Header from "./component/Header.js";
import render from "./utils/render.js";
import state from "./state.js";
import AddLunchModalForm from "./component/AddLunchModalForm.js";
import IconButton from "./component/IconButton.js";

addEventListener("keydown", (e) => {
  if (e.key === "Escape") Modal.close();
});

DOM.$body.prepend(
  Header(
    IconButton({
      src: "./add-button.png",
      onClick: () => Modal.open(),
      label: "음식점 추가",
    })
  )
);

renderRestaurantList();

DOM.$main.append(Modal.create(AddLunchModalForm.create()));

export function renderRestaurantList() {
  DOM.$restaurantList.replaceChildren();
  state.restaurantList.forEach(
    ({ src, name, distance, description, label }) => {
      render(
        LunchInfoCard({ src, name, distance, description, label }),
        DOM.$restaurantList
      );
    }
  );
}
