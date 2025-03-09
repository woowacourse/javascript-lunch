import { DOM } from "./utils/dom.js";
import Modal from "./component/Modal.js";
import LunchInfoCard from "./component/LunchInfoCard.js";
import Header from "./component/Header.js";
import AddLunchModalForm from "./component/AddLunchModalForm.js";
import IconButton from "./component/IconButton.js";
import append from "./utils/append.js";
import RestaurantList from "./component/RestaurantList.js";
import state from "./state.js";

DOM.$body.prepend(
  Header(
    IconButton({
      src: "./add-button.png",
      onClick: () => Modal.open(),
      label: "음식점 추가",
    })
  )
);

const restaurantList = new RestaurantList(state.restaurantList);
restaurantList.$restaurantList;

DOM.$main.append(Modal.create(AddLunchModalForm.create(restaurantList)));
