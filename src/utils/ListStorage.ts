class ListStorage<T> {
  #key;

  constructor(key: string) {
    this.#key = key;
  }

  getList() {
    return JSON.parse(localStorage.getItem(this.#key) ?? '[]');
  }

  setList(list: T[]) {
    localStorage.setItem(this.#key, JSON.stringify(list));
  }
}

export default ListStorage;
