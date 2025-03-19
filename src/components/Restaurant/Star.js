class Star {
  #star;
  #isLiked;
  #onRestaurantUpdate;
  restaurant;

  constructor(restaurant, onRestaurantUpdate) {
    this.restaurant = restaurant;
    this.#onRestaurantUpdate = onRestaurantUpdate;
    this.#isLiked = restaurant.getIsLiked();
    this.#createStar();
    this.#bindEvent();
  }

  #createStar() {
    const star = document.createElement('button');
    star.classList.add('star-icon');
    this.#isLiked ? star.classList.add('like') : star.classList.add('unlike');
    this.#star = star;
  }

  #toggle(isLiked) {
    if (isLiked) {
      this.#star.classList.remove('unlike');
      this.#star.classList.add('like');
    } else {
      this.#star.classList.remove('like');
      this.#star.classList.add('unlike');
    }
  }

  #bindEvent = () => {
    this.#star.addEventListener('click', () => {
      this.#isLiked = !this.#isLiked;
      this.restaurant.setIsLiked(this.#isLiked);
      this.#toggle(this.#isLiked);
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
