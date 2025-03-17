import { LunchItem } from "../components/function/LunchItem.ts";
import { LunchList } from "../components/function/LunchList.ts";
import { openModal } from "../components/function/modal.js";
import { LunchListData } from "../constants/LunchListData.ts";
import { getStorage, setStorage } from "./storage.js";

class ClickEvent {
  constructor(elem) {
    elem.addEventListener("click", this.onClick.bind(this));
  }

  reload() {
    location.reload();
  }

  resetStorage() {
    if (confirm("저장소를 초기화하시겠습니까?(되돌리기 불가)")) {
      this.reload();
      setStorage("lunchItems", []);
    }
  }

  setDefaultState() {
    if (confirm("기본 식당 데이터를 불러오시겠습니까?")) {
      setStorage("lunchItems", LunchListData);
      this.reload();
    }
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
    const dataElement = target.closest("[data-id]");
    if (!dataElement) return;
    const dataID = dataElement.dataset.id;
    if (!dataID) return;
    const storageLunchItems = getStorage("lunchItems");
    const targetData = storageLunchItems.find((item) => item.id === dataID);
    targetData.isFavorite = !targetData.isFavorite;
    setStorage("lunchItems", storageLunchItems);
    LunchList().render();
    LunchList().renderFavorites();
    const isModal = target.closest("#storeDeleteForm");
    if (isModal) openModal("storeDelete", dataElement).render();
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
