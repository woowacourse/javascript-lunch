import $button from "../common/button.js";
import $buttonContainer from "../layout/button-container.js";
import { UI_CONFIG } from "../../constants/uiConfig.js";
import { handleModalClose, handleModalOpen } from "./modal.js";

const $createRestaurantInfo = ({
  categoryIcon,
  categoryTitle,
  description,
  distance,
  link,
  name,
  id,
}) => {
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
  InfoDistance.textContent = distance;

  const InfoDescription = document.createElement("p");
  InfoDescription.classList.add("restaurant__description", "text-body");
  InfoDescription.textContent = description;

  container.appendChild(category);
  container.appendChild(InfoName);
  container.appendChild(InfoDistance);
  container.appendChild(InfoDescription);

  if (link) {
    const InfoLink = document.createElement("a");
    InfoLink.href = link;
    InfoLink.target = "_blank";
    InfoLink.rel = "noopener noreferrer";
    InfoLink.textContent = link;

    container.appendChild(InfoLink);
  }

  const deleteEvent = { eventType: null, eventHandler: null };
  const closeEvent = { eventType: "click", eventHandler: handleModalClose };
  const deleteCloseButtons = $buttonContainer([
    $button(UI_CONFIG.BUTTONS.DELETE, deleteEvent),
    $button(UI_CONFIG.BUTTONS.CLOSE, closeEvent),
  ]);

  container.appendChild(deleteCloseButtons);

  handleModalOpen();
};

export default $createRestaurantInfo;
