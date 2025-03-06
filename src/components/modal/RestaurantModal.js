import createElement from "../../util/createElement.js";
import Select from "../util/Select.js";
import RestaurantModalItem from "./RestaurantModalItem.js";
import Input from "../util/Input.js";
import TextArea from "../util/TextArea.js";
import RestaurantModalButtonContainer from "./RestaurantModalButtonContainer.js";

export default function RestaurantModal() {
  const $fragment = document.createDocumentFragment();
  const $h2 = createElement({
    tag: "h2",
    classNames: ["modal-title", "text-title"],
  });
  const $form = createElement({
    tag: "form",
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
          options: ["선택해 주세요", "한식", "중식"],
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
          options: ["선택해 주세요", "5분 내", "10분 내"],
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
    })
  );

  $form.appendChild(RestaurantModalButtonContainer());

  return $fragment;
}
