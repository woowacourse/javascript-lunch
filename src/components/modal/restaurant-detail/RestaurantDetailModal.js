import restaurantDataList from "../../../domain/RestaurantDataList";
import createElement from "../../../util/createElement";
import RestaurantItemCategory from "../../restaurant/restaurantItem/RestaurantItemCategory";
import RestaurantItemFavorite from "../../restaurant/restaurantItem/RestaurantItemFavorite";
import RestaurantItemNameDistance from "../../restaurant/restaurantItem/RestaurantItemNameDistance";
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
  const $info = createElement({
    tag: "div",
    classNames: ["restaurantDetail__info"],
  });

  const $starWrap = createElement({
    tag: "div",
    classNames: ["restaurantDetail__star"],
  });

  const $description = createElement({
    tag: "p",
    classNames: [
      "restaurantDetail__description",
      "text-body",
      "marginTopBottom-15",
    ],
    textContent: description,
  });

  const $link = createElement({
    tag: "a",
    classNames: ["restaurantDetail__link", "text-body"],
    textContent: link,
    href: link,
  });

  const $category = RestaurantItemCategory({ src, alt });
  const $nameAndDistance = RestaurantItemNameDistance({ name, distance });
  const $favorite = RestaurantItemFavorite({ isFavorite, id });

  $favorite.addEventListener("click", () => {
    restaurantDataList.renderRestaurantList();
  });

  $starWrap.appendChild($favorite);
  $info.appendChild($category);
  $info.appendChild($nameAndDistance);
  $info.appendChild($starWrap);
  $info.appendChild($description);
  $info.appendChild($link);

  return $info;
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
    removeModal();

    restaurantDataList.removeDataById(id);
    restaurantDataList.renderRestaurantList();
  });

  $closeButton.addEventListener("click", removeModal);

  return $buttonWrap;
}
