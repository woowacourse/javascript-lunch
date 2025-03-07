const RestaurantItem = ({ category, name, distance, description }) => {
  const imageSource = () => {
    switch (category) {
      case "한식":
        return "category-korean.png";
      case "중식":
        return "category-chinese.png";
      case "일식":
        return "category-japanese.png";
      case "양식":
        return "category-western.png";
      case "아시안":
        return "category-asian.png";
      default:
        return "category-etc.png";
    }
  };

  return /* html */ `
    <li class="restaurant">
      <div class="restaurant__category">
        <img src="./icons/${imageSource()}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
    </li>
  `;
};

export default RestaurantItem;
