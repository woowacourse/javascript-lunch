import { Category, DistanceFromCampus, IRestaurantInfo } from '../../domain/Restaurant';
import restaurantCatalog from '../../domain/RestaurantCatalog';
import '../../css/likeStar.css';
import LikeStar from './LikeStar';

const IMG_CATEGORY = Object.freeze({
  한식: 'korean',
  아시안: 'asian',
  중식: 'chinese',
  기타: 'etc',
  양식: 'western',
  일식: 'japanese',
});

interface IInfo {
  name: string;
  distanceFromCampus: DistanceFromCampus;
  description?: string;
  isLiked: boolean;
}

class RestaurantCard extends HTMLLIElement {
  constructor(id: number) {
    super();
    this.classList.add('restaurant');
    this.setAttribute('data-id', String(id));
  }

  #render() {
    const restaurant = restaurantCatalog.restaurants[Number(this.getAttribute('data-id'))!];
    this.#executeChild(restaurant.getRestaurantInfoObject());
  }

  #executeChild({ category, name, distanceFromCampus, description, isLiked }: IRestaurantInfo) {
    const imageDiv = this.#generateImageDiv(category);
    const infoDiv = this.#generateInfoDiv({ name, distanceFromCampus, description, isLiked });
    this.append(imageDiv);
    this.append(infoDiv);
  }

  #generateImageDiv(category: Category) {
    const container = document.createElement('div');
    container.classList.add('restaurant__category');
    container.innerHTML = `<img src="./templates/category-${IMG_CATEGORY[category]}.png" alt="${category}" class="category-icon">`;
    return container;
  }

  #generateInfoDiv({ name, distanceFromCampus, description, isLiked }: IInfo) {
    const container = document.createElement('div');
    container.classList.add('restaurant__info');
    container.innerHTML = `<h3 class="restaurant__name text-subtitle">${name}</h3>
    <span class="restaurant__distance text-body">캠퍼스부터 ${distanceFromCampus}분 내</span>
    <p class="restaurant__description text-body">${description}</p>`;
    // <div class="like-star">
    //   <img src="./templates/favorite-icon-lined.png" alt="like-star"/>
    // </div>`;
    container.appendChild(new LikeStar(isLiked));
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
