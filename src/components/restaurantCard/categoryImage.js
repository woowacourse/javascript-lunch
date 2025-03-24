import Image from "../common/image";

const CategoryImage = (category) => {
  const categoryImage = document.createElement("div");
  categoryImage.classList.add("restaurant__category");

  const src = `./category-${category}.png`;

  categoryImage.appendChild(Image(src, category, "category-icon"));

  return categoryImage;
};
export default CategoryImage;
