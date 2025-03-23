import { STORAGE_KEYS } from "../consts";
import Restaurant from "../Restaurant";
import {
  CategoryFilter,
  NameOrDistanceFilter,
  RestaurantAppStorage,
  TabInfo,
} from "../types";
import LocalPersistence from "./LocalPersistence";

interface PersistenceStrategy {
  init(): void;
  set<K extends keyof RestaurantAppStorage>(
    key: K,
    value: RestaurantAppStorage[K]
  ): void;
  get<K extends keyof RestaurantAppStorage>(
    key: K
  ): RestaurantAppStorage[K] | null;
}

class Persistence {
  #persistenceStrategy: PersistenceStrategy;

  constructor(persistenceStrategy: PersistenceStrategy) {
    this.#persistenceStrategy = persistenceStrategy;
  }

  isEmpty() {
    if (this.#persistenceStrategy.get(STORAGE_KEYS.RESTAURANT_LIST) === null) {
      return true;
    }
    return false;
  }

  init() {
    if (this.#persistenceStrategy.get(STORAGE_KEYS.RESTAURANT_LIST)) {
      return;
    }

    this.#persistenceStrategy.init();
  }

  saveRestaurantList(restaurants: Restaurant[]) {
    const values = restaurants.map((r) => r.value);
    this.#persistenceStrategy.set(STORAGE_KEYS.RESTAURANT_LIST, values);
  }

  loadRestaurantList(): Restaurant[] | null {
    const restaurantListValue = this.#persistenceStrategy.get(
      STORAGE_KEYS.RESTAURANT_LIST
    );
    if (restaurantListValue === null) return null;

    return restaurantListValue.map(Restaurant.of);
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
