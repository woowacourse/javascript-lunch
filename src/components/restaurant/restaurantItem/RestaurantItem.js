import restaurantDataList from "../../../domain/RestaurantDataList";
import createElement from "../../../util/createElement";
import Modal from "../../modal/Modal";
import RestaurantDetailModal from "../../modal/restaurant-detail/RestaurantDetailModal";

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

  // 카테고리 이미지 컨테이너
  const $category = createElement({
    tag: "div",
    classNames: ["restaurant__category"],
  });
  const $categoryImg = createElement({
    tag: "img",
    classNames: ["category-icon"],
    src: src,
    alt: alt,
  });
  $category.appendChild($categoryImg);

  // 레스토랑 정보 컨테이너
  const $restaurantInfo = createElement({
    tag: "div",
    classNames: ["restaurant__info"],
  });

  // 레스토랑 헤더 (이름, 거리, 즐겨찾기)
  const $restaurantHeader = createElement({
    tag: "div",
    classNames: ["restaurantItem__header"],
  });

  // 레스토랑 이름과 거리 컨테이너
  const $nameDistanceWrap = createElement({
    tag: "div",
  });
  const $name = createElement({
    tag: "h3",
    classNames: ["restaurant__name", "text-subtitle"],
    textContent: name,
  });
  const $distance = createElement({
    tag: "span",
    classNames: ["restaurant__distance", "text-body"],
    textContent: `캠퍼스부터 ${distance}분 내`,
  });
  $nameDistanceWrap.appendChild($name);
  $nameDistanceWrap.appendChild($distance);

  // 즐겨찾기 아이콘
  const $favoriteWrap = createElement({
    tag: "div",
  });
  const $favorite = createElement({
    tag: "img",
    name: "favorite__star",
    classNames: ["favorite__star"],
    src: isFavorite ? "/public/fill-star.png" : "/public/empty-star.png",
    alt: isFavorite ? "좋아요한 별" : "좋아요안한 별",
  });
  $favoriteWrap.appendChild($favorite);

  // 레스토랑 헤더에 추가
  $restaurantHeader.appendChild($nameDistanceWrap);
  $restaurantHeader.appendChild($favoriteWrap);

  // 레스토랑 설명
  const $description = createElement({
    tag: "p",
    classNames: ["restaurant__description", "text-body"],
    textContent: description,
  });

  // 전체 구조 조립
  $restaurantInfo.appendChild($restaurantHeader);
  $restaurantInfo.appendChild($description);

  $restaurantItem.appendChild($category);
  $restaurantItem.appendChild($restaurantInfo);

  $restaurantItem.addEventListener("click", (event) => {
    if (event.target.name === "favorite__star") {
      restaurantDataList.changeFavorite(id);
      restaurantDataList.getFilteredDataList();
      return;
    }

    const dataById = restaurantDataList.getDataById(id);
    Modal(() => RestaurantDetailModal({ ...dataById }));
  });

  return $restaurantItem;
}
