import { openModal } from "../components/modal.js";

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

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    target.classList.add("active");

    const selectedTab = target;
    indicator.style.left = `${selectedTab.offsetLeft}px`;
    indicator.style.width = `${selectedTab.offsetWidth}px`;
  }

  showStoreAddModal() {
    openModal("storeAdd");
  }

  removeModal(element) {
    if (element.id === "closeModalBtn") {
      document.getElementById("modalBackground")?.classList.remove("show");
      return;
    }
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
