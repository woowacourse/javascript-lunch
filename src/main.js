import Modal from "./component/Modal.js";
import LunchInfoCard from "./component/LunchInfoCard.js";
import Header from "./component/Header.js";
import AddLunchModalForm from "./component/AddLunchModalForm.js";
import IconButton from "./component/IconButton.js";
import append from "./utils/append.js";
import RestaurantList from "./component/RestaurantList.js";
import MOCK_ITEM from "./mockItem.js";

import { $ } from "./utils/querySelectors.js";

$("body").prepend(
  Header(
    IconButton({
      src: "./add-button.png",
      onClick: () => Modal.open("addLunchModal"),
      label: "음식점 추가",
    })
  )
);

const restaurantList = new RestaurantList(MOCK_ITEM.restaurantList);
restaurantList.$restaurantList;
$("main").append(
  new Modal("addLunchModal", AddLunchModalForm(restaurantList, "addLunchModal"))
);
