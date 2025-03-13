import { Restaurant } from "../../data/restaurant.ts";

const $restaurantDetailContent = (restaurant: Restaurant): HTMLDivElement => {
  const info = document.createElement("div");
  info.classList.add("restaurant__info");

  // 카테고리 아이콘
  const iconContainer = document.createElement("div");
  iconContainer.classList.add("restaurant__category");

  const categoryIcon = document.createElement("img");
  categoryIcon.src = restaurant.categoryIcon;
  categoryIcon.alt = `${restaurant.categoryTitle} icon`;

  iconContainer.appendChild(categoryIcon);
  info.appendChild(iconContainer);

  // 제목
  const title = document.createElement("h3");
  title.classList.add("restaurant__name", "text-subtitle");
  title.innerText = restaurant.name;
  info.appendChild(title);

  // 거리 정보
  const distance = document.createElement("span");
  distance.classList.add("restaurant__distance", "text-body");
  distance.innerText = `캠퍼스로부터 ${restaurant.distance}분 내`;
  info.appendChild(distance);

  // 설명
  const description = document.createElement("p");
  description.classList.add("restaurant__description", "text-body");
  description.innerText = restaurant.description;
  info.appendChild(description);

  // 링크
  const link = document.createElement("a");
  link.href = restaurant.link;
  link.innerText = restaurant.link;
  info.appendChild(link);

  return info;
};

export default $restaurantDetailContent;
