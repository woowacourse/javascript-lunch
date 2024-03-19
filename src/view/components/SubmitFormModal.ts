import { LOCAL_STORAGE_KEY } from '../../constants/LocalStorageKey';
import { Category, DistanceFromCampus, IRestaurantInfo } from '../../domain/Restaurant';
import restaurantCatalog from '../../domain/RestaurantCatalog';
import RestaurantCards from './RestaurantCards';

const modal = document.getElementById('add-form-modal') as HTMLElement;

const closeModal = () => {
  const form = document.getElementById('add-restaurant-form') as HTMLFormElement;

  modal.classList.remove('modal--open');
  form.reset();
};

const openModal = () => {
  modal.classList.add('modal--open');
};

export function addEventToButton() {
  const modalCloseButton = document.getElementById('form-modal-close-button') as HTMLButtonElement;
  modalCloseButton.addEventListener('click', closeModal);

  const modalOpenButton = document.getElementById('add-restaurant-button') as HTMLButtonElement;
  modalOpenButton.addEventListener('click', openModal);
}

interface IForm {
  category: { value: Category };
  name: { value: string };
  distance: { value: DistanceFromCampus };
  description?: { value: string };
  link?: { value: string };
}

const makeRestaurantInfo = (target: EventTarget & IForm) => {
  const { category, name, distance, description, link } = target;
  return {
    category: category.value,
    name: name.value,
    distanceFromCampus: Number(distance.value) as DistanceFromCampus,
    description: description?.value || undefined,
    link: link?.value || undefined,
  };
};

export function updateRestaurantsToLocalStorage(...restaurants: IRestaurantInfo[]) {
  const restaurantArr = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}');
  restaurants.forEach((restaurant) => {
    restaurantArr[restaurant.id!] = restaurant;
  });
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(restaurantArr));
}

const reRenderRestaurants = () => {
  const RestaurantList = document.querySelector('.restaurant-list') as RestaurantCards;
  RestaurantList.render();
};

export function executeFormSubmitEvent(restaurantInfo: IRestaurantInfo) {
  try {
    const newRestaurant = restaurantCatalog.pushNewRestaurant(restaurantInfo);
    updateRestaurantsToLocalStorage(newRestaurant!);
    reRenderRestaurants();
    closeModal();
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
}

export function addEventToForm() {
  const addForm = document.getElementById('add-restaurant-form') as HTMLFormElement;

  addForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const restaurantInfo = makeRestaurantInfo(event.target! as EventTarget & IForm);
    executeFormSubmitEvent(restaurantInfo);
  });
}
