import { LunchItem } from "../components/function/LunchItem.js";
import { LunchList } from "../components/function/LunchList.js";
import { openModal } from "../components/function/modal.js";
import { getStorage, setStorage } from "./storage.js";

class ClickEvent {
  constructor(elem) {
    elem.addEventListener("click", this.onClick.bind(this));
  }

  reload() {
    location.reload();
  }

  selectTab(target) {
    const tabs = document.querySelectorAll(".tab-item");
    const indicator = document.querySelector(".tab-indicator");
    const container = document.querySelector(".restaurant-section-container");
    const slider = document.querySelector(".restaurant-section-slider");

    const index = Number(target.value);

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    target.classList.add("active");

    indicator.style.left = `${target.offsetLeft}px`;
    indicator.style.width = `${target.offsetWidth}px`;

    slider.scrollTo({
      left: index * container.clientWidth,
      behavior: "smooth",
    });
  }

  showStoreAddModal() {
    openModal("storeAdd");
  }

  showStoreDeleteModal(target) {
    openModal("storeDelete", target);
  }

  removeModal(element) {
    if (element.id === "closeModalBtn") {
      document.getElementById("modalBackground")?.classList.remove("show");
      return;
    }
  }

  toggleFavorite(target) {
    const indexElement = target.closest("[data-index]");
    if (!indexElement) return;

    const index = indexElement.getAttribute("data-index");
    if (!index) return;

    const isFavorite = indexElement.getAttribute("data-favorite") === "true";

    const storageLunchItems = getStorage("lunchItems");
    storageLunchItems[index].isFavorite = !storageLunchItems[index].isFavorite;
    setStorage("lunchItems", storageLunchItems);
    LunchList().render();
    LunchList().renderFavorites();

    const isModal = target.closest("#storeDeleteForm");

    if (isModal) openModal("storeDelete", indexElement).render();
  }

  onClick(event) {
    let target = event.target.closest("[data-action]");

    if (!target) return;

    if (
      target.dataset.action &&
      typeof this[target.dataset.action] === "function"
    )
      this[target.dataset.action](target);
  }
}

new ClickEvent(document);
