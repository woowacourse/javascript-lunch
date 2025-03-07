import createElement from "../../util/createElement.js";
import Select from "../util/Select.js";
import RestaurantModalItem from "./RestaurantModalItem.js";
import Input from "../util/Input.js";
import TextArea from "../util/TextArea.js";
import RestaurantModalButtonContainer from "./RestaurantModalButtonContainer.js";
import restaurantDataList from "../../domain/RestaurantDataList.js";
import reset from "../../util/reset.js";
import { init } from "../../main.js";

export default function RestaurantModal() {
  const $fragment = document.createDocumentFragment();
  const $h2 = createElement({
    tag: "h2",
    classNames: ["modal-title", "text-title"],
  });
  const $form = createElement({
    tag: "form",
    classNames: ["form"],
  });

  $form.addEventListener("submit", function handleClickAdd(event) {
    try {
      event.preventDefault();
      const $form = document.querySelector(".form");
      const data = Object.fromEntries(new FormData($form));
      restaurantDataList.addData(data);
      reset();
      init();
    } catch (e) {
      alert(e.message);
    }
  });

  $h2.textContent = "새로운 음식점";

  $fragment.appendChild($h2);
  $fragment.appendChild($form);
  $form.appendChild(
    RestaurantModalItem({
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
    RestaurantModalItem({
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
    RestaurantModalItem({
      isRequired: true,
      name: "distance",
      text: "거리(도보 이동 시간)",
      renderChild: () =>
        Select({
          name: "distance",
          id: "distance",
          options: ["5분 내", "10분 내", "15분 내", "20분 내", "30분 내"],
          isRequired: true,
        }),
    })
  );
  $form.appendChild(
    RestaurantModalItem({
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
    RestaurantModalItem({
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

  $form.appendChild(RestaurantModalButtonContainer());

  return $fragment;
}
