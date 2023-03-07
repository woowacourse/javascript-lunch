import { MODAL_ACTION } from "../abstracts/constants";
import CustomElement from "../abstracts/CustomElement";
import { Action } from "../abstracts/types";
import Store from "./Store";

class ModalStore extends Store {
  #isModalOn: boolean = false;

  publish(action: Action) {
    this.getSubscribers().forEach((subscriber) => {
      subscriber.rerender(this.#isModalOn);
    });
  }

  reducer = {
    [MODAL_ACTION.MODAL_ON]: (action: Action) => {
      this.#isModalOn = true;
      this.publish(action);
    },
    [MODAL_ACTION.MODAL_OFF]: (action: Action) => {
      this.#isModalOn = false;
      this.publish(action);
    },
  };
}

const ModalInstance = new ModalStore();

export default ModalInstance;
