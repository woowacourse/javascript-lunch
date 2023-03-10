class CustomStorage<T> {
  #key;
  #defaultValue;

  constructor(key: string, defaultValue: T) {
    this.#key = key;
    this.#defaultValue = defaultValue;
  }

  getValue() {
    const value = localStorage.getItem(this.#key);
    return value ? JSON.parse(value) : this.#defaultValue;
  }

  setValue(value: T) {
    localStorage.setItem(this.#key, JSON.stringify(value));
  }
}

export default CustomStorage;
