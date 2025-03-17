import Modal from "../Modal.js";
import InputForm from "../InputForm.js";
import SelectForm from "../SelectForm.js";
import TextareaForm from "../TextareaForm.js";
import AddLunchButtonContainer from "./AddLunchButtonContainer.js";
import {
  CATEGORY_DROPDOWN_LIST,
  DISTANCE_DROPDOWN_LIST,
} from "../../constants/dropdownList.ts";
import { Validator } from "../../utils/Validator.ts";
import RestaurantListUtils from "../../utils/RestaurantListUtils.ts";
import FilterSelect from "../FilterSelect.js";
import LocalStorage from "../../utils/localStorage.ts";
import { RESTAURANT_LIST_KEY } from "../../constants/constants.ts";

const AddLunchModalForm = {
  create() {
    const ModalFormElement = document.createElement("form");

    ModalFormElement.innerHTML = `<h2 class="modal-title text-title">새로운 음식점</h2>`;

    ModalFormElement.addEventListener("submit", (event) =>
      this.handleSubmit(event)
    );

    ModalFormElement.appendChild(
      SelectForm.create({
        id: "category",
        label: "카테고리",
        dropdownList: CATEGORY_DROPDOWN_LIST,
        isRequired: true,
      })
    );

    ModalFormElement.appendChild(
      InputForm.create({
        id: "name",
        label: "이름",
        isRequired: true,
        bottomDescription: "",
      })
    );

    ModalFormElement.appendChild(
      SelectForm.create({
        id: "distance",
        label: "거리(도보 이동 시간)",
        dropdownList: DISTANCE_DROPDOWN_LIST,
        isRequired: true,
      })
    );

    ModalFormElement.appendChild(
      TextareaForm.create({
        id: "description",
        bottomDescription: "메뉴 등 추가 정보를 입력해 주세요.",
        rows: "5",
        label: "설명",
        isRequired: false,
      })
    );

    ModalFormElement.appendChild(
      InputForm.create({
        id: "link",
        label: "참고 링크",
        isRequired: false,
        bottomDescription: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
      })
    );

    ModalFormElement.appendChild(AddLunchButtonContainer.create());

    return ModalFormElement;
  },

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { category, description, distance, link, name } = Object.fromEntries(
      formData.entries()
    );

    try {
      this.validateFormInputs({ name, link, description });
      this.addRestaurant({ category, name, distance, description, link });
      FilterSelect.applyFilter("allRestaurant");
      Modal.close("addLunch");
      Modal.reset("addLunch");
    } catch (e) {
      alert(e.message);
    }
  },

  validateFormInputs({ name, link, description }) {
    Validator.name(name);
    if (link !== "") Validator.link(link);
    if (description !== "") Validator.description(description);
  },

  addRestaurant({ category, name, distance, description, link }) {
    const dataList = LocalStorage.getJSON(RESTAURANT_LIST_KEY);
    const addList = RestaurantListUtils.add(dataList, {
      id: dataList[dataList.length - 1].id + 1,
      label: category,
      name,
      distance,
      description,
      link,
    });
    LocalStorage.setJSON(RESTAURANT_LIST_KEY, addList);
  },
};

export default AddLunchModalForm;
