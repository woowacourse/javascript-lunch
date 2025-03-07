import { DOM } from "../utils/dom.js";
import Modal from "./Modal.js";
import InputForm from "./InputForm.js";
import SelectForm from "./SelectForm.js";
import TextareaForm from "./TextareaForm.js";
import TextButton from "./TextButton.js";
import ButtonContainer from "./ButtonContainer.js";
import render from "../utils/render.js";
import { CATEGORY_ICON } from "../constants/constants.js";
import { renderRestaurantList } from "../main.js";
import state from "../state.js";
import { Validator } from "../utils/validator.js";

const AddLunchModalForm = {
  create() {
    const ModalFormElement = document.createElement("form");

    ModalFormElement.innerHTML = `<h2 class="modal-title text-title">새로운 음식점</h2>`;

    ModalFormElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const { category, description, distance, link, name } =
        Object.fromEntries(formData.entries());

      try {
        Validator.name(name);
        if (link !== "") Validator.link(link);
        if (description !== "") Validator.description(description);

        state.restaurantList.push({
          src: CATEGORY_ICON[category],
          name: name,
          distance,
          description,
          label: category,
        });

        renderRestaurantList();
        Modal.close();
      } catch (e) {
        alert(e.message);
      }
    });

    ModalFormElement.appendChild(
      SelectForm.create({
        id: "category",
        label: "카테고리",
        dropdownList: [
          {
            value: "",
            label: "선택해 주세요",
          },
          {
            value: "한식",
            label: "한식",
          },
          {
            value: "중식",
            label: "중식",
          },
          {
            value: "일식",
            label: "일식",
          },
          {
            value: "양식",
            label: "양식",
          },
          {
            value: "아시안",
            label: "아시안",
          },
          {
            value: "기타",
            label: "기타",
          },
        ],
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
        dropdownList: [
          {
            value: "",
            label: "선택해 주세요",
          },
          {
            value: "5",
            label: "5분 내",
          },
          {
            value: "10",
            label: "10분 내",
          },
          {
            value: "15",
            label: "15분 내",
          },
          {
            value: "20",
            label: "20분 내",
          },
          {
            value: "30",
            label: "30분 내",
          },
        ],
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

    ModalFormElement.appendChild(ButtonContainer.create());

    return ModalFormElement;
  },
};

export default AddLunchModalForm;
