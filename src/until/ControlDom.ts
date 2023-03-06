import { Template } from "../Template";
import { RestaurantType, CategoryType, TakeTimeType } from "../Template";
import { MakeNewList } from "./MakeNewList";

export const $ = (element: string) => document.querySelector(element);

export const BottomSheet = {
  getInfo() {
    const form = new FormData($("form") as HTMLFormElement);
    const restaurantValue: string[] = [];
    form.forEach((each) => restaurantValue.push(each.toString()));
    $("form");

    return {
      category: restaurantValue[0] as CategoryType,
      name: restaurantValue[1],
      takeTime: Number(restaurantValue[2]) as TakeTimeType,
      description: restaurantValue[3],
      link: restaurantValue[4],
    };
  },

  reset() {
    const form = $("form") as HTMLFormElement;
    form.reset();
  },

  toggle() {
    const bottomSheetElem = $(".bottomSheet");
    bottomSheetElem?.classList.toggle("bottomSheet--open");
  },
};

export const Render = {
  restaurantList(restaurantList: RestaurantType[]): void {
    const restaurantListContainer = $(
      ".restaurant-list-container"
    ) as HTMLDataListElement;
    restaurantListContainer.innerHTML = Template.restaurantList(restaurantList);
  },
};

export const FilterSort = {
  setState() {
    const filter = $("#category-filter") as HTMLSelectElement;
    const sortBy = $("#sorting-filter") as HTMLSelectElement;

    MakeNewList.filterState = filter.options[filter.selectedIndex].value;
    MakeNewList.sortState = sortBy.options[sortBy.selectedIndex].value;
  },
};
