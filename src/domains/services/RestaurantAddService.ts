import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { Category, Distance, IRestaurant } from '@/types/Restaurant';
import { checkAllValuesValid, validateAllValuesAndMakeErrorMessage } from '@/utils/validator';
import { closeModal, hideErrorMessage } from '@/utils/view';
import { $ } from '@/utils/DOM';

class RestaurantAddService {
  #restaurantDBService;
  constructor() {
    this.#restaurantDBService = new RestaurantDBService();
  }

  addNewRestaurant(form: HTMLFormElement) {
    hideErrorMessage();

    const { category, name, distance, description, link } = this.#getValues(form);

    validateAllValuesAndMakeErrorMessage({ category, distance, name, link });
    if (!checkAllValuesValid({ category, distance, name, link })) return;

    const newRestaurant: IRestaurant = {
      name,
      distance: distance as Distance,
      category: category as Category,
      isFavorite: false,
      ...(description && { description }),
      ...(link && { link }),
    };

    this.#restaurantDBService.add(newRestaurant);
    this.#rerenderByFilter();
    closeModal($('.modal'));
    form.reset();
  }

  #getValues(form: HTMLFormElement) {
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const distance = Number((form.elements.namedItem('distance') as HTMLSelectElement).value);
    const category = (form.elements.namedItem('category') as HTMLSelectElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;
    const link = (form.elements.namedItem('link') as HTMLInputElement).value;

    return { name, distance, category, description, link };
  }

  #rerenderByFilter() {
    const event = new Event('change', {
      bubbles: true,
      cancelable: true,
    });
    $('.restaurant-filter-container').dispatchEvent(event);
  }
}
export default RestaurantAddService;
