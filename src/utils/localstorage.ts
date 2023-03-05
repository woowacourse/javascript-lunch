import { LocalArrayData } from "../abstracts/types";

export const setArrayToLocalStorage = (
  storageName: string,
  item: LocalArrayData
): void => {
  localStorage.setItem(storageName, JSON.stringify(item));
};

export const getArrayFromLocalStorage = (
  storageName: string
): LocalArrayData => {
  return JSON.parse(localStorage.getItem(storageName)!);
};
