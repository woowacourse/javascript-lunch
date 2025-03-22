import { Category, IRestaurant, Sort } from "../types/types.ts";

export const storageHandler = {
  getItem: (storageKey: string) =>
    JSON.parse(localStorage.getItem(storageKey) ?? "[]") || [],
  setItem: (storageKey: string, value: IRestaurant[]) =>
    localStorage.setItem(storageKey, JSON.stringify(value)),
  addItem: (storageKey: string, value: IRestaurant) => {
    const data = storageHandler.getItem(storageKey);
    storageHandler.setItem(storageKey, [...data, value]);
  },
  deleteItem: (storageKey: string, value: string) => {
    const newData = storageHandler
      .getItem(storageKey)
      .filter((item: IRestaurant) => item.id === value);

    storageHandler.setItem(storageKey, newData);
  },
  filterItem: (
    storageKey: string,
    category: Category,
    sort: Sort,
    id: string
  ) => {
    const data = storageHandler.getItem(storageKey);
    let restaurantData;

    if (id === "all") {
      restaurantData = data;
    } else if (id === "favorite") {
      restaurantData = data.filter(
        (item: IRestaurant) => item.isFavorite === true
      );
    }

    const categoryData = storageHandler.filterByCategory(
      restaurantData,
      category
    );
    const sortData = storageHandler.filterBySort(categoryData, sort);

    return sortData;
  },
  filterByCategory: (data: IRestaurant[], category: string) => {
    if (category === "") {
      return data;
    }

    return data.filter((item: IRestaurant) => item.category === category);
  },
  filterBySort: (data: IRestaurant[], sort: string) => {
    if (sort === "") {
      return data.reverse();
    }

    if (sort === "distance") {
      return data.sort((a: IRestaurant, b: IRestaurant) => a[sort] - b[sort]);
    }

    return data.sort((a: IRestaurant, b: IRestaurant) =>
      (a[sort as keyof IRestaurant] as string).toLowerCase() <
      (b[sort as keyof IRestaurant] as string).toLowerCase()
        ? -1
        : 1
    );
  },
  updateFavorite: (storageKey: string, restaurantInfo: IRestaurant) => {
    const data = storageHandler.getItem(storageKey);

    const favoriteData = data.filter(
      (item: IRestaurant) => item.id === restaurantInfo.id
    );

    const updateData = data.map((item: IRestaurant) => {
      if (item.id === restaurantInfo.id) {
        restaurantInfo.isFavorite = !favoriteData[0].isFavorite;
        return restaurantInfo;
      }

      return item;
    });

    storageHandler.setItem(storageKey, updateData);

    return favoriteData.length > 0 ? favoriteData[0].isFavorite : null;
  },
};
