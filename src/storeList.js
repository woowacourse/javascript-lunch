class StoreList {
  #list;

  constructor(data) {
    this.#list = data;
  }

  get list() {
    return this.#list;
  }

  updateList(store) {
    this.#list.push(store);
  }
}

export default StoreList;
