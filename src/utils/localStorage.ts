import { Constants } from "@/constant/Restaurant";
import { mockData } from "@/data/mockData";
import { Restaurant } from "@/type/type";

export const saveMockData = () => {
  saveData(Constants.RESTAURANT_LIST, mockData);
};

export const getSavedData = (key: string) =>
  JSON.parse(localStorage.getItem(key) as string) || [];

export const saveData = (key: string, data: Restaurant[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};
