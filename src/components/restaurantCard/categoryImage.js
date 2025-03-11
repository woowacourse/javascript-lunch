import { FOOD_CATEGORY } from "../../constants/foodCategory";
import createElement from "../../utils/createElement/createElement";
import Image from "../common/image";

const CategoryImage = (category) =>
  createElement({
    tagName: "div",
    classNames: ["restaurant__category"],
    children: [
      Image(
        `./category-${FOOD_CATEGORY[category]}.png`,
        category,
        "category-icon"
      ),
    ],
  });
  
export default CategoryImage;
