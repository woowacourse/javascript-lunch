import StoreList from "./class/StoreList.ts";
import Modal from "./components/Modal.js";
import Select from "./components/Select.js";
import initRenderer from "./render/initRenderer.js";
import storeRenderer from "./render/storeRenderer.js";
import modalRenderer from "./render/modalRenderer.js";
import MenuBar from "./components/MenuBar.js";
import uiBasicText from "./constants/uiBasicText.js";
import Header from "./components/Header.js";
import {
  handleCancelDetail,
  handleDeleteStore,
  handleDetailFavorite,
} from "./components/StoreDetail.js";

addEventListener("load", () => {
  // 초기 세팅
  const storeList = initRenderer.setStoreList();
  Header(uiBasicText.HEADER_TEXT);
  initRenderer.setRestaurantFilter(storeList);
  MenuBar(storeList);
  Modal(storeList, ["modal-add-store"]);
  modalRenderer.addForm(storeList);
  Modal(storeList, ["modal-store-detail"]);

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

    document.querySelector(".modal-store-detail").classList.add("modal--open");
    modalRenderer.setStoreInfoModal(store);

    handleCancelDetail();
    handleDeleteStore(storeList);
    handleDetailFavorite(storeList, storeId);
  });
});
