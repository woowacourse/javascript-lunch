import { RestaurantInput } from '../../types/domain';
import { selectElement } from '../utils/dom.ts';
import resetForm from './resetForm.ts';

function readNewRestaurant(dataHandler: (data: RestaurantInput) => void, renderer: () => void) {
  const modal = selectElement('.modal');
  const form = selectElement('#new-restaurant-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRestaurantData = extractFormData();

    dataHandler(newRestaurantData);

    resetForm();
    modal.classList.remove('modal--open');

    renderer();
  });
}

function extractFormData(): RestaurantInput {
  return {
    category: (selectElement('#category') as HTMLSelectElement).value,
    name: (selectElement('#name') as HTMLInputElement).value,
    distance: Number((selectElement('#distance') as HTMLSelectElement).value.replace('분 내', '')),
    description: (selectElement('#description') as HTMLTextAreaElement).value,
    link: (selectElement('#link') as HTMLInputElement).value,
  };
}

export default readNewRestaurant;
