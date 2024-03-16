import { Category, DistanceNumeric, IRestaurant } from '@/types/Restaurant';

import style from './RestaurantItemDetail.module.css';
import RestaurantCategoryIcon from '../Basic/RestaurantCategoryIcon/RestaurantCategoryIcon';
import FavoriteIcon from '../Basic/FavoriteIcon';
import MainApp from '../MainApp';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import Restaurant from '@/domains/entities/Restaurant';
import BasicButton from '../Basic/BasicButton/BasicButton';
import BasicModal from '../Basic/BasicModal/BasicModal';

class RestaurantItemDetail extends HTMLLIElement {
  #category: Category = '기타';
  #name: string = '빈 이름';
  #distance?: DistanceNumeric;
  #description?: string;
  #link?: string;
  #isFavorite: boolean = false;

  constructor(props?: IRestaurant) {
    super();

    this.template();
    if (props) {
      this.setState(props);
    }
    this.render();
  }

  setState({ category, name, distance, description, link, isFavorite }: IRestaurant) {
    this.#category = category;
    this.#name = name;
    this.#distance = distance;
    this.#description = description ?? '';
    this.#link = link ?? '';
    this.#isFavorite = isFavorite ?? false;
    this.render();
  }

  template() {
    this.classList.add(`restaurant-item-detail`, `${style.restaurant}`);
    this.innerHTML = `
      <div is="restaurant-category-icon"> </div>
      <h3 class="restaurant__name text-subtitle ${style.restaurant__name}"></h3>
      <span class="restaurant__distance text-body ${style.restaurant__distance}"></span>
      <p class="restaurant__description text-body ${style.restaurant__description}">
      </p>
      <a class="restaurant__link text-body ${style.restaurant__link}"></a>
      <div class="restaurant__button-container ${style.restaurant__buttonContainer}" > </div>
      <img is="favorite-icon" class="restaurant__favorite-icon" style="width:25px; position:absolute; right:10px; top:10px;"/>

     `;

    const $buttonBox = this.querySelector('.restaurant__button-container')!;
    $buttonBox.append(
      new BasicButton('secondary', '삭제하기', 'reset', () => {
        new RestaurantDBService().remove(this.get());
        (this.parentElement!.parentElement as BasicModal).closeModal();
        (document.querySelector('#main-app') as MainApp).paint();
      }),
    );
    $buttonBox.append(new BasicButton('primary', '닫기', 'submit', () => {}));

    this.addEventListener('click', this.#favoriteIconDBListener.bind(this));
  }
  render() {
    (
      this.querySelector('div[is="restaurant-category-icon"]') as RestaurantCategoryIcon
    ).setCategory(this.#category);
    this.querySelector('.restaurant__name')!.textContent = `${this.#name}`;
    this.querySelector('.restaurant__distance')!.textContent = `캠퍼스부터 ${this.#distance}분 내`;
    this.querySelector('.restaurant__description')!.textContent = `${this.#description ?? ''}`;
    (this.querySelector('.restaurant__favorite-icon')! as FavoriteIcon).set(this.#isFavorite);
    const link = this.querySelector('.restaurant__link') as HTMLAnchorElement;
    link.setAttribute('href', this.#link!);
    link.textContent = this.#link!;
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
    if ((event.target as HTMLElement).classList.contains('restaurant__favorite-icon')) {
      console.log('fav');
      this.#isFavorite =
        (this.querySelector('.restaurant__favorite-icon')! as FavoriteIcon).getAttribute(
          'clicked',
        ) === 'on';
      const newRestaurants = this.#getDBRaw().filter(
        (restaurant) => !new Restaurant(this.get()).isEqual(restaurant),
      );
      console.log(newRestaurants);
      new RestaurantDBService().set([...newRestaurants, this.get()]);

      (document.querySelector('.main-app-new') as MainApp).paint();
    }
  }
  #getDBRaw() {
    return new RestaurantDBService().get();
  }
}

export default RestaurantItemDetail;

customElements.define('restaurant-item-detail', RestaurantItemDetail, { extends: 'li' });
