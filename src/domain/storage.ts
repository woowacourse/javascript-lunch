import Restaurant from "./Restaurant";
import {
  CategoryFilter,
  NameOrDistanceFilter,
  RestaurantValue,
  TabInfo,
} from "./types";

const STORAGE_KEY = "restaurantApp";

type RestaurantAppStorage = {
  restaurantList?: RestaurantValue[];
  category?: CategoryFilter;
  nameOrDistance?: NameOrDistanceFilter;
  tabInfo?: TabInfo;
};

const storage = {
  _loadAll(): RestaurantAppStorage {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  },

  _saveAll(data: RestaurantAppStorage) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  saveRestaurantList(value: Restaurant[]) {
    const restaurantList = value.map((restaurant) => restaurant.value);
    const data = this._loadAll();
    data.restaurantList = restaurantList;
    this._saveAll(data);
  },

  loadRestaurantList(): RestaurantValue[] | null {
    const data = this._loadAll();
    return data.restaurantList ?? null;
  },

  saveCategory(value: CategoryFilter) {
    const data = this._loadAll();
    data.category = value;
    this._saveAll(data);
  },

  loadCategory(): CategoryFilter | null {
    const data = this._loadAll();
    return data.category ?? null;
  },

  saveNameOrDistance(value: NameOrDistanceFilter) {
    const data = this._loadAll();
    data.nameOrDistance = value;
    this._saveAll(data);
  },

  loadNameOrDistance(): NameOrDistanceFilter | null {
    const data = this._loadAll();
    return data.nameOrDistance ?? null;
  },

  saveTabInfo(value: TabInfo) {
    const data = this._loadAll();
    data.tabInfo = value;
    this._saveAll(data);
  },

  loadTabInfo(): TabInfo | null {
    const data = this._loadAll();
    return data.tabInfo ?? null;
  },
};

export default storage;
