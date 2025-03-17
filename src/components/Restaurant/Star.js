class Star {
  #star;
  #isLike;
  #onRestaurantUpdate;
  restaurant;

  constructor(restaurant, onRestaurantUpdate) {
    this.restaurant = restaurant;
    this.#onRestaurantUpdate = onRestaurantUpdate;
    this.#isLike = restaurant.getIsLike();
    this.#createStar();
    this.#bindEvent();
  }

  #createStar() {
    const star = document.createElement('button');
    star.classList.add('star-icon');
    this.#isLike ? star.classList.add('like') : star.classList.add('unlike');
    this.#star = star;
  }

  #toggle(isLike) {
    if (isLike) {
      this.#star.classList.remove('unlike');
      this.#star.classList.add('like');
    } else {
      this.#star.classList.remove('like');
      this.#star.classList.add('unlike');
    }
  }

  #bindEvent = () => {
    this.#star.addEventListener('click', () => {
      this.#isLike = !this.#isLike;
      this.restaurant.setIsLike(this.#isLike);
      this.#toggle(this.#isLike);
      if (this.#onRestaurantUpdate) {
        this.#onRestaurantUpdate();
      }
    });
  };

  getElement() {
    return this.#star;
  }
}

export default Star;
