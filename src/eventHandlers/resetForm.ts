import { selectElement } from '../utils/dom.ts';

function resetForm() {
  const form = selectElement('#new-restaurant-form') as HTMLFormElement;
  form.reset();
}

export default resetForm;
