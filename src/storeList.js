class StoreList {
  #list;
  #filteredList;

  constructor(data) {
    this.#list = data;
    this.#list.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    );
    this.#filteredList = data;
  }

  get list() {
    return this.#list;
  }

  get filteredList() {
    return this.#filteredList;
  }

  updateList(store) {
    this.#list.push(store);
  }

  filterStoreList(category) {
    if (category === "전체") this.#filteredList = this.#list;
    else this.#filteredList = this.#list.filter((l) => l.category === category);
  }

  sortStoreList(sortBy) {
    if (sortBy === "name")
      this.#filteredList.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      );
    console.log(this.#filteredList);
    if (sortBy === "distance")
      this.#filteredList.sort((a, b) => a.dist - b.dist);
  }
}

export default StoreList;
