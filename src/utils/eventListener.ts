import { $ } from './selector';

interface ExecuteEventListener {
  ({ selector, type }: { selector: string; type: string }, callback: (value: Event) => void): void;
}

export const executeEventListener: ExecuteEventListener = ({ selector, type }, callback) => {
  const element = $(selector);

  if (element) {
    element.addEventListener(type, callback);
  }
};
