// LocalPersistence.ts
import { RestaurantAppStorage } from ".././types";

const STORAGE_KEY = "restaurantApp";

class LocalPersistence {
  get<K extends keyof RestaurantAppStorage>(
    key: K
  ): RestaurantAppStorage[K] | null {
    const data = this.loadAll();
    if (!data) return null;

    return data[key];
  }

  set<K extends keyof RestaurantAppStorage>(
    key: K,
    value: RestaurantAppStorage[K]
  ): void {
    const data = this.loadAll();

    if (!data) {
      throw new Error("Data is not initialized");
    }

    data[key] = value;
    this.saveAll(data);
  }

  private loadAll(): RestaurantAppStorage | null {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return null;

    return JSON.parse(raw);
  }

  private saveAll(data: RestaurantAppStorage) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export default LocalPersistence;
