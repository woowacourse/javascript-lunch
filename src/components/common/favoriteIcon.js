import { STORAGE_KEY_NAME } from "../../constants/storage";
import { storageHandler } from "../../utils/storageHandler";

export const updateFavoriteIcon = (restaurantInfo, e) => {
  e.stopPropagation();

  const favoriteState = storageHandler.updateFavorite(
    STORAGE_KEY_NAME,
    restaurantInfo
  );

  const favoriteIcon = e.currentTarget.children[0];
  const isModalFavoriteIcon =
    e.currentTarget.parentNode.classList.contains("modal-container");
  const modalFavoriteIcon = document.querySelector(
    `.modal-container > .favorite-icon > path:first-of-type`
  );

  if (favoriteState) {
    if (isModalFavoriteIcon) {
      const listFavoriteIcon = document.querySelector(
        `[data-id="${restaurantInfo.id}"] > .favorite-icon > path:first-of-type`
      );
      listFavoriteIcon.setAttribute("fill", "none");
    }
    return favoriteIcon.setAttribute("fill", "none");
  }

  if (isModalFavoriteIcon) {
    const listFavoriteIcon = document.querySelector(
      `[data-id="${restaurantInfo.id}"] > .favorite-icon > path:first-of-type`
    );
    listFavoriteIcon.setAttribute("fill", "#EC4A0A");
  }
  favoriteIcon.setAttribute("fill", "#EC4A0A");
};

export const $favoriteIcon = (isFavorite) => {
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
