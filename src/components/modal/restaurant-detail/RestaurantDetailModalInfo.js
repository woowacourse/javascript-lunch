import RestaurantItemCategory from "../../restaurant/restaurantItem/RestaurantItemCategory";
import RestaurantItemFavorite from "../../restaurant/restaurantItem/RestaurantItemFavorite";
import RestaurantItemNameDistance from "../../restaurant/restaurantItem/RestaurantItemNameDistance";
import restaurantDataList from "../../../domain/RestaurantList.ts";
import createElement from "../../../util/createElement.js";

export default function RestaurantDetailModalInfo({
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
