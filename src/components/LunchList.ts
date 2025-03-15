import { ILunchItem } from "../type.ts";
import { getStorage, setStorage } from "../utils/storage.ts";
import { getHTML, createElement } from "../utils/utils.ts";
import { LunchItem } from "./LunchItem.ts";

export function LunchList(
  lunchListID: string = "restaurantListSection",
  favoriteTargetID: string = "restaurantFavoriteSection"
) {
  const lunchItems = getStorage("lunchItems") as ILunchItem[];

  function template<T extends ILunchItem>(items: T[], indexMap?: number[]) {
    const ul = createElement("ul");
    ul.classList.add("restaurant-list");

    if (items.length > 0) {
      items.forEach((item, index) => {
        const originalIndex = indexMap ? indexMap[index] : index;
        ul.appendChild(LunchItem(item, String(originalIndex)));
      });
    } else {
      ul.innerHTML = `<p class="empty-message">목록이 없습니다.</p>`;
    }
    return ul;
  }

  function render() {
    const ul = template(lunchItems);
    getHTML(lunchListID).innerHTML = "";
    getHTML(lunchListID).innerHTML = ul.outerHTML;
  }

  function renderFavorites() {
    const favorites = lunchItems
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter((item) => item.isFavorite);

    const items = favorites.map((item) => {
      const { originalIndex, ...rest } = item;
      return rest;
    });

    const indexMap = favorites.map((item) => item.originalIndex);

    const ul = template(items, indexMap);
    getHTML(favoriteTargetID).innerHTML = "";
    getHTML(favoriteTargetID).appendChild(ul);
  }

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
    renderFavorites,
  };
}
