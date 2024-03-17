import { CATEGORY_CONVERTER } from '../../constant/constants';
import { Restaurant } from '../../interface/RestaurantInterfaces';

interface Props {
  restaurant: Restaurant;
  onClick?: () => void;
}

class createRestaurantItem {
  #itemContainer = document.createElement('li');
  #starredIcon = document.createElement('img');
  #unstarredIcon = document.createElement('img');

  isFavorite: boolean;

  constructor({ restaurant, onClick }: Props) {
    this.render(restaurant);
    this.isFavorite = restaurant.isFavorite;

    if (onClick) {
      this.#itemContainer.addEventListener('click', onClick.bind(this));
    }
  }

  render(restaurant: Restaurant) {
    this.#itemContainer.classList.add('restaurant');

    const favorite = document.createElement('div');
    favorite.classList.add('restaurant__favorite');

    this.#starredIcon.setAttribute('src', 'favorite-icon-filled.png');
    this.#starredIcon.classList.add('favorite', 'hidden');
    favorite.appendChild(this.#starredIcon);

    this.#unstarredIcon.setAttribute('src', 'favorite-icon-lined.png');
    this.#unstarredIcon.classList.add('favorite');
    favorite.appendChild(this.#unstarredIcon);

    const category = document.createElement('div');
    category.classList.add('restaurant__category');

    const categoryIcon = document.createElement('img');
    categoryIcon.setAttribute('src', `./category-${CATEGORY_CONVERTER[restaurant.category]}.png`);
    categoryIcon.classList.add('category-icon');
    category.appendChild(categoryIcon);

    const info = document.createElement('div');
    info.classList.add('restaurant__info');

    const infoName = document.createElement('h3');
    infoName.classList.add('restaurant__name', 'text-subtitle');
    infoName.textContent = restaurant.name;
    info.appendChild(infoName);

    const infoDistance = document.createElement('span');
    infoDistance.classList.add('restaurant__distance', 'text-body');
    infoDistance.textContent = `캠퍼스부터 ${restaurant.distance}분 내`;
    info.appendChild(infoDistance);

    if (restaurant.description) {
      const infoDescription = document.createElement('p');
      infoDescription.classList.add('restaurant__description', 'text-body');
      infoDescription.textContent = restaurant.description;
      info.appendChild(infoDescription);
    }

    this.#itemContainer.appendChild(favorite);
    this.#itemContainer.appendChild(category);
    this.#itemContainer.appendChild(info);

    favorite.addEventListener('click', () => this.favoriteToggle.bind(this)());
  }

  get element() {
    return this.#itemContainer;
  }

  favoriteToggle() {
    if (this.#starredIcon.classList.contains('hidden')) {
      this.#starredIcon.classList.remove('hidden');
      this.#unstarredIcon.classList.add('hidden');
      this.isFavorite = false;
    } else {
      this.#starredIcon.classList.add('hidden');
      this.#unstarredIcon.classList.remove('hidden');
      this.isFavorite = true;
    }
  }
}

export default createRestaurantItem;
