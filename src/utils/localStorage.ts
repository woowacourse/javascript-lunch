import { Restaurant } from "../type/type";

export const getSavedData = (key: string) =>
  JSON.parse(localStorage.getItem(key) as string) || [];

export const saveData = (key: string, data: Restaurant[]) =>
  localStorage.setItem(key, JSON.stringify(data));
