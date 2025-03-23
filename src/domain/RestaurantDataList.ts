import RestaurantDataType from "../types/RestaurantDTO.ts";
import RestaurantData from "./RestaurantData.ts";
import restaurants from "../constants/restaurants.js";

const LOCAL_STORAGE_KEY = "dataList";

class RestaurantDataList {
  #dataList: RestaurantData[];

  constructor() {
    this.#initializeLocalStorage();
    const dataList = this.#getLocalStorage() || [];
    this.#dataList = dataList.map((data: RestaurantDataType) => this.#createData(data));
  }

  getDataList(): RestaurantDataType[] {
    return this.#dataList.map((restaurantData: RestaurantData) =>
      restaurantData.getData()
    );
  }

  getData(id: string): RestaurantData | undefined {
    return this.#dataList.find(
      (dataList: RestaurantData) => dataList.getId() === id
    );
  }

  addData(data: RestaurantDataType): void {
    this.#dataList.push(this.#createData(data));
    this.#setLocalStorage(this.#dataList);
  }

  #createData(data: RestaurantDataType): RestaurantData {
    return new RestaurantData(data);
  }

  updateIsWish(id: string): boolean | undefined {
    const filteredData = this.getData(id);
    if (!filteredData) return undefined;

    filteredData.toggleIsWish();
    this.#setLocalStorage(this.#dataList);
    return filteredData.isWish;
  }

  deleteDataList(id: string): void {
    this.#dataList = this.#dataList.filter(
      (data: RestaurantData) => data.getId() !== id
    );
    this.#setLocalStorage(this.#dataList);
  }

  #initializeLocalStorage(): void {
    const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!existing || JSON.parse(existing).length === 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(restaurants));
    }
  }

  #getLocalStorage(): RestaurantDataType[] | null {
    const dataList = localStorage.getItem(LOCAL_STORAGE_KEY);
    return dataList ? JSON.parse(dataList) : null;
  }

  #setLocalStorage(dataList: RestaurantData[]): void {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(dataList.map((data) => data.getData()))
    );
  }
}




const restaurantDataList = new RestaurantDataList();
export default restaurantDataList;
