// import { Template } from "../Template";
import { RestaurantType, CategoryType, TakeTimeType } from "../Template";
import { MakeNewList } from "../domain/MakeNewList";
import { RestaurantList } from "../components/MainPage/RestaurantList";

export const $ = (element: string) => document.querySelector(element);
let id = 9;

export const BottomSheetForm = {
  getInfo() {
    id++;
    const form = new FormData($("form") as HTMLFormElement);
    const restaurantValue: string[] = [];
    form.forEach((each) => restaurantValue.push(each.toString()));

    return {
      id: id,
      category: restaurantValue[0] as CategoryType,
      name: restaurantValue[1],
      takeTime: Number(restaurantValue[2]) as TakeTimeType,
      like: false,
      description: restaurantValue[3],
      link: restaurantValue[4],
    };
  },

  reset() {
    const form = $("form") as HTMLFormElement;
    form.reset();
  },

  showClose(elem: HTMLElement, message: string) {
    elem?.classList.toggle(message);
  },
};

export const Render = {
  restaurantList(restaurantList: RestaurantType[]): void {
    const restaurantListContainer = $(
      ".restaurant-list-container"
    ) as HTMLDataListElement;
    restaurantListContainer.innerHTML = RestaurantList.template(restaurantList);
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
