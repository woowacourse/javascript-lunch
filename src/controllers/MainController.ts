import { LIST_ITEM_CONTENTS } from "../constants/listData.js";
import RestaurantList from "../domain/RestaurantList.js";
import favoriteEventHandler from "../event/favoriteEventHandler.js";
import listItemOpenEventHandler from "../event/listItemOpenEventHandler.js";
import CategorySortFilterController from "./CategorySortFilterController.js";
import DetailModalController from "./DetailModalController.js";
import FavoriteListController from "./FavoriteListController.js";
import HeaderController from "./HeaderController.js";
import ListController from "./ListController.js";
import ModalController from "./ModalController.js";
import TabController from "./TabController.js";

function MainController() {
  const app = document.getElementById("app");
  if (!app) throw new Error("app 요소를 찾을 수 없습니다.");

  const mainElement = app.querySelector("main");
  if (!mainElement) throw new Error("main 요소를 찾을 수 없습니다.");

  const allListContainerElement = mainElement.querySelector(".all-restaurant-list-container");
  const favoriteListContainerElement = mainElement.querySelector(".favorite-restaurant-list-container");
  if (!allListContainerElement || !favoriteListContainerElement)
    throw new Error("list-container 요소를 찾을 수 없습니다.");

  const restaurantList = new RestaurantList(LIST_ITEM_CONTENTS); // 도메인

  const { listElement, updateListView } = ListController(restaurantList);
  const { favoriteListElement, updateFavoriteListView } = FavoriteListController(restaurantList);
  const { categorySortFilterContainerElement, updateCategorySortListView } =
    CategorySortFilterController(updateListView);

  const modalElement = ModalController({
    updateCategorySortListView,
    restaurantList,
  });

  const tabContainerElement = TabController({ mainElement, updateCategorySortListView, updateFavoriteListView });

  const headerElement = HeaderController(modalElement);

  /*기존 돔에 추가*/
  app.prepend(headerElement); //헤더바
  mainElement.prepend(tabContainerElement); // 탭바
  mainElement.appendChild(modalElement); // 가게 추가 모달
  allListContainerElement.appendChild(categorySortFilterContainerElement); // 필터링바
  allListContainerElement.appendChild(listElement); // 잔체 가게 리스트
  favoriteListContainerElement.appendChild(favoriteListElement); // 좋아하는 가게 리스트

  //좋아요 버튼 클릭 이벤트 등록
  favoriteEventHandler({ mainElement, restaurantList, updateFavoriteListView });

  //listItem open 이벤트 등록
  listItemOpenEventHandler(mainElement, (restaurantName: string) =>
    DetailModalController({
      restaurantName,
      restaurantList,
      updateCategorySortListView,
      updateFavoriteListView,
    }),
  );
}

export default MainController;
