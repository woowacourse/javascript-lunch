import BaseComponent from "../components/BaseComponent/BaseComponent";

import { CustomEventListenerDictionary } from "../components/BaseComponent/BaseComponent.type";

import { $ } from "./dom";

interface ImageButtonConfig {
  id: string;
  name: string;
  filledImageSrc: string;
  linedImageSrc: string;
  isFilled: boolean;
}

class ImageButton extends BaseComponent {
  private config: ImageButtonConfig;

  private eventListeners: CustomEventListenerDictionary = {
    imageButtonClick: {
      eventName: "click",
      eventHandler: this.handleImageButtonClick.bind(this),
    },
  };

  constructor(config: ImageButtonConfig) {
    super();
    this.config = config;
  }

  public getTemplate(): string {
    const { id, name, linedImageSrc, filledImageSrc } = this.config;

    return `
      <img
        id="${id}-${name}-button"
        class="${name}-image-button"
        src="${this.config.isFilled ? filledImageSrc : linedImageSrc}";
        alt="${name}-button-image"
      >
    `;
  }

  private handleImageButtonClick(event: Event): void {
    const targetElement = event?.target;

    if (targetElement instanceof Image) {
      targetElement.src =
        targetElement.src === this.config.filledImageSrc
          ? this.config.linedImageSrc
          : this.config.filledImageSrc;
    }
  }

  public setEvent(): void {
    const { id, name } = this.config;

    this.on({
      ...this.eventListeners.imageButtonClick,
      target: $(`#${id}-${name}-button`),
    });
  }

  public removeEvent(): void {
    const { id, name } = this.config;

    this.off({
      ...this.eventListeners.imageButtonClick,
      target: $(`#${id}-${name}-button`),
    });
  }
}

customElements.define("image-button", ImageButton);

export default ImageButton;
