const $restaurantItem = (restaurantInfo) => {
  const restaurantItem = document.createElement("li");
  restaurantItem.classList.add("restaurant");

  const category = document.createElement("div");
  category.classList.add("restaurant__category");

  const categoryIcon = document.createElement("img");
  categoryIcon.src = restaurantInfo.categoryIcon;
  categoryIcon.alt = restaurantInfo.categoryTitle;
  categoryIcon.classList.add("category-icon");
  category.appendChild(categoryIcon);

  const info = document.createElement("div");
  info.classList.add("restaurant__info");

  const name = document.createElement("h3");
  name.classList.add("restaurant__name", "text-subtitle");
  name.textContent = restaurantInfo.name;
  info.appendChild(name);

  const distance = document.createElement("span");
  distance.classList.add("restaurant__distance", "text-body");
  distance.textContent = restaurantInfo.distance;
  info.appendChild(distance);

  const description = document.createElement("p");
  description.classList.add("restaurant__description", "text-body");
  description.textContent = restaurantInfo.description;
  info.appendChild(description);

  restaurantItem.appendChild(category);
  restaurantItem.appendChild(info);
  return restaurantItem;
};

export default $restaurantItem;
