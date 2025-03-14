import { STORAGE_KEY_NAME } from "../../constants/storage";
import { storageHandler } from "../../utils/storageHandler";
import $createRestaurantInfo from "../modal/createRestaurantInfo";

const $restaurantCategory = ({ categoryIcon, categoryTitle }) => {
  const category = document.createElement("div");
  category.classList.add("restaurant__category");

  const categoryImage = document.createElement("img");
  categoryImage.src = categoryIcon;
  categoryImage.alt = categoryTitle;
  categoryImage.classList.add("category-icon");
  category.appendChild(categoryImage);

  return category;
};

const $restaurantInfo = ({ name, distance, description }) => {
  const info = document.createElement("div");
  info.classList.add("restaurant__info");

  const InfoName = document.createElement("h3");
  InfoName.classList.add("restaurant__name", "text-subtitle");
  InfoName.textContent = name;
  info.appendChild(InfoName);

  const InfoDistance = document.createElement("span");
  InfoDistance.classList.add("restaurant__distance", "text-body");
  InfoDistance.textContent = `캠퍼스부터 ${distance}분 내`;
  info.appendChild(InfoDistance);

  const InfoDescription = document.createElement("p");
  InfoDescription.classList.add("restaurant__description", "text-body");
  InfoDescription.textContent = description;
  info.appendChild(InfoDescription);

  return info;
};

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

  if (favoriteState) {
    return favoriteIcon.setAttribute("fill", "none");
  }

  favoriteIcon.setAttribute("fill", "#EC4A0A");
};

const $restaurantItem = (restaurantInfo) => {
  const restaurantItem = document.createElement("li");
  restaurantItem.classList.add("restaurant");
  restaurantItem.dataset.id = restaurantInfo.id;

  restaurantItem.appendChild($restaurantCategory(restaurantInfo));
  restaurantItem.appendChild($restaurantInfo(restaurantInfo));
  restaurantItem.addEventListener("click", () =>
    $createRestaurantInfo(restaurantInfo)
  );
  const favoriteIcon = $createFavoriteIcon(restaurantInfo.isFavorite);
  favoriteIcon.addEventListener("click", (e) => {
    e.stopPropagation();

    $updateFavoriteIcon(restaurantInfo);
  });
  restaurantItem.appendChild(favoriteIcon);
  return restaurantItem;
};

export default $restaurantItem;
