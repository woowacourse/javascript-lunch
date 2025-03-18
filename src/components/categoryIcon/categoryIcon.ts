import type { Category } from "../../types/type";

const categoryIcon = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png",
};

function createCategoryIcon(category: Category) {
  const categoryBox = createElement("div", {
    className: "restaurant__category",
  });
  const categoryImage = createElement("img", {
    src: categoryIcon[category],
    alt: category,
    className: "category-icon",
  });
  categoryBox.appendChild(categoryImage);
  return categoryBox;
}

export default createCategoryIcon;
