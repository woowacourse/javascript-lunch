import querySelector from "./utils/querySelector.js";
import StoreList from "./class/StoreList.ts";
import storeData from "./data/storeData.js";
import Modal from "./components/Modal.js";
import Select from "./components/Select.js";
import options from "./constants/options.js";
import initRenderer from "./render/initRenderer.js";
import storeRenderer from "./render/storeRenderer.js";
import modalRenderer from "./render/modalRenderer.js";
import IMG_SRC from "./constants/imgSrc.js";
import MenuBar from "./components/MenuBar.js";
import uiBasicText from "./constants/uiBasicText.js";

addEventListener("load", () => {
  // 초기 세팅
  initRenderer.setHeader(uiBasicText.HEADER_TEXT);
  MenuBar();
  initRenderer.setRestaurantFilter();
  const storeList = initRenderer.setStoreList();

  // 메뉴 추가 버튼
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

  // 음식점 필터/정렬
  querySelector("#category-filter").addEventListener("change", (e) =>
    storeRenderer.filterStore(storeList, e)
  );
  querySelector("#sorting-filter").addEventListener("change", (e) =>
    storeRenderer.sortStore(storeList, e)
  );

  // 음식점 상세 정보
  querySelector(".restaurant-list").addEventListener("click", (e) => {
    const starIcon = e.target.closest(".star-icon");
    if (starIcon) {
      const store = e.target.closest(".restaurant");
      const storeId = store.getAttribute("id");
      const icon = store.querySelector(".star-icon");
      storeRenderer.toggleFavorite(storeList, icon, storeId);
      storeRenderer.removeStoreElements();
      storeList.filteredList.forEach((store) => {
        storeRenderer.addStore(store);
      });
    }

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

    const icon = querySelector(".modal-container").querySelector(".star-icon");
    icon.addEventListener("click", (e) => {
      console.log("favorite click");
      const storeId = e.target.closest(".modal-container").getAttribute("id");
      storeRenderer.toggleFavorite(storeList, icon, storeId);
      storeRenderer.removeStoreElements();
      storeList.filteredList.forEach((store) => {
        storeRenderer.addStore(store);
      });
    });
  });

  // 전체/자주 가는 음식점 메뉴바
  querySelector(".restaurant-menuBar-container").addEventListener(
    "click",
    (e) => {
      storeRenderer.setMenuBar(storeList, e);
    }
  );
});
