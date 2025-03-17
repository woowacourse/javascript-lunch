import { CategoryType, Restaurant, SortByType, TabKey } from "../entities";
import { localStorageStore } from "../storage";

const STORAGE_KEYS = {
  RESTAURANTS: "restaurants",
  FAVORITE_IDS: "favoriteRestaurantIds",
  FILTERS: "filters",
  CURRENT_TAB: "currentTab",
} as const;

type Filters = {
  category: CategoryType | "ALL";
  sortBy: SortByType;
};

export const restaurantStorage = {
  get restaurants(): Restaurant[] {
    return localStorageStore.get(STORAGE_KEYS.RESTAURANTS) ?? [];
  },

  set restaurants(data: Restaurant[]) {
    localStorageStore.set(STORAGE_KEYS.RESTAURANTS, data);
  },

  get favoriteIds(): string[] {
    return localStorageStore.get(STORAGE_KEYS.FAVORITE_IDS) ?? [];
  },

  set favoriteIds(ids: string[]) {
    localStorageStore.set(STORAGE_KEYS.FAVORITE_IDS, ids);
  },

  get filters(): Filters {
    return (
      localStorageStore.get(STORAGE_KEYS.FILTERS) ?? {
        category: "ALL",
        sortBy: "NAME",
      }
    );
  },

  set filters(filters: Filters) {
    localStorageStore.set(STORAGE_KEYS.FILTERS, filters);
  },
  get currentTab(): TabKey {
    return (localStorageStore.get(STORAGE_KEYS.CURRENT_TAB) as TabKey) || "ALL";
  },
  set currentTab(tab: TabKey) {
    localStorageStore.set(STORAGE_KEYS.CURRENT_TAB, tab);
  },
};
