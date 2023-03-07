import { $inBody } from '../utils/selector';

export const resetForm = (formSelector: string, containerSelector: string) => {
  const $form = <HTMLFormElement>$inBody(formSelector);
  const $formContainer = <HTMLDivElement>$inBody(containerSelector);

  $form.reset();
  $formContainer.scrollTo(0, 0);
};
