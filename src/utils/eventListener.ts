import { $ } from './selector';

interface ExecuteEventListener {
  ({ selector, type }: { selector: string; type: string }, callback: (value: Event) => void): void;
}

export const executeEventListener: ExecuteEventListener = ({ selector, type }, callback) => {
  $(selector)?.addEventListener(type, callback);
};
