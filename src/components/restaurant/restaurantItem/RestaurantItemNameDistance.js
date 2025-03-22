import createElement from "../../../util/createElement";

export default function RestaurantItemNameDistance({ name, distance }) {
  const $nameDistanceWrap = createElement({
    tag: "div",
  });
  const $name = createElement({
    tag: "h3",
    classNames: ["restaurant__name", "text-subtitle"],
    textContent: name,
  });
  const $distance = createElement({
    tag: "span",
    classNames: ["restaurant__distance", "text-body"],
    textContent: `캠퍼스부터 ${distance}분 내`,
  });
  $nameDistanceWrap.appendChild($name);
  $nameDistanceWrap.appendChild($distance);

  return $nameDistanceWrap;
}
