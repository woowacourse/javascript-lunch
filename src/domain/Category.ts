class Category {
  #name: string;
  #imageUrl: string;

  constructor(name: string, imageUrl: string) {
    this.#name = name;
    this.#imageUrl = imageUrl;
  }

  getName() {
    return this.#name;
  }
}

export default Category;
