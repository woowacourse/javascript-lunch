import { $, createElement } from "../../utils/Dom";

class Header {
  $header: HTMLElement;
  $headerButton: HTMLElement;

  constructor() {
    this.$header = createElement("header", { class: ["gnb"] });
    this.$headerButton = createElement("button", {
      class: ["gnb__button"],
      "aria-label": "음식점 추가",
      type: "button",
    });
    this.makeElement();
    this.addEvent();
  }

  private makeElement() {
    const $header = createElement("header", { class: ["gnb"] });
    const $headerTitle = createElement("h1", {
      class: ["gnb__title", "text-title"],
    });
    $headerTitle.textContent = "점심 뭐 먹지";

    const $addImg = createElement("img", {
      alt: "음식점 추가",
      src: "아직 안돼",
    });

    this.$headerButton.append($addImg);
    this.$header.append($headerTitle, this.$headerButton);
  }

  addEvent() {
    this.$headerButton.addEventListener("click", () => {
      console.log("모달없어..");
      $(".modal")?.classList.add("modal--open");
    });
  }

  get element() {
    return this.$header;
  }
}

export default new Header().element;
