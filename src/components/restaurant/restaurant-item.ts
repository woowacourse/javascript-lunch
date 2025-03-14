import { UI_CONFIG } from "../../constants/uiConfig";
import $favoriteButton from "../common/favorite-button";

type RestaurantItemProps = {
  dataId: number;
  categoryIcon: string;
  categoryTitle: string;
  name: string;
  distance: number;
  distanceCaption: string;
  description: string;
}

const $restaurantItem = ({ dataId, categoryIcon, categoryTitle, name, distance, distanceCaption, description }: RestaurantItemProps): HTMLLIElement => {
  const restaurantItem = document.createElement("li");
  restaurantItem.classList.add("restaurant");
  restaurantItem.setAttribute("data-id", dataId.toString());

  // 아이콘
  const category = document.createElement("div");
  category.classList.add("restaurant__category");

  const categoryImg = document.createElement("img");
  categoryImg.src = categoryIcon;
  categoryImg.alt = categoryTitle;
  categoryImg.classList.add("category");

  category.appendChild(categoryImg);
  restaurantItem.appendChild(category);

  // 내용
  const info = document.createElement("div");
  info.classList.add("restaurant__info");

  const restaurantHeader = document.createElement("div");
  restaurantHeader.classList.add("restaurant-header");
  const restaurantDetails = document.createElement("div");
  const restaurantName = document.createElement("h3");
  restaurantName.classList.add("restaurant__name", "text-subtitle");
  restaurantName.innerText = name;
  restaurantDetails.appendChild(restaurantName);

  const restaurantDistance = document.createElement("span");
  restaurantDistance.classList.add("restaurant__distance", "text-body");
  restaurantDistance.innerText = distanceCaption;
  restaurantDetails.appendChild(restaurantDistance);
  restaurantHeader.appendChild(restaurantDetails);

  restaurantHeader.appendChild($favoriteButton(UI_CONFIG.BUTTONS.FAVORITE));
  info.appendChild(restaurantHeader);

  const restaurantDescription = document.createElement("p");
  restaurantDescription.classList.add("restaurant__description", "text-body");
  restaurantDescription.innerText = description;
  info.appendChild(restaurantDescription);

  restaurantItem.appendChild(info);

  return restaurantItem;
};

export default $restaurantItem;
