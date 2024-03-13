import '../../css/likeSection.css';

export const [ALL_RESTAURANTS, LIKE_RESTAURANTS] = Object.freeze(['all-restaurants', 'like-restaurants']);

function changeRestaurantsCardsAttribute(newAttribute) {
  const restaurantCards = document.querySelector('.restaurant-list');
  restaurantCards.setAttribute('data-like', newAttribute);
}

function handleClickLikeButton(e) {
  const clickedElement = e.target;
  const TEST_BTN_SELECTOR = 'button';
  if (clickedElement.matches(TEST_BTN_SELECTOR)) {
    const { value } = clickedElement;
    // TODO: RestaurantsCards 어트리뷰트 변경.
    changeRestaurantsCardsAttribute(value);
    // TODO: LikeSection CSS 색상 변경
  }
}

function runLikeSectionLogic() {
  const likeSection = document.querySelector('.restaurant-like-container');
  likeSection?.addEventListener('click', handleClickLikeButton);
}

export default runLikeSectionLogic;
