class LocalStorage {
  #localStorage;

  constructor() {
    this.#localStorage = window.localStorage;
  }

  get localStorage() {
    return this.#localStorage;
  }
}

export default LocalStorage;
