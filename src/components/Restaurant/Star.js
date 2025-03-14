class Star {
  #star;
  #like;
  #onRestaurantUpdate;
  restaurant;

  constructor(restaurant, onRestaurantUpdate) {
    this.restaurant = restaurant;
    this.#onRestaurantUpdate = onRestaurantUpdate;
    this.#like = restaurant.getLike();
    this.#createStar();
    this.#bindEvent();
  }

  #createStar() {
    const star = document.createElement('button');
    star.classList.add('star-icon');
    this.#like ? star.classList.add('like') : star.classList.add('unlike');
    this.#star = star;
  }

  #toggle(like) {
    if (like) {
      this.#star.classList.remove('unlike');
      this.#star.classList.add('like');
    } else {
      this.#star.classList.remove('like');
      this.#star.classList.add('unlike');
    }
  }

  #bindEvent = () => {
    this.#star.addEventListener('click', () => {
      this.#like = !this.#like;
      this.restaurant.setLike(this.#like);
      this.#toggle(this.#like);
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
