import createElement from "../../../util/createElement";

export default function RestaurantItemCategory({ src, alt }) {
  const $category = createElement({
    tag: "div",
    classNames: ["restaurant__category"],
  });
  const $categoryImg = createElement({
    tag: "img",
    classNames: ["category-icon"],
    src: src,
    alt: alt,
  });
  $category.appendChild($categoryImg);

  return $category;
}
