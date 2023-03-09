import Modal from "../common/Modal";
import { $ } from "../../util/querySelector";
import SelectInput from "../common/SelectInput";
import { getFoodCategoryMemberList } from "../../type/FoodCategory";
import { getEstimatedTimeMemberList } from "../../type/EstimatedTime";

const createInputForm = () => {
  const addRestaurantFormTemplate = $("#new-restaurant-form-template");
  const addRestaurantForm = document.importNode(addRestaurantFormTemplate.content, true);

  addRestaurantForm.querySelector(".category-input").innerHTML = SelectInput.create(
    "category",
    "카테고리",
    ["", ...getFoodCategoryMemberList()],
    ["선택해 주세요", ...getFoodCategoryMemberList()],
  ).innerHTML;

  addRestaurantForm.querySelector(".distance-input").innerHTML = SelectInput.create(
    "distance",
    "거리(걸리는 시간)",
    ["", ...getEstimatedTimeMemberList()],
    ["선택해 주세요", ...getEstimatedTimeMemberList()],
  ).innerHTML;

  addRestaurantForm.querySelector("form").setAttribute("id", "restaurant-input-form");

  return addRestaurantForm;
};

const RetaurantInputModal = {
  create() {
    const restaurantInputModal = Modal.create("new-restaurant-input");

    const addRestaurantForm = createInputForm();
    Modal.setChildElement(restaurantInputModal, addRestaurantForm);

    return restaurantInputModal;
  },
};

export default RetaurantInputModal;
