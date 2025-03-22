import { STORAGE_KEYS } from "../consts";
import Restaurant from "../Restaurant";
import {
  CategoryFilter,
  NameOrDistanceFilter,
  RestaurantAppStorage,
  RestaurantValue,
  TabInfo,
} from "../types";
import LocalPersistence from "./LocalPersistence";

interface PersistenceStrategy {
  set<K extends keyof RestaurantAppStorage>(
    key: K,
    value: RestaurantAppStorage[K]
  ): void;
  get<K extends keyof RestaurantAppStorage>(
    key: K
  ): RestaurantAppStorage[K] | null;
}

class Persistence {
  #persistenceStrategy;
  constructor(persistenceStrategy: PersistenceStrategy) {
    this.#persistenceStrategy = persistenceStrategy;
  }

  init(initData: RestaurantAppStorage) {
    if (this.#persistenceStrategy.get(STORAGE_KEYS.RESTAURANT_LIST)) {
      return;
    }

    this.#persistenceStrategy.set(
      STORAGE_KEYS.RESTAURANT_LIST,
      initData.restaurantList
    );
    this.#persistenceStrategy.set(STORAGE_KEYS.CATEGORY, initData.category);
    this.#persistenceStrategy.set(
      STORAGE_KEYS.NAME_OR_DISTANCE,
      initData.nameOrDistance
    );
    this.#persistenceStrategy.set(STORAGE_KEYS.TAB_INFO, initData.tabInfo);
  }

  saveRestaurantList(restaurants: Restaurant[]) {
    const values = restaurants.map((r) => r.value);
    this.#persistenceStrategy.set(STORAGE_KEYS.RESTAURANT_LIST, values);
  }

  loadRestaurantList(): RestaurantValue[] | null {
    return this.#persistenceStrategy.get(STORAGE_KEYS.RESTAURANT_LIST);
  }

  saveCategory(category: CategoryFilter) {
    this.#persistenceStrategy.set(STORAGE_KEYS.CATEGORY, category);
  }

  loadCategory(): CategoryFilter | null {
    return this.#persistenceStrategy.get(STORAGE_KEYS.CATEGORY);
  }

  saveNameOrDistance(filter: NameOrDistanceFilter) {
    this.#persistenceStrategy.set(STORAGE_KEYS.NAME_OR_DISTANCE, filter);
  }

  loadNameOrDistance(): NameOrDistanceFilter | null {
    return this.#persistenceStrategy.get(STORAGE_KEYS.NAME_OR_DISTANCE);
  }

  saveTabInfo(tabInfo: TabInfo) {
    this.#persistenceStrategy.set(STORAGE_KEYS.TAB_INFO, tabInfo);
  }

  loadTabInfo(): TabInfo | null {
    return this.#persistenceStrategy.get(STORAGE_KEYS.TAB_INFO);
  }
}

export default new Persistence(new LocalPersistence());
