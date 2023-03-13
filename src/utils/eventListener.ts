import { $ } from './selector';

export const executeEventListener = (
  selector: string,
  type: string,
  callback: (value: Event) => void
) => {
  $(selector)?.addEventListener(type, callback);
};
