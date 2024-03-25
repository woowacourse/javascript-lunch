import { Category, DistanceNumeric, IRestaurant } from '@/types/Restaurant';

import style from './RestaurantItemDetail.module.css';
import RestaurantCategoryIcon from './RestaurantCategoryIcon';
import FavoriteIcon from '../Basic/FavoriteIcon';
import MainApp from '../MainApp';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import BasicButton from '../Basic/BasicButton';
import BasicModal from '../Basic/BasicModal';
import { dom } from '@/util/dom';
import RestaurantCollection from '@/domains/entities/RestaurantCollection';

class RestaurantItemDetail extends HTMLLIElement {
  #category: Category = '기타';
  #name: string = '빈 이름';
  #distance?: DistanceNumeric;
  #description?: string;
  #link?: string;
  #isFavorite: boolean = false;

  constructor(props: IRestaurant) {
    super();

    this.#template();
    if (props !== undefined) this.setState(props);
    this.#render();
  }

  setState({ category, name, distance, description, link, isFavorite }: IRestaurant) {
    this.#category = category;
    this.#name = name;
    this.#distance = distance;
    this.#description = description ?? '';
    this.#link = link ?? '';
    this.#isFavorite = isFavorite ?? false;
  }

  #template() {
    this.classList.add(`restaurant-item-detail`, `${style.restaurant}`);
    this.innerHTML = `
    <div class="restaurant-content ${style.restaurantContent}">
      <div is="restaurant-category-icon"> </div>
      <h3 class="restaurant__name text-subtitle ${style.restaurant__name}"></h3>
      <span class="restaurant__distance text-body ${style.restaurant__distance}"></span>
      <p class="restaurant__description text-body ${style.restaurant__description}"></p>
      <a class="restaurant__link text-body ${style.restaurant__link}"></a>
    </div>
      <div class="restaurant__button-container ${style.restaurant__buttonContainer}" > </div>
      <img is="favorite-icon" class="restaurant__favorite-icon" style="width:25px; position:absolute; right:10px; top:10px;"/>

     `;

    const $buttonBox = this.querySelector('.restaurant__button-container')!;
    $buttonBox.append(
      new BasicButton('secondary', '삭제하기', 'reset', () => {
        new RestaurantDBService().remove(this.get());
        if (!(this.parentElement!.parentElement instanceof BasicModal)) return;
        this.parentElement!.parentElement.closeModal();
        dom.getElement<MainApp>(document.body, '#main-app').render();
      }),
    );
    $buttonBox.append(
      new BasicButton('primary', '닫기', 'submit', () => {
        if (!(this.parentElement!.parentElement instanceof BasicModal)) return;
        this.parentElement!.parentElement.closeModal();
      }),
    );

    this.addEventListener('click', this.#favoriteIconDBListener.bind(this));
  }

  #render() {
    const categoryIcon = dom.getElement<RestaurantCategoryIcon>(
      this,
      'div[is="restaurant-category-icon"]',
    );
    categoryIcon.setCategory(this.#category);
    dom.getElement(this, '.restaurant__name').textContent = `${this.#name}`;
    dom.getElement(this, '.restaurant__distance').textContent = `캠퍼스부터 ${this.#distance}분 내`;
    dom.getElement(this, '.restaurant__description').textContent = this.#description ?? '';
    dom.getElement<FavoriteIcon>(this, '.restaurant__favorite-icon').set(this.#isFavorite);
    const link = dom.getElement<HTMLAnchorElement>(this, '.restaurant__link');

    if (this.#link === undefined) return;
    link.setAttribute('href', this.#link);
    link.textContent = this.#link;
  }

  get(): IRestaurant {
    return {
      category: this.#category,
      name: this.#name,
      distance: this.#distance!,
      description: this.#description,
      link: this.#link,
      isFavorite: this.#isFavorite,
    };
  }

  #favoriteIconDBListener(event: Event) {
    if (!(event.target instanceof FavoriteIcon)) return;

    this.#isFavorite = event.target.getAttribute('clicked') === 'on';
    const newRestaurants: IRestaurant[] = new RestaurantDBService().get();
    new RestaurantDBService().set(new RestaurantCollection(newRestaurants).update(this.get()));

    dom.getElement<MainApp>(document.body, '.main-app-new').render();
  }
}

export default RestaurantItemDetail;

customElements.define('restaurant-item-detail', RestaurantItemDetail, { extends: 'li' });
