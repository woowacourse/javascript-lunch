import { CATEGORY_CONVERTER } from '../../constant/constants';
import { CLOSE_BUTTON_PROPS, DELETE_BUTTON_PROPS } from '../../constant/options';
import { $ } from '../../utils/querySelector';
import RestaurantEntity from '../../domain/entities/RestaurantEntity';
import createButton from '../Common/Button';
import Modal from './Modal';

const restaurantDetailLayout = document.createElement('div');
restaurantDetailLayout.classList.add('modal-detail-container');

const render = (restaurant: RestaurantEntity) => {
  const favorite = document.createElement('div');
  favorite.classList.add('restaurant__favorite');
  favorite.setAttribute('id', 'detail-favorite');

  const starredIcon = document.createElement('img');
  starredIcon.setAttribute('src', 'favorite-icon-filled.png');
  starredIcon.classList.add('favorite');
  favorite.appendChild(starredIcon);

  const unstarredIcon = document.createElement('img');
  unstarredIcon.setAttribute('src', 'favorite-icon-lined.png');
  unstarredIcon.classList.add('favorite');
  favorite.appendChild(unstarredIcon);

  if (restaurant.isFavorite) {
    unstarredIcon.classList.add('hidden');
  } else {
    starredIcon.classList.add('hidden');
  }

  restaurantDetailLayout.appendChild(favorite);

  const category = document.createElement('div');
  category.classList.add('restaurant__category');

  const categoryIcon = document.createElement('img');
  categoryIcon.setAttribute('src', `./category-${CATEGORY_CONVERTER[restaurant.category]}.png`);
  categoryIcon.classList.add('category-icon');
  category.appendChild(categoryIcon);

  restaurantDetailLayout.appendChild(category);

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

  if (restaurant.link) {
    const infoLink = document.createElement('a');
    infoLink.classList.add('restaurant__link', 'text-body');
    infoLink.setAttribute('href', restaurant.link);
    infoLink.textContent = restaurant.link;
    info.appendChild(infoLink);
  }

  restaurantDetailLayout.appendChild(info);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  const deleteButton = createButton(DELETE_BUTTON_PROPS);
  const closeButton = createButton(CLOSE_BUTTON_PROPS);
  buttonContainer.innerHTML += deleteButton;
  buttonContainer.innerHTML += closeButton;

  restaurantDetailLayout.appendChild(buttonContainer);
};

interface SetProps {
  restaurant: RestaurantEntity;
  reRender: () => void;
  onUpdate: () => void;
  onDelete: (id: string) => void;
}

class RestaurantDetailModal extends Modal {
  #restaurant?: RestaurantEntity;

  constructor() {
    super({ child: restaurantDetailLayout });
  }

  set restaurant({ restaurant, reRender, onUpdate, onDelete }: SetProps) {
    this.#restaurant = restaurant;
    restaurantDetailLayout.replaceChildren();
    render(this.#restaurant);
    this.setEvents(reRender, onUpdate, onDelete);
  }

  setEvents(reRender: () => void, onUpdate: () => void, onDelete: (id: string) => void) {
    const favorite = $('#detail-favorite');
    const deleteButton = $('#delete');
    const closeButton = $('#close');

    favorite.addEventListener('click', () => {
      this.#restaurant?.favoriteToggle();
      restaurantDetailLayout.replaceChildren();
      if (this.#restaurant) render(this.#restaurant);
      onUpdate();
      this.setEvents(reRender, onUpdate, onDelete);
    });

    deleteButton.addEventListener('click', () => {
      onDelete(this.#restaurant!.id);
    });

    closeButton.addEventListener('click', () => {
      this.toggle.bind(this)();
      onUpdate();
      reRender();
    });
  }
}

export default RestaurantDetailModal;
