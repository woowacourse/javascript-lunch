import $button from "../common/button.js";
import $buttonContainer from "../layout/button-container.js";
import { UI_CONFIG } from "../../constants/uiConfig.js";
import { handleModalClose, handleModalOpen } from "./modal.js";
import { storageHandler } from "../../utils/storageHandler.js";
import { STORAGE_KEY_NAME } from "../../constants/storage.js";

const $createFavoriteIcon = (isFavorite) => {
  const favoriteIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  favoriteIcon.classList.add("favorite-icon");
  favoriteIcon.tabindex = 0;
  favoriteIcon.role = "button";
  favoriteIcon.setAttribute("fill", "#EC4A0A");
  const favoriteIconStroke = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  favoriteIconStroke.setAttribute(
    "d",
    `M14 21.0267L22.24 26L20.0534 16.6267L27.3334 10.32L17.7467 9.50666L14 0.666656L10.2534 9.50666L0.666687 10.32L7.94669 16.6267L5.76002 26L14 21.0267Z`
  );
  favoriteIconStroke.setAttribute("fill", `${isFavorite ? "#EC4A0A" : "none"}`);

  const favoriteIconPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  favoriteIconPath.setAttribute(
    "d",
    `M27.3334 10.32L17.7467 9.49332L14 0.666656L10.2534 9.50666L0.666687 10.32L7.94669 16.6267L5.76002 26L14 21.0267L22.24 26L20.0667 16.6267L27.3334 10.32ZM14 18.5333L8.98669 21.56L10.32 15.8533L5.89335 12.0133L11.7334 11.5067L14 6.13332L16.28 11.52L22.12 12.0267L17.6934 15.8667L19.0267 21.5733L14 18.5333Z`
  );
  favoriteIconPath.setAttribute("stroke", "#EC4A0A");
  favoriteIconPath.setAttribute("stroke-opacity", "0.5");
  favoriteIconPath.setAttribute("stroke-width", "1");
  favoriteIcon.appendChild(favoriteIconStroke);
  favoriteIcon.appendChild(favoriteIconPath);

  return favoriteIcon;
};

const $updateFavoriteIcon = (restaurantInfo) => {
  const favoriteState = storageHandler.updateFavorite(
    STORAGE_KEY_NAME,
    restaurantInfo
  );

  const favoriteIcon = document.querySelector(
    `[data-id="${restaurantInfo.id}"] > .favorite-icon > path:first-of-type`
  );

  const modalFavoriteIcon = document.querySelector(
    `.modal-container > .favorite-icon > path:first-of-type`
  );

  if (favoriteState) {
    favoriteIcon.setAttribute("fill", "none");
    modalFavoriteIcon.setAttribute("fill", "none");
    return;
  }

  favoriteIcon.setAttribute("fill", "#EC4A0A");
  modalFavoriteIcon.setAttribute("fill", "#EC4A0A");
};

const $createRestaurantInfo = (restaurantInfo) => {
  const {
    categoryIcon,
    categoryTitle,
    description,
    distance,
    link,
    name,
    id,
    isFavorite,
  } = restaurantInfo;
  const container = document.querySelector(".modal-container");
  container.replaceChildren();

  const category = document.createElement("div");
  category.classList.add("restaurant__category");

  const categoryImage = document.createElement("img");
  categoryImage.src = categoryIcon;
  categoryImage.alt = categoryTitle;
  categoryImage.classList.add("category-icon");
  category.appendChild(categoryImage);

  const InfoName = document.createElement("h3");
  InfoName.classList.add("restaurant__name", "text-subtitle");
  InfoName.textContent = name;

  const InfoDistance = document.createElement("span");
  InfoDistance.classList.add("restaurant__distance", "text-body");
  InfoDistance.textContent = `캠퍼스부터 ${distance}분 내`;

  const InfoDescription = document.createElement("p");
  InfoDescription.classList.add("restaurant__description", "text-body");
  InfoDescription.textContent = description;

  container.appendChild(category);
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

  const favoriteIcon = $createFavoriteIcon(isFavorite);
  favoriteIcon.addEventListener("click", (e) => {
    e.stopPropagation();

    $updateFavoriteIcon(restaurantInfo);
  });
  container.appendChild(favoriteIcon);

  const itemDelete = () => {
    document.querySelector(`[data-id="${id}"]`).remove();
    storageHandler.deleteItem(STORAGE_KEY_NAME, id);

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
