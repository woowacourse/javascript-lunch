import { FOOD_CATEGORY } from "../../constants/foodCategory";
import createElement from "../../utils/createElement/createElement";
import Image from "../common/Image";

const CategoryImage = (category) =>
  createElement({
    tagName: "div",
    classNames: ["restaurant__category"],
    children: [
      Image({
        src: `./category-${FOOD_CATEGORY[category]}.png`,
        alt: category,
        classNames: ["category-icon"],
      }),
    ],
  });

export default CategoryImage;
