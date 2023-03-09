import { MENU_ACTION } from "../../abstracts/constants";
import { Action } from "../../abstracts/types";
import Store from "./Store";

class MenuStore extends Store {
  #menu: string = "all";

  publish() {
    this.getSubscribers().forEach((subscriber) => {
      subscriber.rerender(this.#menu);
    });
  }

  reducer = {
    [MENU_ACTION.MENU_ALL]: (action: Action) => {
      this.#menu = "all";
      this.publish();
    },
    [MENU_ACTION.MENU_FAVORITE]: (action: Action) => {
      this.#menu = "favorite";
      this.publish();
    },
  };
}

const MenuInstance = new MenuStore();
export default MenuInstance;
