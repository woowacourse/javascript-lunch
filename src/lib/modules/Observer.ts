export default class Observer<T> {
  callback: (props: T) => void;

  constructor({ callback }: { callback: (props: T) => void }) {
    this.callback = callback;
  }

  notify(props: T) {
    this.callback(props);
  }
}
