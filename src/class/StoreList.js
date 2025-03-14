class StoreList {
  #list;
  #filteredList;
  #filterCategory;
  #sortBy;

  constructor(data) {
    this.#list = data;
    this.#list.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    );
    this.#filteredList = data;
    this.#filterCategory = "전체";
    this.#sortBy = "name";
  }

  get list() {
    return this.#list;
  }

  get filteredList() {
    return this.#filteredList;
  }

  updateList(store) {
    this.#list.push(store);
    this.filterStoreList(this.#filterCategory);
    this.sortStoreList(this.#sortBy);
  }

  deleteStore(name) {
    this.#list = this.#list.filter((store) => store.name !== name);
  }

  filterByMenuBar(isFavorite) {
    if (!isFavorite) return this.#list;
    return this.#list.filter((store) => store.isFavorite === true);
  }

  filterByStoreName(name) {
    return this.#list.find((store) => store.name === name);
  }

  filterStoreList(category) {
    if (category === "전체") this.#filteredList = this.#list;
    else this.#filteredList = this.#list.filter((l) => l.category === category);
    this.#filterCategory = category;
  }

  sortStoreList(sortBy) {
    if (sortBy === "name")
      this.#filteredList.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      );
    if (sortBy === "distance")
      this.#filteredList.sort((a, b) => a.dist - b.dist);
    this.#sortBy = sortBy;
  }
}

export default StoreList;
