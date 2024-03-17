import TabBarItem from "./TabBarItem/TabBarItem";
import createElementByTag from "../../utils/createElementByTag";

class TabBar {
  element;

  #items: TabBarItem[];

  constructor(
    itemArgs: {
      value: string;
      onFunction?: (...args: any[]) => any;
      offFunction?: (...args: any[]) => any;
      eventListenerArgs?: EventListenerArg[];
    }[]
  ) {
    this.#items = itemArgs.map((itemArg) => {
      const item = new TabBarItem(itemArg);
      item.element.addEventListener(
        "click",
        this.#renderTabBarInItemByClickEvent.bind(this)
      );
      return item;
    });
    this.#items[0].on();

    this.element = createElementByTag({
      tag: "section",
      classes: ["tab-bar-container"],
    });
    this.element.append(...this.#items.map((item) => item.element));
  }

  #renderTabBarInItemByClickEvent(event: Event) {
    const eventTarget = event.target;
    this.#items.forEach((item) => {
      if (eventTarget === item.element) item.on();
      else item.off();
    });
  }
}

export default TabBar;
