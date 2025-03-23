import Restaurant from "../types/Restaurant.ts";
import RestaurantData from "./RestaurantData.ts";
import restaurants from "../constants/restaurants.js";

class RestaurantDataList {
  #dataList: RestaurantData[];

  constructor() {
    this.#initializeLocalStorage();
    const dataList = this.#getLocalStorage() || [];
    this.#dataList = dataList.map((data: Restaurant) => this.#createData(data));
  }

  getDataList(): Restaurant[] {
    return this.#dataList.map((restaurantData: RestaurantData) =>
      restaurantData.getData()
    );
  }

  getData(id: string): RestaurantData | undefined {
    return this.#dataList.find(
      (dataList: RestaurantData) => dataList.getId() === id
    );
  }

  addData(data: Restaurant): void {
    this.#dataList.push(this.#createData(data));
    this.#setLocalStorage(this.#dataList);
  }

  #createData(data: Restaurant): RestaurantData {
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
    const existing = localStorage.getItem("dataList");
    if (!existing || JSON.parse(existing).length === 0) {
      localStorage.setItem("dataList", JSON.stringify(restaurants));
    }
  }

  #getLocalStorage(): Restaurant[] | null {
    const dataList = localStorage.getItem("dataList");
    return dataList ? JSON.parse(dataList) : null;
  }

  #setLocalStorage(dataList: RestaurantData[]): void {
    localStorage.setItem(
      "dataList",
      JSON.stringify(dataList.map((data) => data.getData()))
    );
  }
}




const restaurantDataList = new RestaurantDataList();
export default restaurantDataList;
