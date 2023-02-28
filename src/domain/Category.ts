class Category {
  #name: string;

  #imageUrl: string;

  constructor(name: string, image: string) {
    this.#name = name;
    this.#imageUrl = image;
  }
}

export default Category;
