import Modal from "./component/Modal.js";
import Header from "./component/Header.js";
import AddLunchModalForm from "./component/AddLunchModalForm.js";
import IconButton from "./component/IconButton.js";
import { $ } from "./utils/querySelectors.js";
import Select from "./component/Select.js";
import { CATEGORY_DROPDOWN } from "./constants/constants.js";
import RestaurantList from "./domain/RestaurantList.js";
import Tab from "./component/Tab.js";
import RestaurantContainer from "./component/RestaurantContainer.js";

const restaurantList = new RestaurantList();

Tab(restaurantList);

$("body").prepend(
  Header(
    IconButton({
      src: "./add-button.png",
      onClick: () => Modal.open("addLunchModal"),
      label: "음식점 추가",
    })
  )
);

$("section").append(
  Select(
    {
      name: "category",
      id: "category-filter",
      className: "restaurant-filter",
      dropdownList: CATEGORY_DROPDOWN,
    },
    restaurantList
  ),
  Select(
    {
      name: "sorting",
      id: "sorting-filter",
      className: "restaurant-filter",
      dropdownList: [
        {
          value: "name",
          label: "이름순",
        },
        {
          value: "distance",
          label: "거리순",
        },
      ],
    },
    restaurantList
  )
);

RestaurantContainer(restaurantList);

$("main").append(
  new Modal("addLunchModal", AddLunchModalForm(restaurantList, "addLunchModal"))
);
