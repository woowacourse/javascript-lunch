import { $inBody } from '../utils/selector';

export const resetForm = (formSelector: string) => {
  const $form = $inBody(formSelector) as HTMLFormElement;

  $form.reset();
};

export const scrollToTopForm = (target: string) => {
  const $target = $inBody(target) as HTMLFormElement;

  $target.scrollTo(0, 0);
};
