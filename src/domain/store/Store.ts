import CustomElement from "../../abstracts/CustomElement";

class Store {
  #subscribers: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.#subscribers.push(element);
  }

  getSubscribers(): CustomElement[] {
    return this.#subscribers;
  }

  reducer = {};
}

export default Store;
