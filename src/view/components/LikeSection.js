import '../../css/likeSection.css';

export const [ALL_RESTAURANTS, LIKE_RESTAURANTS] = Object.freeze(['all-restaurants', 'like-restaurants']);

function changeRestaurantsCardsAttribute(newAttribute) {
  const restaurantCards = document.querySelector('.restaurant-list');
  restaurantCards.setAttribute('data-like', newAttribute);
}

function changeLikeSectionColor(value, section) {
  for (let i = 0; i < section.children.length; i += 1) {
    const currentElement = section.children[i];
    if (currentElement.value === value) {
      currentElement.classList.remove('like-section-normal');
      currentElement.classList.add('like-section-highlight');
    }
    if (currentElement.value !== value) {
      currentElement.classList.add('like-section-normal');
      currentElement.classList.remove('like-section-highlight');
    }
  }
}

function handleClickLikeButton(e) {
  const clickedElement = e.target;
  const TEST_BTN_SELECTOR = 'button';
  if (clickedElement.matches(TEST_BTN_SELECTOR)) {
    const { value } = clickedElement;
    // TODO: RestaurantsCards 어트리뷰트 변경.
    changeRestaurantsCardsAttribute(value);
    // TODO: LikeSection CSS 색상 변경
    changeLikeSectionColor(value, clickedElement.parentElement);
  }
}

function runLikeSectionLogic() {
  const likeSection = document.querySelector('.restaurant-like-container');
  likeSection?.addEventListener('click', handleClickLikeButton);
}

export default runLikeSectionLogic;
