import Store from "../components/Store.js";
import IMG_SRC from "../constants/imgSrc.js";
import storage from "../utils/storage.ts";
import validate from "../utils/validate.ts";
import modalRenderer from "./modalRenderer.js";
import { v4 as uuidv4 } from "uuid";
import options from "../constants/options.js";

const storeRenderer = {
  // 새로운 식당 추가
  addStore: (storeProps) => {
    const list = document.createElement("li");
    list.setAttribute("id", storeProps.id);
    list.classList.add("restaurant");
    const starIconId = uuidv4();
    const store = Store(storeProps, starIconId);
    list.innerHTML = store;
    document.querySelector(".restaurant-list").appendChild(list);
  },

  // 식당 리스트 업데이트
  updateStore: (storeList, e) => {
    const newStore = storeRenderer.createStore(e);

    try {
      e.preventDefault();

      validate.emptySelector(newStore.category);
      validate.nameLength(newStore.name);
      validate.emptySelector(newStore.dist);
      validate.descLength(newStore.description);
      validate.linkForm(newStore.link);

      storeList.updateList(newStore);
      window.localStorage.setItem(
        JSON.stringify(newStore.id),
        JSON.stringify(newStore)
      );

      // 새로운 음식점이 추가되는 경우 모든 음식점 메뉴로 이동
      document
        .querySelector(".all-restaurant-button")
        .classList.add("onMenuBar");
      document
        .querySelector(".favorite-restaurant-button")
        .classList.remove("onMenuBar");

      // 새로운 음식점이 추가되는 경우 카테고리/정렬 드롭박스 초기화
      document.querySelector("#category-filter").value = Object.keys(
        options.sortCategory
      )[0];
      document.querySelector("#sorting-filter").value = Object.keys(
        options.sortFilter
      )[0];

      storeRenderer.rerenderStoreList(storeList.list);

      modalRenderer.closeModal();
    } catch (error) {
      storeRenderer.checkRequired("category", newStore.category, error);
      storeRenderer.checkRequired("name", newStore.name, error);
      storeRenderer.checkRequired("distance", newStore.dist, error);
    }
  },

  // 필수 조건 확인
  checkRequired: (inputName, value, error) => {
    if (value === "") {
      const inputElement = document.querySelector(`#${inputName}`);
      modalRenderer.addErrorText(inputElement, error);
    }
  },

  // 새로운 식당 데이터 생성
  createStore: (e) => {
    const data = new FormData(e.target);
    return {
      id: uuidv4(),
      category: data.get("category"),
      name: data.get("name"),
      dist: data.get("distance"),
      description: data.get("description"),
      link: data.get("link"),
      isFavorite: false,
    };
  },

  // 식당 리스트 요소 제거
  removeStoreElements: () => {
    document.querySelector(".restaurant-list").replaceChildren();
  },

  // 식당 필터링
  filterStore: (storeList, e) => {
    storeList.filterStoreList(e.target.value);
    storeRenderer.rerenderStoreList(storeList.filteredList);
  },

  // 식당 정렬
  sortStore: (storeList, e) => {
    storeList.sortStoreList(e.target.value);
    storeRenderer.rerenderStoreList(storeList.filteredList);
  },

  // 즐겨찾기 수정
  toggleFavorite: (storeList, starIcon, storeId) => {
    const storeInfo = storeList.list.find((store) => store.id === storeId);
    storeInfo.isFavorite = !storeInfo.isFavorite;

    starIcon.setAttribute(
      "src",
      storeInfo.isFavorite ? IMG_SRC.STAR_ICON_FILLED : IMG_SRC.STAR_ICON_LINED
    );
    const isFavorite = document
      .querySelector(".onMenuBar")
      .classList.contains("favorite-restaurant-button");
    storage.updateIsFavorite(storeId);
    storeList.updateIsFavorite(storeId, isFavorite);
  },

  // 모든 음식점 / 자주 가는 음식점 메뉴바 셋팅
  setMenuBar: (storeList, e) => {
    const button = e.target.closest(".menuBar-button");

    const buttonText = button.querySelector(".button-text").textContent;
    storeList.filterByMenuBar(buttonText);
    if (buttonText === "모든 음식점") {
      document.querySelector("#category-filter").value = "전체";
      document.querySelector("#sorting-filter").value = "name";

      document
        .querySelector(".restaurant-filter-container")
        .classList.add("filter-open");
      document
        .querySelector(".all-restaurant-button")
        .classList.add("onMenuBar");
      document
        .querySelector(".favorite-restaurant-button")
        .classList.remove("onMenuBar");
    }
    if (buttonText === "자주 가는 음식점") {
      document
        .querySelector(".restaurant-filter-container")
        .classList.remove("filter-open");
      document
        .querySelector(".favorite-restaurant-button")
        .classList.add("onMenuBar");
      document
        .querySelector(".all-restaurant-button")
        .classList.remove("onMenuBar");
    }

    storeRenderer.rerenderStoreList(storeList.filteredList);
  },

  // 식당 삭제
  deleteStore: (storeList) => {
    const storeId = document
      .querySelector(".modal-container")
      .getAttribute("id");
    window.localStorage.removeItem(JSON.stringify(storeId));

    const isFavorite = document
      .querySelector(".onMenuBar")
      .classList.contains("favorite-restaurant-button");

    storeList.deleteStore(storeId);

    modalRenderer.closeModal();
    storeRenderer.rerenderStoreList(storeList.filteredList);

    document.querySelector("#category-filter").value = "전체";
    document.querySelector("#sorting-filter").value = "name";
  },

  rerenderStoreList(list) {
    storeRenderer.removeStoreElements();
    list.forEach((store) => {
      storeRenderer.addStore(store);
    });
  },
};

export default storeRenderer;
