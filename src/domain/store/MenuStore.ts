import { MENU_ACTION } from "../../abstracts/constants";
import { Action } from "../../abstracts/types";
import Store from "./Store";

class MenuStore extends Store {
  #menu: string = "all";

  public() {
    this.getSubscribers().forEach((subscriber) => {
      subscriber.rerender(this.#menu);
    });
  }

  reducer = {
    [MENU_ACTION.MENU_ALL]: (action: Action) => {
      this.#menu = "all";
      this.public();
    },
    [MENU_ACTION.MENU_FAVORITE]: (action: Action) => {
      this.#menu = "favorite";
      this.public();
    },
  };
}

const MenuInstance = new MenuStore();
export default MenuInstance;
