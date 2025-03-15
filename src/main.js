import querySelector from "./utils/querySelector.js";
import StoreList from "./class/StoreList.js";
import storeData from "./data/storeData.js";
import Modal from "./components/Modal.js";
import Select from "./components/Select.js";
import options from "./constants/options.js";
import initRenderer from "./render/initRenderer.js";
import storeRenderer from "./render/storeRenderer.js";
import modalRenderer from "./render/modalRenderer.js";
import IMG_SRC from "./constants/imgSrc.js";
import MenuBar from "./components/MenuBar.js";

addEventListener("load", () => {
  // 초기 세팅
  initRenderer.setHeader("오늘 뭐 먹지");
  initRenderer.setRestaurantFilter();
  MenuBar();
  const storeList = initRenderer.setStoreList();

  querySelector(".gnb__button").addEventListener("click", () => {
    initRenderer.setModal();
    querySelector(".modal").classList.add("modal--open");
    modalRenderer.addForm();

    querySelector(".modal-form").addEventListener("submit", (e) =>
      storeRenderer.updateStore(storeList, e)
    );

    querySelector(".modal-backdrop").addEventListener(
      "click",
      modalRenderer.closeModal
    );
  });

  querySelector("#category-filter").addEventListener("change", (e) =>
    storeRenderer.filterStore(storeList, e)
  );
  querySelector("#sorting-filter").addEventListener("change", (e) =>
    storeRenderer.sortStore(storeList, e)
  );

  querySelector(".restaurant-list").addEventListener("click", (e) => {
    storeRenderer.toggleFavorite(storeList, e);

    const storeInfo = e.target.closest(".restaurant__info");
    if (!storeInfo) return;
    const storeName = storeInfo.querySelector(".restaurant__name").textContent;
    const store = storeList.filterByStoreName(storeName);

    initRenderer.setModal();
    querySelector(".modal").classList.add("modal--open");
    modalRenderer.setStoreInfoModal(store);

    querySelector("#close-button").addEventListener(
      "click",
      modalRenderer.closeModal
    );

    querySelector("#delete-button").addEventListener("click", () => {
      storeRenderer.deleteStore(storeList);
    });
  });

  querySelector(".restaurant-menuBar-container").addEventListener(
    "click",
    (e) => {
      storeRenderer.setMenuBar(storeList, e);
    }
  );
});
