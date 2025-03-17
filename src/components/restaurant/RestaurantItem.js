import Restaurant from "./Restaurant";
import restaurantDataList from "../../domain/RestaurantDataList";
import createElement from "../../util/createElement";

export default function RestaurantItem({
  id,
  src,
  alt,
  name,
  distance,
  description,
  isWish,
  link,
  isColumn = false,
}) {
  const $restaurantItem = createElement({
    tag: "li",
    classNames: ["restaurant"],
    id,
  });

  const $restaurantCategory = createElement({
    tag: "div",
    classNames: ["restaurant__category"],
  });

  const $categoryIcon = createElement({
    tag: "img",
    src,
    alt,
    classNames: ["category-icon"],
  });

  const $restaurantInfo = createElement({
    tag: "div",
    classNames: ["restaurant__info"],
  });

  const $restaurantName = createElement({
    tag: "h3",
    classNames: ["restaurant__name", "text-subtitle"],
  });

  const $restaurantDistance = createElement({
    tag: "span",
    classNames: ["restaurant__distance", "text-body"],
  });

  const $restaurantDescription = createElement({
    tag: "p",
    classNames: ["restaurant__description", "text-body"],
  });

  const $restaurantWish = createElement({
    tag: "div",
    classNames: ["restaurant-wish", "text-body"],
  });

  const $restaurantStar = createElement({
    tag: "span",
    classNames: ["restaurant-star", `${isWish && "active"}`],
    id,
  });

  const $restaurantLink = createElement({
    tag: "a",
    href: link,
    target: "_blank",
    classNames: ["text-body"],
  });

  if (isColumn) {
    $restaurantItem.classList.add("modal-column");
    $restaurantDescription.classList.add("text-column");
  }

  $restaurantStar.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleStar();
  });

  function toggleStar() {
    const isWish = restaurantDataList.updateIsWish(id);
    if (!isWish && isColumn) {
      $restaurantStar.classList.toggle("active");
    }

    if (!isColumn) {
      Restaurant({ isReRender: true });
    }
  }

  $restaurantCategory.appendChild($categoryIcon);

  $restaurantInfo.appendChild($restaurantName);
  $restaurantInfo.appendChild($restaurantDistance);
  $restaurantInfo.appendChild($restaurantDescription);

  $restaurantWish.appendChild($restaurantStar);

  $restaurantItem.appendChild($restaurantCategory);
  $restaurantItem.appendChild($restaurantInfo);
  $restaurantItem.appendChild($restaurantWish);

  $restaurantName.textContent = name;
  $restaurantDistance.textContent = `캠퍼스로부터 ${distance}분 내`;
  $restaurantDescription.textContent = description;
  $restaurantStar.textContent = "★";

  if (isColumn) {
    console.log(link);
    $restaurantInfo.appendChild($restaurantLink);
    $restaurantLink.textContent = link;
  }

  return $restaurantItem;
}
