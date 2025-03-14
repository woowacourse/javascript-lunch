import { ILunchItem } from "../type.ts";
import { getStorage, setStorage } from "../utils/storage.ts";
import { getHTML, createElement } from "../utils/utils.ts";
import { LunchItem } from "./LunchItem.ts";

export function LunchList(targetID: string = "restaurantListSection") {
  // 런치아이템 데이터를 가진 객체들이 배열로 받음
  const lunchItems = getStorage("lunchItems") as ILunchItem[];

  function template() {
    const ul = createElement("ul");
    ul.classList.add("restaurant-list");

    if (lunchItems.length > 0) {
      lunchItems.forEach((item, index: number) => {
        ul.appendChild(LunchItem(item, String(index)));
      });
    } else {
      ul.innerHTML = `<p class="empty-message">목록이 없습니다.</p>`;
    }
    return ul.outerHTML;
  }

  function render() {
    console.log("실행됨실행됨");
    getHTML(targetID).innerHTML = "";
    getHTML(targetID).innerHTML = template();
  }

  // submit 일어나면 lunchItems에 새 데이터 객체 추가
  function addRestaurantItem({
    category,
    name,
    distance,
    description,
    link,
  }: ILunchItem) {
    const newItem = {
      category,
      name,
      distance,
      description,
      link,
      isFavorite: false,
    };
    lunchItems.push(newItem);
    setStorage("lunchItems", lunchItems);
    render();
  }

  return {
    render,
    addRestaurantItem,
    template,
  };
}
