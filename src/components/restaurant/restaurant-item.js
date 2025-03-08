const $restaurantItem = ({ categoryIcon, categoryTitle, name, distance, description }) => {
  const restaurantItem = document.createElement("li");
  restaurantItem.classList.add("restaurant");

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

  const restaurantName = document.createElement("h3");
  restaurantName.classList.add("restaurant__name", "text-subtitle");
  restaurantName.innerText = name;
  info.appendChild(restaurantName);

  const restaurantDistance = document.createElement("span");
  restaurantDistance.classList.add("restaurant__distance", "text-body");
  restaurantDistance.innerText = distance;
  info.appendChild(restaurantDistance);

  const restaurantDescription = document.createElement("p");
  restaurantDescription.classList.add("restaurant__description", "text-body");
  restaurantDescription.innerText = description;
  info.appendChild(restaurantDescription);

  restaurantItem.appendChild(info);

  return restaurantItem;
};

export default $restaurantItem;
