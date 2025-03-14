import restaurantDataList from "../../../domain/RestaurantDataList";
import createElement from "../../../util/createElement";
import { $ } from "../../../util/querySelector";
import { removeModal } from "../Modal";

export default function RestaurantDetailModal(restaurantData) {
  const $section = createElement({
    tag: "section",
    classNames: ["restaurantDetail__modal"],
  });

  const $detailInfo = createDetailInfo({ ...restaurantData });
  const $buttons = createButtons(restaurantData.id);

  $section.appendChild($detailInfo);
  $section.appendChild($buttons);

  return $section;
}

function createDetailInfo({
  id,
  src,
  alt,
  distance,
  description,
  link,
  name,
  isFavorite,
}) {
  const $infoDiv = createElement({
    tag: "div",
    classNames: ["restaurantDetail__info"],
  });

  const $categoryDiv = createElement({
    tag: "div",
    classNames: ["restaurant__category"],
  });
  const $categoryImg = createElement({
    tag: "img",
    src: src,
    alt: alt,
    classNames: ["category-icon"],
  });
  $categoryDiv.appendChild($categoryImg);

  const $name = createElement({
    tag: "h3",
    classNames: ["restaurant__name", "text-subtitle", "marginTopBottom-15"],
    textContent: name,
  });

  const $distanceSpan = createElement({
    tag: "span",
    classNames: ["restaurant__distance", "text-body"],
    textContent: `캠퍼스부터 ${distance}분 내`,
  });

  const $startDiv = createElement({
    tag: "div",
    classNames: ["restaurantDetail__start"],
  });
  const favoriteImgAttributes = isFavorite
    ? {
        tag: "img",
        name: "favorite__star",
        classNames: ["favorite__star"],
        src: "/public/fill-star.png",
        alt: "좋아요한 별",
      }
    : {
        tag: "img",
        name: "favorite__star",
        classNames: ["favorite__star"],
        src: "/public/empty-star.png",
        alt: "좋아요안한 별",
      };
  const $favoriteImg = createElement(favoriteImgAttributes);
  $startDiv.appendChild($favoriteImg);

  const $descriptionP = createElement({
    tag: "p",
    classNames: [
      "restaurantDetail__description",
      "text-body",
      "marginTopBottom-15",
    ],
    textContent: description,
  });

  const $linkP = createElement({
    tag: "p",
    classNames: ["restaurantDetail__link", "text-body"],
    textContent: link,
  });

  $infoDiv.appendChild($categoryDiv);
  $infoDiv.appendChild($name);
  $infoDiv.appendChild($distanceSpan);
  $infoDiv.appendChild($startDiv);
  $infoDiv.appendChild($descriptionP);
  $infoDiv.appendChild($linkP);

  return $infoDiv;
}

function createButtons(id) {
  const $buttonWrap = createElement({
    tag: "div",
    classNames: ["restaurantDetail__buttonWrap"],
  });
  const $deleteButton = createElement({
    tag: "button",
    classNames: ["restaurantDetail__button", "restaurantDetail_delete"],
    textContent: "삭제하기",
  });
  const $closeButton = createElement({
    tag: "button",
    classNames: ["restaurantDetail__button", "restaurantDetail_close"],
    textContent: "닫기",
  });
  $buttonWrap.appendChild($deleteButton);
  $buttonWrap.appendChild($closeButton);

  $deleteButton.addEventListener("click", () => {
    // 모달창 닫고
    removeModal();

    // 아이템 제거하고 리렌더링 하기
    restaurantDataList.removeDataById(id);
    restaurantDataList.getFilteredDataList();
    //
  });
  $closeButton.addEventListener("click", removeModal);

  return $buttonWrap;
}
