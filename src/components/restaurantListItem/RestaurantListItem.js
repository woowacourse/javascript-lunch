export default function RestaurantListItem({
  category,
  name,
  distance,
  description,
  link,
}) {
  const $item = document.createElement("li");
  $item.className = "restaurant";

  const $category = document.createElement("div");
  $category.className = "restaurant__category";

  const $categoryImg = document.createElement("img");
  $categoryImg.className = "category-icon";
  // TODO: 카테고리 상수화
  $categoryImg.src = "/assets/category-korean.png";
  $categoryImg.setAttribute("alt", category);

  const $info = document.createElement("div");
  $info.className = "restaurant__info";

  const $name = document.createElement("h3");
  $name.className = "restaurant__name text-subtitle";
  $name.textContent = name;

  const $distance = document.createElement("span");
  $distance.className = "restaurant__distance text-body";
  $distance.textContent = `캠퍼스부터 ${distance}분 내`;

  const $description = document.createElement("p");
  $description.className = "restaurant__description text-body";
  $description.textContent = description;

  $item.appendChild($category);
  $item.appendChild($info);

  $category.appendChild($categoryImg);
  $info.appendChild($name);
  $info.appendChild($distance);
  $info.appendChild($description);

  return $item;
}
