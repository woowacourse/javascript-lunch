import ASIAN_ICON from "../../../templates/category-asian.png";
import CHINESE_ICON from "../../../templates/category-chinese.png";
import ECT_ICON from "../../../templates/category-etc.png";
import JAPANESE_ICON from "../../../templates/category-japanese.png";
import KOREAN_ICON from "../../../templates/category-korean.png";
import WESTERN_ICON from "../../../templates/category-western.png";
import createElementByTag from "../utils/createElementByTag";
import generateFavoriteButton from "./Button/generateFavoritesButton";

const categoryImgSrcMatcher = {
  한식: KOREAN_ICON,
  중식: CHINESE_ICON,
  일식: JAPANESE_ICON,
  아시안: ASIAN_ICON,
  양식: WESTERN_ICON,
  기타: ECT_ICON,
};

export const createCategoryDiv = (category: Category) => {
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

export const createNameH3Tag = (name: string) => {
  return createElementByTag({
    tag: "h3",
    classes: ["restaurant__name", "text-subtitle"],
    contents: name,
  });
};

export const createDistanceSpan = (distance: Distance) => {
  return createElementByTag({
    tag: "span",
    classes: ["restaurant__distance", "text-body"],
    contents: `캠퍼스로부터 ${distance}분 내`,
  });
};

export const createDescriptionPTag = (description: string = "") => {
  return createElementByTag({
    tag: "p",
    classes: ["restaurant__description", "text-body"],
    contents: description,
  });
};

export const createLinkDiv = (link: string = "") => {
  const div = createElementByTag({
    tag: "div",
    classes: ["restaurant__link", "text-body"],
  });

  const aTag = createElementByTag({
    tag: "a",
    classes: ["restaurant__link", "text-body"],
    contents: link,
    attribute: { href: link, target: "_blank_" },
  });

  div.append(aTag);
  return div;
};

const createInfoDiv = ({
  name,
  distance,
  description = "",
}: {
  name: string;
  distance: Distance;
  description: string | undefined;
}) => {
  const div = createElementByTag({
    tag: "div",
    classes: ["restaurant__info"],
  });
  const nameH3 = createNameH3Tag(name);
  const distanceSpan = createDistanceSpan(distance);
  const descriptionP = createDescriptionPTag(description);

  div.append(nameH3, distanceSpan, descriptionP);

  return div;
};

const generateRestaurantItem = ({
  category,
  name,
  distance,
  description,
  favorites,
  link,
}: Restaurant) => {
  const li = createElementByTag({
    tag: "li",
    classes: ["restaurant"],
    attribute: { name: name },
  });

  const categoryDiv = createCategoryDiv(category);
  const infoDiv = createInfoDiv({ name, distance, description });
  const favoritesButton = generateFavoriteButton({
    isFavorites: favorites,
    restaurantName: name,
  });

  li.append(categoryDiv, infoDiv, favoritesButton);

  return li;
};

export default generateRestaurantItem;
