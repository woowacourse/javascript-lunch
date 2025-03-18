import type { Restaurant } from "../../../types/type";
import { removeRestaurantItem } from "../../../utils/restaurant";
import { handleModalClose } from "../../bottomSheet/bottomSheet";
import createButton from "../../button/button";
import createCategoryIcon from "../../categoryIcon/categoryIcon";
import createStarIcon from "../../starIcon/starIcon";
import {
  getRestaurantItemStarIcon,
  toggleRestaurantFavorite,
} from "../list/item/restaurantItem";
import { renderRestaurantList } from "../list/restaurantList";

function handleRestaurantItemDelete(id: string) {
  renderRestaurantList(removeRestaurantItem(id));
  handleModalClose();
}

function handleRestaurantItemClick(e: MouseEvent, id: string) {
  const target = e.target as HTMLElement;

  if (target.closest(".detail-star-icon")) {
    const starIcon = document.querySelector(".detail-star-icon") as HTMLElement;
    toggleRestaurantFavorite(id, [
      { starIcon, className: "detail-star-icon" },
      { starIcon: getRestaurantItemStarIcon(id), className: "star-icon" },
    ]);
  }

  if (target.closest(".delete-button")) {
    handleRestaurantItemDelete(id);
  }

  if (target.closest(".close-button")) {
    handleModalClose();
  }
}

function createRestaurantDetail({
  id,
  category,
  name,
  distance,
  description,
  link,
  isFavorite,
}: Restaurant) {
  const detailBox = createElement("div", { className: "detail-modal" });
  const detailHeader = createElement("div", {
    className: "detail-header",
  });

  detailHeader.append(
    createCategoryIcon(category),
    createStarIcon({ className: "detail-star-icon", isFill: isFavorite })
  );

  const detailBody = createElement("div", {
    className: "detail-body",
  });
  const detailName = createElement("h2", {
    className: "detail-name",
    textContent: name,
  });
  const detailDistance = createElement("span", {
    className: "detail-distance",
    textContent: `캠퍼스부터 ${distance}분 내`,
  });
  const detailDescription = createElement("p", {
    className: "detail-description",
    textContent: description,
  });
  const detailLink = createElement("a", {
    className: "detail-link",
    href: link,
    textContent: link,
  });
  detailBody.append(detailName, detailDistance, detailDescription, detailLink);

  const detailFooter = createElement("div", {
    className: "detail-footer",
  });
  detailFooter.append(
    createButton({
      type: "button",
      className: [
        "button",
        "button--secondary",
        "text-caption",
        "delete-button",
      ],
      textContent: "삭제하기",
    }),
    createButton({
      type: "button",
      className: ["button", "button--primary", "text-caption", "close-button"],
      textContent: "닫기",
    })
  );

  detailBox.append(detailHeader, detailBody, detailFooter);

  detailBox.addEventListener("click", (e: MouseEvent) =>
    handleRestaurantItemClick(e, id)
  );
  return detailBox;
}

export default createRestaurantDetail;
