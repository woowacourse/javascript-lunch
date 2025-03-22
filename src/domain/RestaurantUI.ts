import { RestaurantProp, Values } from "../../types/types";
import restaurantDataList, { RestaurantList } from "./RestaurantList";

export const VIEW_STATE = {
  all: "모든 음식점",
  favorite: "자주 가는 음식점",
} as const;

const CATEGORY = {
  all: "전체",
  korean: "한식",
  chinese: "중식",
  japanese: "일식",
  western: "양식",
  asian: "아시안",
  etc: "기타",
} as const;

const SORTED = {
  name: "name",
  distance: "distance",
} as const;

class RestaurantUI {
  private restaurantList: RestaurantList;
  private subscribers: ((data: RestaurantProp[]) => void)[] = [];
  private viewState: Values<typeof VIEW_STATE> = VIEW_STATE.all;
  private sortedFlag: Values<typeof SORTED> = SORTED.name;
  private category: Values<typeof CATEGORY> = CATEGORY.all;

  constructor(restaurantList: RestaurantList) {
    this.restaurantList = restaurantList;
  }

  setViewState(viewState: Values<typeof VIEW_STATE>) {
    this.viewState = viewState;
  }

  setCategory(category: Values<typeof CATEGORY>) {
    this.category = category;
  }

  setSortedFlag(sortedFlag: Values<typeof SORTED>) {
    this.sortedFlag = sortedFlag;
  }

  renderRestaurantList() {
    const restaurantDataList =
      this.viewState === VIEW_STATE.favorite
        ? this.restaurantList.getFavoriteRestaurantList()
        : this.restaurantList.getDataList();

    if (this.category === CATEGORY.all) {
      this.notify(sortRestaurantList(restaurantDataList, this.sortedFlag));
      return;
    }

    const filteredList = filerByCategory(restaurantDataList, this.category);
    const sortedFilteredList = sortRestaurantList(
      filteredList,
      this.sortedFlag
    );
    this.notify(sortedFilteredList);
  }

  subscribe(callback: (data: RestaurantProp[]) => void) {
    this.subscribers.push(callback);
  }

  notify(data: RestaurantProp[]) {
    this.subscribers.forEach((callback) => callback(data));
  }
}

function filerByCategory(
  dataList: RestaurantProp[],
  category: Values<typeof CATEGORY>
) {
  return dataList.filter((data) => data.category === category);
}

function sortRestaurantList(
  dataList: RestaurantProp[],
  sortedFlag: Values<typeof SORTED>
) {
  const sortFunctions: Record<
    Values<typeof SORTED>,
    (a: RestaurantProp, b: RestaurantProp) => number
  > = {
    [SORTED.distance]: (a, b) => a.distance - b.distance,
    [SORTED.name]: (a, b) => a.name.localeCompare(b.name, "ko"),
  };

  return dataList.sort(sortFunctions[sortedFlag]);
}

const restaurantUI = new RestaurantUI(restaurantDataList);
export default restaurantUI;
