import { ILunchItem } from "../../type.ts";
import { sortFilter, updateFilterState } from "../../utils/sortFilter.js";
import { getStorage, setStorage } from "../../utils/storage.ts";
import { getHTML, createElement } from "../../utils/utils.ts";
import { LunchItem } from "./LunchItem.ts";

export function LunchList(
  lunchListID: string = "restaurantListBox",
  favoriteTargetID: string = "restaurantFavoriteSection"
) {
  const lunchItems = (getStorage("lunchItems") as ILunchItem[]) ?? [];

  function updateFilter(newState) {
    updateFilterState(newState);
    render();
  }

  function template<T extends ILunchItem>(items: T[], indexMap?: number[]) {
    const ul = createElement("ul");
    ul.classList.add("restaurant-list");

    if (items.length > 0) {
      items.forEach((item, index) => {
        const originalIndex = indexMap ? indexMap[index] : index;
        ul.appendChild(LunchItem(item, String(originalIndex)));
      });
    } else {
      ul.innerHTML = `
      <div class="empty-info-container">
      <div class="empty-info-box">
        <div class="empty-icon">
        <?xml version="1.0" encoding="UTF-8"?>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 511.941 511.941" style="enable-background:new 0 0 511.941 511.941;" xml:space="preserve">
          <g>
            <path style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" d="&#10;&#9;&#9;M123.181,170.091c28.17-43.47,77.12-72.24,132.79-72.24c87.34,0,158.12,70.797,158.12,158.12v126"/>
            <path style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" d="&#10;&#9;&#9;M97.851,381.971v-126c0-19.18,3.41-37.56,9.67-54.57"/>
            
              <circle style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" cx="255.971" cy="323.493" r="15.059"/>
            <path style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" d="&#10;&#9;&#9;M255.971,278.317L255.971,278.317c-8.573,0-15.775-6.446-16.722-14.967l-10.07-90.629c-1.774-15.968,10.725-29.933,26.792-29.933h0&#10;&#9;&#9;c16.066,0,28.566,13.965,26.792,29.933l-10.07,90.629C271.746,271.871,264.544,278.317,255.971,278.317z"/>
            <path style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" d="&#10;&#9;&#9;M255.971,67.736L255.971,67.736c-8.317,0-15.059-6.742-15.059-15.059V22.559c0-8.317,6.742-15.059,15.059-15.059h0&#10;&#9;&#9;c8.317,0,15.059,6.742,15.059,15.059v30.118C271.029,60.994,264.287,67.736,255.971,67.736z"/>
            <path style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" d="&#10;&#9;&#9;M122.868,122.868L122.868,122.868c-5.881,5.881-15.416,5.881-21.296,0L58.979,80.276c-5.881-5.881-5.881-15.416,0-21.296l0,0&#10;&#9;&#9;c5.881-5.881,15.416-5.881,21.296,0l42.593,42.593C128.749,107.453,128.749,116.988,122.868,122.868z"/>
            <path style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" d="&#10;&#9;&#9;M389.073,122.868L389.073,122.868c5.881,5.881,15.416,5.881,21.296,0l42.593-42.593c5.881-5.881,5.881-15.416,0-21.296v0&#10;&#9;&#9;c-5.881-5.881-15.416-5.881-21.296,0l-42.593,42.593C383.192,107.453,383.192,116.988,389.073,122.868z"/>
            <path style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" d="&#10;&#9;&#9;M67.735,255.971L67.735,255.971c0,8.317-6.742,15.059-15.059,15.059H22.559c-8.317,0-15.059-6.742-15.059-15.059v0&#10;&#9;&#9;c0-8.317,6.742-15.059,15.059-15.059h30.118C60.993,240.912,67.735,247.654,67.735,255.971z"/>
            <path style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" d="&#10;&#9;&#9;M96.481,504.441h-13.86c-24.86,0-45-20.15-45-45v-30.47c0-24.85,20.14-45,45-45h223.86"/>
            <path style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" d="&#10;&#9;&#9;M341.481,383.971h87.84c24.86,0,45,20.15,45,45v30.47c0,24.85-20.14,45-45,45h-297.84"/>
            <path style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" d="&#10;&#9;&#9;M489.382,271.03h-30.118c-8.317,0-15.059-6.742-15.059-15.059v0c0-8.317,6.742-15.059,15.059-15.059h30.118&#10;&#9;&#9;c8.317,0,15.059,6.742,15.059,15.059v0C504.441,264.288,497.699,271.03,489.382,271.03z"/>
            <g>
              
                <line style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" x1="190.471" y1="422.859" x2="190.471" y2="434.859"/>
              <path style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" d="&#10;&#9;&#9;&#9;M310.072,434.524c0-7.68,6.226-13.906,13.906-13.906c7.68,0,13.906,6.226,13.906,13.906"/>
              <g>
                <path style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:round;stroke-miterlimit:10;" d="M256.066,442.742&#10;&#9;&#9;&#9;&#9;c0,7.984-6.472,14.456-14.456,14.456c-7.984,0-14.456-6.472-14.456-14.456"/>
                <path style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:round;stroke-miterlimit:10;" d="M284.977,442.742&#10;&#9;&#9;&#9;&#9;c0,7.984-6.472,14.456-14.456,14.456s-14.456-6.472-14.456-14.456"/>
              </g>
            </g>
          </g>
          </svg>
          </div>
        <p class="empty-message">음식점을 등록해주세요</p>
      </div>
      </div>
      `;
    }
    return ul;
  }

  function render() {
    const filteredItems = sortFilter(lunchItems ?? []);
    const ul = template(filteredItems);
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
    updateFilter,
  };
}
