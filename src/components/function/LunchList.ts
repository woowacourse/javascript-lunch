import { ClickActions } from "../../components-event/constants/Events.js";
import { ILunchItem } from "../../type.ts";
import { getStorage, setStorage } from "../../utils/storage.ts";
import { getHTML, createElement } from "../../utils/utils.ts";
import { LunchItem } from "./LunchItem.ts";

interface FilterState {
  category: string;
  sortOption: "name" | "distance";
}

export function LunchList(
  lunchListID: string = "restaurantListBox",
  favoriteTargetID: string = "restaurantFavoriteSection"
) {
  let lunchItems = (getStorage("lunchItems") as ILunchItem[]) ?? [];
  let filterState: FilterState = {
    category: "",
    sortOption: "name",
  };

  function updateFilterState(newState: Partial<FilterState>) {
    filterState = {
      ...filterState,
      ...newState,
    };
    console.log("FilterState Updated:", filterState); // 디버깅용 로그 추가ㄴ
    render();
  }

  function sortFilter(items: ILunchItem[]): ILunchItem[] {
    if (!Array.isArray(items)) return items;

    let filtered = items.map((item) => ({ ...item }));

    if (filterState.category) {
      filtered = filtered.filter(
        (item) => item.category === filterState.category
      );
    }
.
    if (filterState.sortOption === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (filterState.sortOption === "distance") {
      filtered.sort((a, b) => Number(a.distance) - Number(b.distance));
    }

    return filtered;
  }

  function reloadLunchItems() {
    lunchItems = (getStorage("lunchItems") as ILunchItem[]) ?? [];
  }

  function template<T extends ILunchItem>(items: T[]) {
    const ul = createElement("ul");
    ul.classList.add("restaurant-list");

    if (items.length > 0) {
      items.forEach((item) => {
        ul.appendChild(LunchItem(item));
      });
    } else {
      ul.innerHTML = `
      <div class="empty-info-container">
      <div class="set-default-state-btn" data-action=${ClickActions.SET_DEFAULT_STATE}>
        <svg id="Layer_1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><rect fill="#f0873c" height="470" rx="73.436" width="469.999" x="21" y="21"/><g fill-rule="evenodd"><path d="m94.437 21h323.126c40.39 0 73.436 33.046 73.436 73.436v323.128c0 16.799-5.721 32.325-15.305 44.734-12.409 9.584-27.935 15.305-44.734 15.305h-334.562c-34.148 0-62-27.852-62-62v-334.564c0-16.799 5.721-32.325 15.305-44.734 12.409-9.584 27.935-15.305 44.734-15.305z" fill="#ff954a"/><path d="m320.607 375.816h-163.281c-6.917 0-12.517 5.6-12.517 12.517s5.6 12.517 12.517 12.517h163.282c6.917 0 12.517-5.6 12.517-12.517s-5.6-12.517-12.517-12.517zm-153.776-107.145c-4.282-5.411-3.388-13.269 2.023-17.551s13.269-3.388 17.552 2.023l40.044 50.49v-160.176c0-6.917 5.6-12.47 12.517-12.47s12.517 5.552 12.517 12.47v160.176l40.044-50.49c4.282-5.411 12.14-6.305 17.552-2.023s6.353 12.14 2.023 17.551l-62.348 78.582c-2.353 3.011-5.976 4.753-9.788 4.753s-7.435-1.741-9.787-4.753l-62.348-78.582z" fill="#ed7c2b"/><path d="m337.623 365.921h-163.281c-6.917 0-12.517 5.6-12.517 12.517s5.6 12.517 12.517 12.517h163.281c6.917 0 12.517-5.6 12.517-12.517s-5.6-12.517-12.517-12.517zm-153.776-107.145c-4.282-5.411-3.388-13.27 2.023-17.551 5.411-4.282 13.269-3.388 17.551 2.023l40.044 50.49v-160.175c0-6.917 5.6-12.47 12.517-12.47s12.517 5.552 12.517 12.47v160.176l40.044-50.49c4.282-5.411 12.14-6.305 17.552-2.023 5.411 4.282 6.352 12.14 2.023 17.551l-62.348 78.582c-2.353 3.012-5.976 4.753-9.788 4.753s-7.435-1.741-9.787-4.753l-62.348-78.582z" fill="#fff"/></g></svg>
      </div>
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
    reloadLunchItems();
    const filteredItems = sortFilter(lunchItems ?? []);
    const ul = template(filteredItems);
    getHTML(lunchListID).innerHTML = "";
    getHTML(lunchListID).innerHTML = ul.outerHTML;
  }

  function renderFavorites() {
    reloadLunchItems();
    const favorites = lunchItems
      .map((item) => ({ ...item }))
      .filter((item) => item.isFavorite);

    const ul = template(favorites);
    getHTML(favoriteTargetID).innerHTML = "";
    getHTML(favoriteTargetID).appendChild(ul);
  }

  function addRestaurantItem({
    id,
    category,
    name,
    distance,
    description,
    link,
  }: ILunchItem) {
    const newItem = {
      id,
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
    updateFilterState,
  };
}
