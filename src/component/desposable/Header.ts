import { $, createElement } from "../../utils/Dom";

class Header {
  private $header: HTMLElement;
  private $headerButton: HTMLElement;

  constructor() {
    this.$header = createElement("header");
    this.$headerButton = createElement("button");
    this.generateElement();
    this.activate();
  }

  private generateElement() {
    this.$header.className = "gnb";

    const $headerTitle = createElement("h1");
    $headerTitle.classList.add("gnb__title", "text-title");
    $headerTitle.textContent = "점심 뭐 먹지";

    this.$headerButton.classList.add("gnb__button");
    this.$headerButton.setAttribute("aria-label", "음식점 추가");
    this.$headerButton.setAttribute("type", "button");

    const $addImg = createElement("img");
    $addImg.setAttribute("alt", "음식점 추가");
    $addImg.setAttribute("src", "/add-button.png"); //이미지 못 가져옴

    this.$headerButton.append($addImg);
    this.$header.append($headerTitle, this.$headerButton);
  }

  activate() {
    this.$headerButton.addEventListener("click", () => {
      console.log("모달없어..");
      $(".modal")?.classList.add("modal--open");
    });
  }

  getElement() {
    return this.$header;
  }
}

export default new Header().getElement();
