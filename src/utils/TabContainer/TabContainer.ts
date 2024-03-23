import "./TabContainer.css";

import BaseComponent from "../../components/BaseComponent/BaseComponent";
import { CustomEventListenerDictionary } from "../../components/BaseComponent/BaseComponent.type";

import { $, $$ } from "../dom";
import { ELEMENT_SELECTOR } from "../../constants/selector";

import type { TabItem } from "./TabContainer.type";
import { createLiElements } from "../createLiElements";

interface TabContainerConfig {
  name: string;
  tabItems: TabItem[];
}

class TabContainer extends BaseComponent {
  private config: TabContainerConfig;

  private eventListeners: CustomEventListenerDictionary = {
    tabButtonClick: {
      eventName: "click",
      eventHandler: this.handleClickTab.bind(this),
    },
  };

  constructor(config: TabContainerConfig) {
    super();
    this.config = config;
  }

  public getTemplate(): string {
    return `
      <section id=${this.config.name}-tab-container class="tab-container">
        <ul class="${this.config.name}-tab">
          ${createLiElements(this.config.tabItems)}
        </ul>
      </section>
      `;
  }

  public setEvent(): void {
    this.on({
      ...this.eventListeners.tabButtonClick,
      target: $(`.${this.config.name}-tab`),
    });
  }

  private handleClickTab(event: Event) {
    const clickedLi = (event.target as Element).closest(".tab-item");
    if (!clickedLi) return;

    $$(ELEMENT_SELECTOR.tabItem).forEach((tabLi: Element) => {
      tabLi.classList.toggle("tab-item-selected", tabLi === clickedLi);
    });
  }
}

customElements.define("tab-container", TabContainer);

export default TabContainer;
