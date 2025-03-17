import $button from "../common/button";
import $buttonContainer from "../layout/buttonContainer";
import { UI_CONFIG } from "../../constants/uiConfig";
import { handleModalClose, handleModalOpen } from "../modal/modal";
import { storageHandler } from "../../utils/storageHandler";
import { STORAGE_KEY_NAME } from "../../constants/storage";
import { $favoriteIcon, updateFavoriteIcon } from "../common/favoriteIcon";
import { USER_MESSAGE } from "../../constants/message";
import { CATEGORY_ICON } from "../../constants/iconPath";

const $createRestaurantInfo = (restaurantInfo) => {
  const { category, description, distance, link, name, id, isFavorite } =
    restaurantInfo;
  const container = document.querySelector(".modal-container");
  container.replaceChildren();

  const categoryBox = document.createElement("div");
  categoryBox.classList.add("restaurant__category");

  const categoryImage = document.createElement("img");
  categoryImage.src = CATEGORY_ICON[category];
  categoryImage.alt = category;
  categoryImage.classList.add("category-icon");
  categoryBox.appendChild(categoryImage);

  const InfoName = document.createElement("h3");
  InfoName.classList.add("restaurant__name", "text-subtitle");
  InfoName.textContent = name;

  const InfoDistance = document.createElement("span");
  InfoDistance.classList.add("restaurant__distance", "text-body");
  InfoDistance.textContent = `캠퍼스부터 ${distance}분 내`;

  const InfoDescription = document.createElement("p");
  InfoDescription.classList.add("restaurant__description", "text-body");
  InfoDescription.textContent = description;

  container.appendChild(categoryBox);
  container.appendChild(InfoName);
  container.appendChild(InfoDistance);
  container.appendChild(InfoDescription);
  container.appendChild(InfoDescription);

  if (link) {
    const InfoLink = document.createElement("a");
    InfoLink.href = link;
    InfoLink.target = "_blank";
    InfoLink.rel = "noopener noreferrer";
    InfoLink.textContent = link;

    container.appendChild(InfoLink);
  }

  const favoriteIcon = $favoriteIcon(isFavorite);
  favoriteIcon.addEventListener("click", (e) => {
    e.stopPropagation();

    updateFavoriteIcon(restaurantInfo, e);
  });
  container.appendChild(favoriteIcon);

  const itemDelete = () => {
    if (confirm(USER_MESSAGE.CONFIRM_DELETE)) {
      document.querySelector(`[data-id="${id}"]`).remove();
      storageHandler.deleteItem(STORAGE_KEY_NAME, id);
    }

    handleModalClose();
  };
  const deleteEvent = {
    eventType: "click",
    eventHandler: itemDelete,
  };
  const closeEvent = { eventType: "click", eventHandler: handleModalClose };
  const deleteCloseButtons = $buttonContainer([
    $button(UI_CONFIG.BUTTONS.DELETE, deleteEvent),
    $button(UI_CONFIG.BUTTONS.CLOSE, closeEvent),
  ]);

  container.appendChild(deleteCloseButtons);

  handleModalOpen();
};

export default $createRestaurantInfo;
