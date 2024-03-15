import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { Category, Distance, IRestaurant } from '@/types/Restaurant';
import { checkAllValuesValid, validateAllValuesAndMakeErrorMessage } from '@/utils/validator';
import { closeModal, hideErrorMessage } from '@/utils/view';
import { $ } from '@/utils/DOM';
import RestaurantCollection from '../entities/RestaurantCollection';

class RestaurantUpdateService {
  #restaurantDBService;
  #restaurantCollection;

  constructor() {
    this.#restaurantDBService = new RestaurantDBService();
    this.#restaurantCollection = new RestaurantCollection([]);
  }

  addNewRestaurant(form: HTMLFormElement) {
    hideErrorMessage();
    const newRestaurant = this.#getValues(form);

    if (newRestaurant) {
      this.updateAddedRestaurantCollection(newRestaurant);
      this.rerenderByFilter();
      closeModal();
      form.reset();
    }
  }

  deleteRestaurant(id: number) {
    //진짜 삭제하겠는지 모달 띄우기
    const answer = true;
    if (answer) {
      this.#restaurantCollection = this.#restaurantDBService.update();
      this.#restaurantCollection.deleteRestaurant(id);
      this.#restaurantDBService.set(this.#restaurantCollection);
    }
  }

  updateAddedRestaurantCollection(newRestaurant: IRestaurant) {
    this.#restaurantCollection = this.#restaurantDBService.update();
    this.#restaurantCollection.addRestaurant(newRestaurant);
    this.#restaurantDBService.set(this.#restaurantCollection);
  }

  #getValues(form: HTMLFormElement) {
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const distance = Number((form.elements.namedItem('distance') as HTMLSelectElement).value);
    const category = (form.elements.namedItem('category') as HTMLSelectElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;
    const link = (form.elements.namedItem('link') as HTMLInputElement).value;

    validateAllValuesAndMakeErrorMessage({ category, distance, name, link });
    if (!checkAllValuesValid({ category, distance, name, link })) return;

    const newRestaurant: IRestaurant = {
      name,
      distance: distance as Distance,
      category: category as Category,
      id: Math.floor(Math.random() * 10000),
      isFavorite: false,
      ...(description && { description }),
      ...(link && { link }),
    };

    return newRestaurant;
  }

  rerenderByFilter() {
    const event = new Event('change', {
      bubbles: true,
      cancelable: true,
    });
    $('.restaurant-filter-container').dispatchEvent(event);
  }
}

export default RestaurantUpdateService;
