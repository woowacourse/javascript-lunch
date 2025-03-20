import { selectElement } from '../utils/dom.ts';

function resetForm() {
  const form = selectElement('#new-restaurant-form');

  if (form instanceof HTMLFormElement) {
    form.reset();
  }
}

export default resetForm;
