import uiBasicText from "../constants/uiBasicText.js";
import storeRenderer from "../render/storeRenderer.js";
import createElement from "../utils/createElement.js";

// 모든 음식점 / 자주 가는 음식점 메뉴바
const MenuBar = (storeList) => {
  const container = document.querySelector(".restaurant-menuBar-container");

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

  // 이벤트
  document
    .querySelector(".restaurant-menuBar-container")
    .addEventListener("click", (e) => {
      storeRenderer.setMenuBar(storeList, e);
    });
};

export default MenuBar;
