import { IMAGE_SRC_BY_RESTAURANTS_CATEGORY } from "../constants/constants";

const createRestaurantItem = ({
  category,
  name,
  distance,
  description,
  imgSrc,
}) => {
  const li = document.createElement("li");
  li.classList.add("restaurant");

  const mappedImage = IMAGE_SRC_BY_RESTAURANTS_CATEGORY[category];

  li.innerHTML = `
      <div class="restaurant__category">
        <img src="${mappedImage}" alt="${category}" class="category-icon" />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">${distance}</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
    `;
  return li;
};

export default createRestaurantItem;
