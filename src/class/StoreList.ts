import IList from "../interfaces/IList.interface";

class StoreList {
  #list: IList[];
  #filteredList: IList[];
  #sortBy: string;

  constructor(data: IList[]) {
    this.#list = data;
    this.#filteredList = data;
    this.#sortBy = "name";
    this.sortStoreList(this.#sortBy);
  }

  get list(): IList[] {
    return this.#list;
  }

  get filteredList(): IList[] {
    return this.#filteredList;
  }

  updateList(store: IList, isFavorite: boolean) {
    this.#list.push(store);
    if (isFavorite)
      this.#filteredList = this.#list.filter((store) => store.isFavorite);
    else this.#filteredList = this.#list;
    this.sortStoreList(this.#sortBy);
  }

  updateIsFavorite(id: string) {
    this.#list = this.#list.map((store) => {
      if (store.id === id) !store.isFavorite;
      return store;
    });
    this.#filteredList = this.#filteredList.map((store) => {
      if (store.id === id) !store.isFavorite;
      return store;
    });
  }

  deleteStore(id: string, isFavorite: boolean) {
    this.#list = this.#list.filter((store) => store.id !== id);
    if (isFavorite) {
      this.#filteredList = this.#list.filter(
        (store) => store.id !== id && store.isFavorite
      );
    } else this.#filteredList = this.#list.filter((store) => store.id !== id);
    this.sortStoreList(this.#sortBy);
  }

  filterByMenuBar(isFavorite: boolean) {
    if (!isFavorite) this.#filteredList = this.#list;
    else {
      this.#filteredList = this.#list.filter(
        (store) => store.isFavorite === true
      );
    }
    this.sortStoreList(this.#sortBy);
  }

  filterByStoreName(name: string): IList | undefined {
    return this.#list.find((store) => store.name === name);
  }

  filterStoreList(category: string, isFavorite: boolean) {
    if (isFavorite) {
      if (category === "전체")
        this.#filteredList = this.#list.filter((store) => store.isFavorite);
      else
        this.#filteredList = this.#list.filter(
          (l) => l.category === category && l.isFavorite
        );
      return;
    }
    if (category === "전체") this.#filteredList = this.#list;
    else this.#filteredList = this.#list.filter((l) => l.category === category);
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
