import { Category, IMG_CATEGORY, IRestaurantInfo } from '../../domain/Restaurant';
import restaurantCatalog from '../../domain/RestaurantCatalog';

import { showRestaurantDetailModal } from './RestaurantDetailModal';

import LikeStar from './LikeStar';
import '../../css/likeStar.css';

class RestaurantCard extends HTMLLIElement {
  constructor(id: number) {
    super();
    this.classList.add('restaurant');
    this.setAttribute('data-id', String(id));
  }

  connectedCallback() {
    this.addEventListener('click', () => {
      const restaurantInfo = restaurantCatalog.getSpecificRestaurantInfo(Number(this.getAttribute('data-id'))!);
      showRestaurantDetailModal(restaurantInfo!);
    });
  }

  #render() {
    const restaurantInfo = restaurantCatalog.getSpecificRestaurantInfo(Number(this.getAttribute('data-id'))!);
    if (restaurantInfo) this.#executeChild(restaurantInfo);
  }

  #executeChild({ category, name, distanceFromCampus, description, isLiked, id }: IRestaurantInfo) {
    const imageDiv = this.#generateImageDiv(category);
    const infoDiv = this.#generateInfoDiv({ name, distanceFromCampus, description, isLiked, id });
    this.append(imageDiv);
    this.append(infoDiv);
  }

  #generateImageDiv(category: Category) {
    const container = document.createElement('div');
    container.classList.add('restaurant__category');
    container.innerHTML = `<img src="./templates/category-${IMG_CATEGORY[category]}.png" alt="${category}" class="category-icon">`;
    return container;
  }

  #generateInfoDiv({ name, distanceFromCampus, description, isLiked, id }: Omit<IRestaurantInfo, 'category'>) {
    const container = document.createElement('div');
    container.classList.add('restaurant__info');
    container.innerHTML = `<h3 class="restaurant__name text-subtitle">${name}</h3>
    <span class="restaurant__distance text-body">캠퍼스부터 ${distanceFromCampus}분 내</span>
    <p class="restaurant__description text-body">${description}</p>`;
    container.appendChild(new LikeStar(isLiked!, id!));
    return container;
  }

  static get observedAttributes() {
    return ['data-id'];
  }

  attributeChangedCallback() {
    this.innerHTML = '';
    this.#render();
  }
}

export default RestaurantCard;
