export default class Observable {
  _observers;

  constructor() {
    this._observers = [];
  }

  subscribe(observer) {
    this._observers.push(observer);
  }

  notify() {
    this._observers.forEach((observer) => observer());
  }
}
