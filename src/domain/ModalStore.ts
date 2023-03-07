import { MODAL_ACTION } from "../abstracts/constants";
import { Action } from "../abstracts/types";
import Store from "./Store";

class ModalStore extends Store {
  #isModalOn: boolean = false;

  publish() {
    this.getSubscribers().forEach((subscriber) => {
      subscriber.rerender(this.#isModalOn);
    });
  }

  reducer = {
    [MODAL_ACTION.MODAL_ON]: (action: Action) => {
      this.#isModalOn = true;
      this.publish();
    },
    [MODAL_ACTION.MODAL_OFF]: (action: Action) => {
      this.#isModalOn = false;
      this.publish();
    },
  };
}

const ModalInstance = new ModalStore();

export default ModalInstance;
