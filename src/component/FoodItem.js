import { IconButton } from "./button/IconButton";

export function FoodItem(
  foodItem,
  handleModal = () => {},
  handleFavoriteButton = () => {}
) {
  const {
    imgSrc,
    imgAlt,
    name,
    distance,
    description,
    link,
    favorite = false,
  } = foodItem;

  const itemContainer = document.createElement("li");
  itemContainer.className = "restaurant";
  itemContainer.addEventListener("click", () => {
    handleModal(foodItem);
  });

  const convertStarImg = favorite ? "./filled-star.png" : "./empty-star.png";

  const favoriteIcon = IconButton({
    imgSrc: convertStarImg,
    label: "즐겨찾기 버튼",
    onClick: (event) => handleFavoriteButton(event, foodItem),
  });

  favoriteIcon.classList.add("restaurant-star");

  itemContainer.innerHTML = `
        <div class="restaurant__category">
          <img src=${imgSrc} alt=${imgAlt} class="category-icon">
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          <p class="restaurant__description text-body">${description}</p>
        </div>
          `;

  itemContainer.appendChild(favoriteIcon);

  return itemContainer;
}
