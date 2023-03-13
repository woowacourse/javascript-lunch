import CustomElement from "../../abstracts/CustomElement";

class Store {
  private subscribers: CustomElement[] = [];

  public subscribe(element: CustomElement) {
    this.subscribers.push(element);
  }

  protected getSubscribers(): CustomElement[] {
    return this.subscribers;
  }

  reducer = {};
}

export default Store;
