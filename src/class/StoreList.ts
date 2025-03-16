import options from "../constants/options";
import IList from "../interfaces/IList.interface";

class StoreList {
  #list: IList[];
  #filteredList: IList[];
  #category: string;
  #sortBy: string;

  constructor(data: IList[]) {
    this.#list = data;
    this.#filteredList = data;
    this.#category = Object.keys(options.sortCategory)[0];
    this.#sortBy = Object.keys(options.sortFilter)[0];
    this.sortStoreList(this.#sortBy);
  }

  get list(): IList[] {
    return this.#list;
  }

  get filteredList(): IList[] {
    return this.#filteredList;
  }

  updateList(store: IList) {
    this.#list.push(store);
    this.sortStoreList(this.#sortBy);
  }

  updateIsFavorite(id: string, isFavorite: boolean) {
    this.#list = this.#list.map((store) => {
      if (store.id === id) !store.isFavorite;
      return store;
    });
    this.filterStoreList(this.#category, isFavorite);
    this.sortStoreList(this.#sortBy);
  }

  deleteStore(id: string, isFavorite: boolean) {
    this.#list = this.#list.filter((store) => store.id !== id);
    this.filterStoreList(Object.keys(options.sortCategory)[0], isFavorite);
    this.sortStoreList(Object.keys(options.sortFilter)[0]);
  }

  filterByMenuBar(isFavorite: boolean) {
    this.filterStoreList(Object.keys(options.sortCategory)[0], isFavorite);
    this.sortStoreList(Object.keys(options.sortFilter)[0]);
  }

  filterByStoreId(id: string): IList | undefined {
    return this.#list.find((store) => store.id === id);
  }

  filterStoreList(category: string, isFavorite: boolean) {
    if (isFavorite) {
      if (category === "전체")
        this.#filteredList = this.#list.filter((store) => store.isFavorite);
      else
        this.#filteredList = this.#list.filter(
          (l) => l.category === category && l.isFavorite
        );
      this.#category = category;
      return;
    }
    if (category === "전체") this.#filteredList = this.#list;
    else this.#filteredList = this.#list.filter((l) => l.category === category);
    this.#category = category;
  }

  sortStoreList(sortBy: string) {
    if (sortBy === "name")
      this.#filteredList.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      );
    if (sortBy === "distance")
      this.#filteredList.sort((a, b) => Number(a.dist) - Number(b.dist));
    this.#sortBy = sortBy;
  }
}

export default StoreList;
