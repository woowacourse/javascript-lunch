import { $inBody } from './selector';

export const executeEventListener = (
  selector: string,
  type: string,
  callback: (value: Event) => void
) => {
  $inBody(selector)?.addEventListener(type, callback);
};

export const executeOptionChangeEventListener = (
  selector: string,
  callback: (value: string) => void
) => {
  $inBody(selector)?.addEventListener('change', (event: Event) => {
    const element = event.target as HTMLOptionElement;

    callback(element.value);
  });
};
