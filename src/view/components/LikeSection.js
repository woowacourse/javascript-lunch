import '../../css/likeSection.css';
import { RESTAURANT_CATEGORY } from '../../domain/Restaurant';
import { SORT_CONDITION } from '../../domain/RestaurantCatalog';

export const [ALL_RESTAURANTS, LIKE_RESTAURANTS] = Object.freeze(['all-restaurants', 'like-restaurants']);

function changeRestaurantsCardsAttribute(newAttribute) {
  const restaurantCards = document.querySelector('.restaurant-list');
  restaurantCards.setAttribute('data-like', newAttribute);
}

function changeColorCompareValue(currentElement, value) {
  if (currentElement.value === value) {
    currentElement.classList.remove('like-section-normal');
    currentElement.classList.add('like-section-highlight');
  }
  if (currentElement.value !== value) {
    currentElement.classList.add('like-section-normal');
    currentElement.classList.remove('like-section-highlight');
  }
}

function changeLikeSectionColor(value, section) {
  for (let i = 0; i < section.children.length; i += 1) {
    const currentElement = section.children[i];
    changeColorCompareValue(currentElement, value);
  }
}

const categorySection = document.querySelector('.restaurant-filter-container');
const categorySectionClone = categorySection.cloneNode(true);

function setAttributeInLike(currentElement) {
  if (currentElement === 'like-restaurants') {
    const restaurantCards = document.querySelector('.restaurant-list');
    document.querySelector('.restaurant-filter-container').remove();
    restaurantCards.setAttribute('data-sort-select', '이름순');
    restaurantCards.setAttribute('data-category-select', '전체');
  }
}

function setAttributeInAll(currentElement) {
  if (currentElement === 'all-restaurants') {
    const main = document.querySelector('main');
    main.insertBefore(categorySectionClone, main.children[1]);
    document.getElementById('category-select').addOptions(RESTAURANT_CATEGORY);
    document.getElementById('sort-select').addOptions(SORT_CONDITION);
  }
}

function setSortAndFilterAttribute(currentElement) {
  setAttributeInLike(currentElement);
  setAttributeInAll(currentElement);
}

function handleClickLikeButton(e) {
  const clickedElement = e.target;
  const TEST_BTN_SELECTOR = 'button';
  if (clickedElement.matches(TEST_BTN_SELECTOR)) {
    const { value } = clickedElement;
    changeRestaurantsCardsAttribute(value);
    changeLikeSectionColor(value, clickedElement.parentElement);
    setSortAndFilterAttribute(value);
  }
}

function runLikeSectionLogic() {
  const likeSection = document.querySelector('.restaurant-like-container');
  likeSection?.addEventListener('click', handleClickLikeButton);
}

export default runLikeSectionLogic;
