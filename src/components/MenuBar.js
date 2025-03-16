import uiBasicText from "../constants/uiBasicText.js";
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

  allButtonText.textContent = uiBasicText.ALL_MENUBAR_TEXT;
  favoriteButtonText.textContent = uiBasicText.FAVORITE_MENUBAR_TEXT;

  allButton.appendChild(allButtonText);
  favoriteButton.appendChild(favoriteButtonText);

  container.append(allButton, favoriteButton);
};

export default MenuBar;
