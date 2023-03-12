import IRestaurant from "../type/IRestaurant";

const makeArray = (json: string) => {
  const arr = JSON.parse(json);
  try {
    if (Array.isArray(arr)) {
      return arr ?? [];
    }
    return [];
  } catch (err) {
    return [];
  }
};

const Storage = {
  loadRestaurants(): IRestaurant[] {
    const json = localStorage.getItem("restaurants");
    if (json === null) {
      return [];
    }
    return makeArray(json);
  },
  saveRestaurants(value: IRestaurant[]) {
    const json = JSON.stringify(value);
    localStorage.setItem("restaurants", json);
  },
};
export default Storage;
