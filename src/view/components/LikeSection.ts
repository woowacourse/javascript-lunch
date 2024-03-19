import '../../css/likeSection.css';
import { addOptionsToSelect } from './Dropdown';

export const [ALL_RESTAURANTS, LIKE_RESTAURANTS] = ['all-restaurants', 'like-restaurants'] as const;

function changeRestaurantsCardsAttribute(newAttribute: string) {
  const restaurantCards = document.querySelector('.restaurant-list') as HTMLElement;
  restaurantCards.setAttribute('data-like', newAttribute);
}

function changeColorCompareValue(currentElement: HTMLElement & { value: string }, value: string) {
  if (currentElement?.value && currentElement.value === value) {
    currentElement.classList.remove('like-section-normal');
    currentElement.classList.add('like-section-highlight');
  }
  if (currentElement.value !== value) {
    currentElement.classList.add('like-section-normal');
    currentElement.classList.remove('like-section-highlight');
  }
}

function changeLikeSectionColor(value: string, section: HTMLElement) {
  for (let i = 0; i < section.children.length; i += 1) {
    const currentElement = section.children[i] as HTMLElement & { value: string };
    changeColorCompareValue(currentElement, value);
  }
}

function setAttributeInLike(currentValue: string) {
  if (currentValue === 'like-restaurants') {
    const restaurantCards = document.querySelector('.restaurant-list') as HTMLElement;
    const categorySection = document.querySelector('.restaurant-filter-container') as HTMLElement;
    categorySection.remove();
    restaurantCards.setAttribute('data-sort-select', '이름순');
    restaurantCards.setAttribute('data-category-select', '전체');
  }
}

const categorySection = document.querySelector('.restaurant-filter-container');
const categorySectionClone = categorySection?.cloneNode(true)!;

function setAttributeInAll(currentValue: string) {
  if (currentValue === 'all-restaurants') {
    const main = document.querySelector('main') as HTMLElement;
    main.insertBefore(categorySectionClone, main.children[1]);
    addOptionsToSelect();
  }
}

function setSortAndFilterAttribute(currentElement: string) {
  setAttributeInLike(currentElement);
  setAttributeInAll(currentElement);
}

function handleClickLikeButton(e: Event) {
  const clickedElement = e.target as HTMLElement & { value: string };
  const TEST_BTN_SELECTOR = 'button';
  if (clickedElement?.matches(TEST_BTN_SELECTOR)) {
    const { value } = clickedElement;
    changeRestaurantsCardsAttribute(value);
    changeLikeSectionColor(value, clickedElement.parentElement!);
    setSortAndFilterAttribute(value);
  }
}

function runLikeSectionLogic() {
  const likeSection = document.querySelector('.restaurant-like-container');
  likeSection?.addEventListener('click', handleClickLikeButton);
}

export default runLikeSectionLogic;
