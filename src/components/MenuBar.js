import createElement from "../utils/createElement.js";
import querySelector from "../utils/querySelector.js";

const MenuBar = () => {
  const container = querySelector(".restaurant-menuBar-container");

  const allButton = createElement({
    tag: "button",
    classList: ["all-restaurant-button", "menuBar-button", "onMenuBar"],
  });
  const allButtonText = createElement({
    tag: "span",
    classList: ["all-restaurant-button-text", "button-text"],
  });

  const favoriteButton = createElement({
    tag: "button",
    classList: ["favorite-restaurant-button", "menuBar-button"],
  });
  const favoriteButtonText = createElement({
    tag: "span",
    classList: ["favorite-restaurant-button-text", "button-text"],
  });

  allButtonText.textContent = "모든 음식점";
  favoriteButtonText.textContent = "자주 가는 음식점";

  allButton.appendChild(allButtonText);
  favoriteButton.appendChild(favoriteButtonText);

  container.append(allButton, favoriteButton);
};

export default MenuBar;
