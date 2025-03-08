const categoryIcon = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png",
};

export default function createRestaurantItem({
  category,
  name,
  distance,
  description,
  link,
}) {
  const restaurantItem = createElement("li", { className: "restaurant" });

  const categoryBox = createElement("div", {
    className: "restaurant__category",
  });
  const categoryImage = createElement("img", {
    src: categoryIcon[category],
    alt: category,
    className: "category-icon",
  });
  categoryBox.appendChild(categoryImage);

  const infoBox = createElement("div", { className: "restaurant__info" });
  const nameElement = createElement("h3", {
    className: ["restaurant__name", "text-subtitle"],
    textContent: name,
  });
  const distanceElement = createElement("span", {
    className: ["restaurant__distance", "text-body"],
    textContent: `캠퍼스부터 ${distance}분 내`,
  });
  const descriptionElement = createElement("p", {
    className: ["restaurant__description", "text-body"],
    textContent: description,
  });
  infoBox.appendChild(
    createElementsFragment([nameElement, distanceElement, descriptionElement])
  );

  restaurantItem.appendChild(createElementsFragment([categoryBox, infoBox]));
  return restaurantItem;
}
