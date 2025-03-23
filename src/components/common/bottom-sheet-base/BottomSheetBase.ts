import { UIComponent } from "./../../../../types/index";
import { EVENT_TYPES } from "../../../constants";
import "./bottomSheetBase.css";

interface BottomSheetBaseProps {
  id: string;
  $children: DocumentFragment | HTMLFormElement;
}

export default class BottomSheetBase implements UIComponent {
  private id: BottomSheetBaseProps["id"];
  private $children: BottomSheetBaseProps["$children"];
  private $modal: HTMLDivElement;

  constructor({ id, $children }: BottomSheetBaseProps) {
    this.id = id;
    this.$children = $children;
    this.$modal = document.createElement("div");
  }

  render(): HTMLDivElement {
    this.$modal.className = "modal";
    if (this.id) this.$modal.id = this.id;

    const $backdrop = document.createElement("div");
    $backdrop.className = "modal-backdrop";

    const $container = document.createElement("div");
    $container.className = "modal-container";

    this.$modal.append($backdrop, $container);
    $container.append(this.$children);

    $backdrop.addEventListener(EVENT_TYPES.click, this.close.bind(this));

    return this.$modal;
  }

  open() {
    this.$modal.classList.add("modal--open");
  }

  close(e?: MouseEvent) {
    if (
      !e ||
      !(e.target instanceof HTMLElement) ||
      !e.target.closest(".modal-container")
    ) {
      this.$modal.classList.remove("modal--open");
    }
  }
}
