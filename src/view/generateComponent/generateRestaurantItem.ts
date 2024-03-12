import ASIAN_ICON from "../../../templates/category-asian.png";
import CHINESE_ICON from "../../../templates/category-chinese.png";
import ECT_ICON from "../../../templates/category-etc.png";
import JAPANESS_ICON from "../../../templates/category-japanese.png";
import KOREAN_ICON from "../../../templates/category-korean.png";
import WESTERN_ICON from "../../../templates/category-western.png";
import createElementByTag from "../utils/createElementByTag";

const categoryImgSrcMatcher = {
  한식: KOREAN_ICON,
  중식: CHINESE_ICON,
  일식: JAPANESS_ICON,
  아시안: ASIAN_ICON,
  양식: WESTERN_ICON,
  기타: ECT_ICON,
};

const createCategoryDiv = (category: Category) => {
  const div = createElementByTag({
    tag: "div",
    classes: ["restaurant__category"],
  });
  const img = createElementByTag({
    tag: "img",
    classes: ["category-icon"],
  });
  img.setAttribute("src", categoryImgSrcMatcher[category]);
  img.setAttribute("alt", category);

  div.appendChild(img);
  return div;
};

const createInfoDiv = ({
  name,
  distance,
  description = "",
}: {
  name: string;
  distance: number;
  description: string | undefined;
}) => {
  const div = createElementByTag({
    tag: "div",
    classes: ["restaurant__info"],
  });
  const h3 = createElementByTag({
    tag: "h3",
    classes: ["restaurant__name", "text-subtitle"],
    contents: name,
  });
  const span = createElementByTag({
    tag: "span",
    classes: ["restaurant__distance", "text-body"],
    contents: `캠퍼스로부터 ${distance}분 내`,
  });
  const p = createElementByTag({
    tag: "p",
    classes: ["restaurant__description", "text-body"],
    contents: description,
  });

  div.append(h3, span, p);

  return div;
};
const generateRestaurantItem = ({
  category,
  name,
  distance,
  description,
  url,
}: Restaurant) => {
  const li = createElementByTag({
    tag: "li",
    classes: ["restaurant"],
  });

  const categoryDiv = createCategoryDiv(category);
  const infoDiv = createInfoDiv({ name, distance, description });

  li.append(categoryDiv, infoDiv);

  return li;
};

export default generateRestaurantItem;
