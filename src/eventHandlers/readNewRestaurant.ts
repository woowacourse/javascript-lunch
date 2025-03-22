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
  const category = selectElement('#category');
  const name = selectElement('#name');
  const distance = selectElement('#distance');
  const description = selectElement('#description');
  const link = selectElement('#link');

  if (
    category instanceof HTMLSelectElement &&
    name instanceof HTMLInputElement &&
    distance instanceof HTMLSelectElement &&
    description instanceof HTMLTextAreaElement &&
    link instanceof HTMLInputElement
  ) {
    return {
      category: category.value,
      name: name.value,
      distance: Number(distance.value.replace('분 내', '')),
      description: description.value,
      link: link.value,
    };
  }

  throw new Error('form 요소의 값이 존재하지 않습니다.');
}

export default readNewRestaurant;
