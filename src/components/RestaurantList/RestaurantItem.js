const RestaurantItem = ({
  id,
  category,
  name,
  distance,
  description,
  isFavorite,
}) => {
  const imageSource = {
    한식: "category-korean.png",
    중식: "category-chinese.png",
    일식: "category-japanese.png",
    양식: "category-western.png",
    아시안: "category-asian.png",
    기타: "category-etc.png",
  };

  return /* html */ `
    <li class="restaurant" data-id="${id}">
      <div class="restaurant__category">
        <img src="./icons/${
          imageSource[category]
        }" alt="${category}" class="category-icon" />
      </div>
      <div class="restaurant__info">
        <div class="restaurant__header">
          <div>
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          </div>
          <img src="${
            isFavorite
              ? "./icons/favorite-icon-filled.png"
              : "./icons/favorite-icon-lined.png"
          }" alt="${
    isFavorite ? "favorite" : "not-favorite"
  }" class="favorite-icon" data-testid="favorite-icon" />
        </div>
        <p class="restaurant__description text-body">${description}</p>
      </div>
    </li>
  `;
};

export default RestaurantItem;
