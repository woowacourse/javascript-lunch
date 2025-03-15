import restaurantDataList from "../../../domain/RestaurantDataList.ts";
import createElement from "../../../util/createElement";
import Modal from "../../modal/Modal";
import RestaurantDetailModal from "../../modal/restaurant-detail/RestaurantDetailModal";
import RestaurantItemCategory from "./RestaurantItemCategory";
import RestaurantItemFavorite from "./RestaurantItemFavorite";
import RestaurantItemNameDistance from "./RestaurantItemNameDistance";

export default function RestaurantItem({
  id,
  src,
  alt,
  name,
  distance,
  description,
  isFavorite,
}) {
  const $restaurantItem = createElement({
    tag: "li",
    classNames: ["restaurant"],
    id: id,
  });

  const $restaurantInfo = createElement({
    tag: "div",
    classNames: ["restaurant__info"],
  });

  const $restaurantHeader = createElement({
    tag: "div",
    classNames: ["restaurantItem__header"],
  });

  const $category = RestaurantItemCategory({ src, alt });

  const $nameDistanceWrap = RestaurantItemNameDistance({ name, distance });
  const $favoriteWrap = RestaurantItemFavorite({ isFavorite, id });

  const $description = createElement({
    tag: "p",
    classNames: ["restaurant__description", "text-body"],
    textContent: description,
  });

  $restaurantHeader.appendChild($nameDistanceWrap);
  $restaurantHeader.appendChild($favoriteWrap);

  $restaurantInfo.appendChild($restaurantHeader);
  $restaurantInfo.appendChild($description);

  $restaurantItem.appendChild($category);
  $restaurantItem.appendChild($restaurantInfo);

  $restaurantItem.addEventListener("click", (event) => {
    if (event.target.name !== "favorite__star") {
      const dataById = restaurantDataList.getDataById(id);
      Modal(() => RestaurantDetailModal({ ...dataById }));
    }
  });

  return $restaurantItem;
}
