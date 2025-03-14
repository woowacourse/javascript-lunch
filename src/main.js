import { DOM } from "./utils/dom.js";
import Modal from "./component/Modal.js";
import Header from "./component/Header.js";
import AddLunchModalForm from "./component/AddLunchModal/AddLunchModalForm.js";
import RestaurantList from "./component/RestaurantList.js";
import FilterSelect from "./component/FilterSelect.js";
import {
  CATEGORY_FILTER_DROPDOWN_LIST,
  SORT_FILTER_DROPDOWN_LIST,
} from "./constants/dropdownList.js";
import { $ } from "./utils/querySelectors.js";

DOM.$body.prepend(Header.create());
initFilterSelect();
initRestaurantList();
initAddLunchModal();

function initFilterSelect() {
  const categoryFilter = FilterSelect.create({
    id: "category-filter",
    name: "category",
    dropdownList: CATEGORY_FILTER_DROPDOWN_LIST,
  });

  const sortingFilter = FilterSelect.create({
    id: "sorting-filter",
    name: "sorting",
    dropdownList: SORT_FILTER_DROPDOWN_LIST,
  });

  $(".restaurant-filter-container").append(categoryFilter);
  $(".restaurant-filter-container").append(sortingFilter);
}

function initRestaurantList() {
  DOM.$body.append(RestaurantList.create());
  RestaurantList.applyData();
}

function initAddLunchModal() {
  const addLunchModalContent = AddLunchModalForm.create();
  const addLunchModalElement = Modal.create("addLunch", addLunchModalContent);
  DOM.$main.append(addLunchModalElement);
}
