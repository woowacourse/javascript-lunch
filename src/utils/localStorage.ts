import { Restaurant } from "../types/type";

export const getSavedData = (key: string) =>
  JSON.parse(<string>localStorage.getItem(key)) || [];

export const saveData = (key: string, data: Restaurant[]) =>
  localStorage.setItem(key, JSON.stringify(data));
