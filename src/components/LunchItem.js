import { getHTML, createElement } from "../utils/utils.js";

function getCategoryImage(category) {
  switch (category) {
    case "한식":
      return "korean";
    case "중식":
      return "chinese";
    case "일식":
      return "japanese";
    case "양식":
      return "western";
    case "아시안":
      return "asian";
    case "기타":
      return "etc";
    default:
      return "etc";
  }
}

export function LunchItem({
  targetID,
  category,
  name,
  distance,
  description,
  link,
}) {
  const li = createElement("li");
  li.classList.add("restaurant");

  function render() {
    li.innerHTML = `
    <div class="restaurant__category">
      <img src="./images/category-${getCategoryImage(category)}.png" alt="${category}" class="category-icon">
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
      <p class="restaurant__description text-body">${description || "설명 없음"}</p>
      ${link ? `<a href="${link}" target="_blank" class="restaurant__link">링크</a>` : ""}
    </div>
  `;
  }
  render();
  getHTML(targetID).appendChild(li);
}
