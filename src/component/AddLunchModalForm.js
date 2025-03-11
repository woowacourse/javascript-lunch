
import Modal from "./Modal.js";
import InputForm from "./InputForm.js";
import SelectForm from "./SelectForm.js";
import ButtonContainer from "./ButtonContainer.js";
import TextareaForm from "./TextareaForm.js";
import { Validator } from "../validator/Validator.js";
import TextButton from "./TextButton.js";
import toElement from "../utils/toElement.js";
import append from "../utils/append.js";
import MOCK_ITEM from "../mockItem.js";
import RestaurantList from "./RestaurantList.js";

const CATEGORY_ICON = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png",
};


function AddLunchModalForm(restaurantListId, modalId) {
  const $modalForm = toElement(`
    <form>
      <h2 class="modal-title text-title">새로운 음식점</h2>
    </form>
    `);

  $modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { category, description, distance, link, name } = Object.fromEntries(
      formData.entries()
    );

    try {
      Validator.name(name);
      Validator.link(link);
      Validator.description(description);
      RestaurantList.add(restaurantListId, {
        src: CATEGORY_ICON[category],
        name: name,
        distance: Number(distance),
        description,
        label: category,
      });

      MOCK_ITEM.restaurantList.push({
        src: CATEGORY_ICON[category],
        name: name,
        distance: Number(distance),
        description,
        label: category,
      });

      event.target.reset();
      Modal.close(modalId);
    } catch (e) {
      alert(e.message);
    }
  });

  append(
    $modalForm,
    SelectForm({
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
      required: true,
    })
  );

  append(
    $modalForm,
    InputForm({
      id: "name",
      label: "이름",
      required: true,
      bottomDescription: "",
    })
  );

  append(
    $modalForm,
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
    })
  );

  append(
    $modalForm,
    TextareaForm({
      id: "description",
      bottomDescription: "메뉴 등 추가 정보를 입력해 주세요.",
      rows: "5",
      label: "설명",
      required: false,
    })
  );

  append(
    $modalForm,
    InputForm({
      id: "link",
      label: "참고 링크",
      required: false,
      bottomDescription: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
    })
  );

  append(
    $modalForm,
    ButtonContainer([
      TextButton({
        id: "cancel__button",
        title: "취소하기",
        onClick: () => Modal.close(modalId),
      }),
      TextButton({
        id: "add__button",
        title: "추가하기",
      }),
    ])
  );
  
  return $modalForm;
}

export default AddLunchModalForm;
