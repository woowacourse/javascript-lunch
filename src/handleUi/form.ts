import { $ } from '../utils/selector';

export const resetForm = (formSelector: string) => {
  const $form = $(formSelector) as HTMLFormElement;

  $form.reset();
};

export const scrollToTopForm = (target: string) => {
  const $target = $(target) as HTMLFormElement;

  $target.scrollTo(0, 0);
};
