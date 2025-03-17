import Modal from "./Modal.js";
import InputForm from "./InputForm.js";
import SelectForm from "./SelectForm.js";
import ButtonContainer from "./ButtonContainer.js";
import TextareaForm from "./TextareaForm.js";
import { Validator } from "../domain/Validator.ts";
import TextButton from "./TextButton.js";
import toElement from "../utils/toElement.js";
import append from "../utils/append.js";
import { CATEGORY_DROPDOWN } from "../constants/constants.js";

export function requiredClassName(required) {
  if (required) "form-item--required";
}

function AddLunchModalForm(restaurantList, modalId) {
  const $el = toElement(`
    <form>
      <h2 class="modal-title text-title">새로운 음식점</h2>
    </form>
    `);

  $el.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { category, description, distance, link, name } = Object.fromEntries(
      formData.entries()
    );

    try {
      Validator.name(name);
      Validator.link(link);
      Validator.description(description);

      restaurantList.add({
        category: category,
        name: name,
        distance: Number(distance),
        description,
        link: link,
        favorite: false,
      });

      event.target.reset();
      Modal.close(modalId);
    } catch (e) {
      alert(e.message);
    }
  });

  append(
    $el,
    SelectForm({
      id: "category",
      label: "카테고리",
      dropdownList: CATEGORY_DROPDOWN,
      required: true,
    }),

    InputForm({
      id: "name",
      label: "이름",
      required: true,
      bottomDescription: "",
    }),

    SelectForm({
      id: "distance",
      label: "거리(도보 이동 시간)",
      dropdownList: [
        {
          value: "",
          label: "선택해 주세요",
        },
        {
          value: 5,
          label: "5분 내",
        },
        {
          value: 10,
          label: "10분 내",
        },
        {
          value: 15,
          label: "15분 내",
        },
        {
          value: 20,
          label: "20분 내",
        },
        {
          value: 30,
          label: "30분 내",
        },
      ],
      required: true,
    }),

    TextareaForm({
      id: "description",
      bottomDescription: "메뉴 등 추가 정보를 입력해 주세요.",
      rows: "5",
      label: "설명",
      required: false,
    }),

    InputForm({
      id: "link",
      label: "참고 링크",
      required: false,
      bottomDescription: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
    }),

    ButtonContainer(
      TextButton({
        id: "cancel__button",
        title: "취소하기",
        onClick: () => Modal.close(modalId),
      }),
      TextButton({
        id: "add__button",
        title: "추가하기",
      })
    )
  );

  return $el;
}

export default AddLunchModalForm;
