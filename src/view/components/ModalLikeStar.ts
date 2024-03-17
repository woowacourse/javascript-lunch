import LikeStar from './LikeStar';

class ModalLikeStar extends LikeStar {
  constructor(isLiked: boolean, id: number) {
    super(isLiked, id);
    this.id = String(id);
    this.addEventListener('click', this.#clickHandler);
  }

  #clickHandler() {
    const targetCard = document.querySelector(`.restaurant[data-id="${this.id}"]`);
    const targetStar = targetCard?.querySelector('like-star');
    const attributeName = 'data-is-liked';
    const isLikedPrev = targetStar?.getAttribute(attributeName);
    targetStar?.setAttribute(attributeName, isLikedPrev === 'false' ? 'true' : 'false');
  }
}

export default ModalLikeStar;
