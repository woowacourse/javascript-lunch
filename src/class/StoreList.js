class StoreList {
  #list;
  #filteredList;

  constructor(data) {
    this.#list = data;
    this.#filteredList = data;
    this.sortStoreList("name");
  }

  get list() {
    return this.#list;
  }

  get filteredList() {
    return this.#filteredList;
  }

  updateList(store, isFavorite) {
    console.log(store);
    this.#list.push(store);
    if (isFavorite)
      this.#filteredList = this.#list.filter((store) => store.isFavorite);
    else this.#filteredList = this.#list;
    this.sortStoreList("name");
  }

  deleteStore(id, isFavorite) {
    this.#list = this.#list.filter((store) => store.id !== id);
    if (isFavorite) {
      this.#filteredList = this.#list.filter(
        (store) => store.id !== id && store.isFavorite
      );
    } else this.#filteredList = this.#list.filter((store) => store.id !== id);
    this.sortStoreList("name");
  }

  filterByMenuBar(isFavorite) {
    if (!isFavorite) return this.#list;
    else {
      this.#filteredList = this.#list.filter(
        (store) => store.isFavorite === true
      );
      return this.#filteredList;
    }
  }

  filterByStoreName(name) {
    return this.#list.find((store) => store.name === name);
  }

  filterStoreList(category, isFavorite) {
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

  sortStoreList(sortBy) {
    if (sortBy === "name")
      this.#filteredList.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      );
    if (sortBy === "distance")
      this.#filteredList.sort((a, b) => a.dist - b.dist);
  }
}

export default StoreList;
