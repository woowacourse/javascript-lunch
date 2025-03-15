import { LunchItem } from "../components/LunchItem.js";
import { LunchList } from "../components/LunchList.js";
import { openModal } from "../components/modal.js";
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
    const li = target.closest("li");
    if (!li) return;

    const index = li.getAttribute("data-index");
    if (!index) return;

    const isFavorite = li.getAttribute("data-favorite") === "true";

    const storageLunchItems = getStorage("lunchItems");
    storageLunchItems[index].isFavorite = !storageLunchItems[index].isFavorite;
    setStorage("lunchItems", storageLunchItems);
    LunchList().render();
    LunchList().renderFavorites();
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
