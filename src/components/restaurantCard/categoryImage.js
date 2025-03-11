import { FOOD_CATEGORY } from "../../constants/foodCategory";
import createElement from "../../utils/createElement/createElement";
import Image from "../common/image";

const CategoryImage = (category) => {
  const categoryImage = createElement({
    tagName: "div",
    classNames: ["restaurant__category"],
  });

  const src = `./category-${FOOD_CATEGORY[category]}.png`;

  categoryImage.appendChild(Image(src, category, "category-icon"));

  return categoryImage;
};
export default CategoryImage;
