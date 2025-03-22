class Restaurant {
  #name: string;
  #distance: string;
  #category: string;
  #description: string;
  #link: string;
  #isFavorite: boolean;

  constructor(
    name: string,
    distance: string,
    category: string,
    description: string = '',
    link: string = '',
    isFavorite: boolean = false,
  ) {
    this.#name = name;
    this.#distance = distance;
    this.#category = category;
    this.#description = description;
    this.#link = link;
    this.#isFavorite = isFavorite;
  }

  getName(): string {
    return String(this.#name);
  }

  getDistance(): string {
    return String(this.#distance);
  }

  getCategory(): string {
    return String(this.#category);
  }

  getDescription(): string {
    return String(this.#description);
  }

  getLink(): string {
    return String(this.#link);
  }

  isFavorite(): boolean {
    return this.#isFavorite;
  }

  toggleFavorite(): void {
    this.#isFavorite = !this.#isFavorite;
  }
}

export default Restaurant;
