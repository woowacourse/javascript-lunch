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
import Header from "./components/Header.js";

addEventListener("load", () => {
  // 초기 세팅
  Header(uiBasicText.HEADER_TEXT);
  const storeList = initRenderer.setStoreList();
  initRenderer.setRestaurantFilter(storeList);
  MenuBar(storeList);
  // initRenderer.initUI();

  Modal();
  modalRenderer.addForm();

  // 메뉴 추가 버튼
  document.querySelector(".gnb__button").addEventListener("click", () => {
    document.querySelector(".modal").classList.add("modal--open");

    document
      .querySelector(".modal-form")
      .addEventListener("submit", (e) =>
        storeRenderer.updateStore(storeList, e)
      );

    document
      .querySelector(".modal-backdrop")
      .addEventListener("click", modalRenderer.closeModal);
  });

  // 음식점 리스트
  document.querySelector(".restaurant-list").addEventListener("click", (e) => {
    // 음식점 리스트에서 즐겨찾기를 눌렀을 때
    const starIcon = e.target.closest(".star-icon");
    if (starIcon) {
      const store = e.target.closest(".restaurant");
      const storeId = store.getAttribute("id");
      const icon = store.querySelector(".star-icon");
      storeRenderer.toggleFavorite(storeList, icon, storeId);
      storeRenderer.rerenderStoreList(storeList.filteredList);
    }

    // 음식점 상세 정보
    const storeInfo = e.target.closest(".restaurant__info");
    if (!storeInfo) return;
    const storeId = e.target.closest(".restaurant").getAttribute("id");
    const store = storeList.filterByStoreId(storeId);

    initRenderer.setModal();
    document.querySelector(".modal").classList.add("modal--open");
    modalRenderer.setStoreInfoModal(store);

    document
      .querySelector("#close-button")
      .addEventListener("click", modalRenderer.closeModal);

    document.querySelector("#delete-button").addEventListener("click", () => {
      storeRenderer.deleteStore(storeList);
    });

    // 음식점 상세 정보에서 즐겨찾기 눌렀을 때
    const icon = document
      .querySelector(".modal-container")
      .querySelector(".star-icon");
    icon.addEventListener("click", (e) => {
      const storeId = e.target.closest(".modal-container").getAttribute("id");
      storeRenderer.toggleFavorite(storeList, icon, storeId);
      storeRenderer.rerenderStoreList(storeList.filteredList);
    });
  });
});
