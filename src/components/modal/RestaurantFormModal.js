import createElement from "../../util/createElement.js";
import Select from "../util/Select.js";
import Input from "../util/Input.js";
import TextArea from "../util/TextArea.js";
import RestaurantFormModalItem from "./RestaurantFormModalItem.js";
import RestaurantFormModalButtonContainer from "./RestaurantFormModalButtonContainer.js";
import restaurantDataList from "../../domain/RestaurantDataList.ts";
import Restaurant from "../restaurant/Restaurant.js";
import closeModal from "./util/closeModal.js";

export default function RestaurantFormModal() {
  function submitRestaurantForm(event) {
    try {
      event.preventDefault();
      const $form = document.querySelector(".form");
      const data = Object.fromEntries(new FormData($form));
      restaurantDataList.addData(data);
      closeModal();
      Restaurant({ isReRender: true });
    } catch (e) {
      alert(e.message);
    }
  }

  const $fragment = document.createDocumentFragment();
  const $h2 = createElement({
    tag: "h2",
    classNames: ["modal-title", "text-title"],
  });
  const $form = createElement({
    tag: "form",
    classNames: ["form"],
  });

  $form.addEventListener("submit", submitRestaurantForm);

  $h2.textContent = "새로운 음식점";

  $fragment.appendChild($h2);
  $fragment.appendChild($form);
  $form.appendChild(
    RestaurantFormModalItem({
      isRequired: true,
      name: "category",
      text: "카테고리",
      renderChild: () =>
        Select({
          name: "category",
          id: "category",
          options: ["한식", "중식", "일식", "양식", "아시안", "기타"],
          isRequired: true,
        }),
    })
  );
  $form.appendChild(
    RestaurantFormModalItem({
      isRequired: true,
      name: "name",
      text: "이름",
      renderChild: () =>
        Input({
          type: "text",
          name: "name",
          id: "name",
          isRequired: true,
        }),
    })
  );
  $form.appendChild(
    RestaurantFormModalItem({
      isRequired: true,
      name: "distance",
      text: "거리(도보 이동 시간)",
      renderChild: () =>
        Select({
          name: "distance",
          id: "distance",
          options: [5, 10, 15, 20, 30],
          isRequired: true,
        }),
    })
  );
  $form.appendChild(
    RestaurantFormModalItem({
      isRequired: false,
      name: "description",
      text: "설명",
      renderChild: () =>
        TextArea({
          name: "description",
          id: "description",
          cols: "30",
          rows: "5",
        }),
      helpText: "메뉴 등 추가 정보를 입력해 주세요.",
    })
  );

  $form.appendChild(
    RestaurantFormModalItem({
      isRequired: false,
      name: "link",
      text: "참고 링크",
      renderChild: () =>
        Input({
          type: "text",
          name: "link",
          id: "link",
          isRequired: false,
        }),
      helpText: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
    })
  );

  $form.appendChild(RestaurantFormModalButtonContainer());

  return $fragment;
}
