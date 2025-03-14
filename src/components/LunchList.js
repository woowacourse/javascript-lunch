import { getHTML, createElement } from "../utils/utils.js";
import { LunchItem } from "./LunchItem.js";

export function LunchList(targetID) {
  const lunchItems = [
    LunchItem({
      category: "etc",
      name: "도스타코스 선릉점",
      distance: 5,
      description: "멕시칸 캐주얼 그릴",
      isFavorite: true,
    }),
    LunchItem({
      category: "japanese",
      name: "잇쇼우",
      distance: 10,
      description:
        "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다",
      isFavorite: false,
    }),
  ];
  const ul = createElement("ul");
  ul.classList.add("restaurant-list");

  function template() {
    if (lunchItems.length > 0) {
      lunchItems.forEach((item) => {
        ul.appendChild(item);
      });
    } else {
      ul.innerHTML = `<p class="empty-message">목록이 없습니다.</p>`;
    }
    return ul.outerHTML;
  }

  function render() {
    getHTML(targetID).innerHTML = "";
    getHTML(targetID).innerHTML = template();
  }

  function addRestaurantItem({ category, name, distance, description, link }) {
    const newItem = LunchItem({ category, name, distance, description, link });
    lunchItems.push(newItem);
    ul.appendChild(newItem);
    render();
  }

  return {
    render,
    addRestaurantItem,
    template,
  };
}
