import { LIST_ITEM_CONTENTS } from "../constants/listData.ts";
import RestaurantList from "../domain/RestaurantList.ts";
import favoriteEventHandler from "../event/favoriteEventHandler.ts";
import listItemOpenEventHandler from "../event/listItemOpenEventHandler.ts";
import CategorySortFilterController from "./CategorySortFilterController.ts";
import DetailModalController from "./DetailModalController.ts";
import FavoriteListController from "./FavoriteListController.ts";
import HeaderController from "./HeaderController.ts";
import ListController from "./ListController.ts";
import ModalController from "./ModalController.ts";
import TabController from "./TabController.ts";

class MainController {
  appElement;
  mainElement;
  allListContainerElement;
  favoriteListContainerElement;
  restaurantList;

  // ❗ 컨트롤러 프로퍼티 추가
  listController!: ListController;
  favoriteListController!: FavoriteListController;
  categorySortFilterController!: CategorySortFilterController;
  modalController!: ModalController;
  tabController!: TabController;
  headerController!: HeaderController;

  constructor() {
    this.appElement = document.getElementById("app") as HTMLElement;

    this.mainElement = this.appElement.querySelector("main") as HTMLElement;

    this.allListContainerElement = this.mainElement.querySelector(".all-restaurant-list-container") as HTMLElement;
    this.favoriteListContainerElement = this.mainElement.querySelector(
      ".favorite-restaurant-list-container",
    ) as HTMLElement;

    this.restaurantList = new RestaurantList(LIST_ITEM_CONTENTS); // 도메인
  }

  init() {
    // 컨트롤러 초기화
    this.listController = new ListController(this.restaurantList);
    this.favoriteListController = new FavoriteListController(this.restaurantList);

    this.categorySortFilterController = new CategorySortFilterController(
      this.listController.updateList.bind(this.listController),
    );

    this.modalController = new ModalController({
      updateCategorySortListView: this.categorySortFilterController.updateCategorySortListView.bind(
        this.categorySortFilterController,
      ),
      restaurantList: this.restaurantList,
    });

    this.tabController = new TabController({
      mainElement: this.mainElement,
      updateCategorySortListView: this.categorySortFilterController.updateCategorySortListView.bind(
        this.categorySortFilterController,
      ),
      updateFavoriteListView: this.favoriteListController.updateFavoriteList.bind(this.favoriteListController),
    });
    this.headerController = new HeaderController(this.modalController.getModalElement());

    this.registerEvents();
    this.render();
  }

  registerEvents() {
    favoriteEventHandler({
      mainElement: this.mainElement,
      restaurantList: this.restaurantList,
      updateFavoriteListView: this.favoriteListController.updateFavoriteListView.bind(this.favoriteListController),
    });

    listItemOpenEventHandler(this.mainElement, (restaurantName) =>
      DetailModalController({
        restaurantName,
        restaurantList: this.restaurantList,
        updateCategorySortListView: this.categorySortFilterController.updateCategorySortListView.bind(
          this.categorySortFilterController,
        ),
        updateFavoriteListView: this.favoriteListController.updateFavoriteListView.bind(this.favoriteListController),
      }),
    );
  }

  render() {
    this.appElement.prepend(this.headerController.getHeaderElement());
    this.mainElement.prepend(this.tabController.getTabContainerElement());
    this.mainElement.appendChild(this.modalController.getModalElement());
    this.allListContainerElement.appendChild(this.categorySortFilterController.getContainerElement());
    this.allListContainerElement.appendChild(this.listController.getListElement());
    this.favoriteListContainerElement.appendChild(this.favoriteListController.getFavoriteListElement());
  }
}

// function MainController() {
//   const { listElement, updateListView } = ListController(restaurantList);
//   const { favoriteListElement, updateFavoriteListView } = FavoriteListController(restaurantList);
//   const { categorySortFilterContainerElement, updateCategorySortListView } =
//     CategorySortFilterController(updateListView);
//   const modalElement = ModalController({ updateCategorySortListView, restaurantList });
//   const tabContainerElement = TabController({ mainElement, updateCategorySortListView, updateFavoriteListView });
//   const headerElement = HeaderController(modalElement);

//   /*기존 돔에 추가*/
//   app.prepend(headerElement); //헤더바
//   mainElement.prepend(tabContainerElement); // 탭바
//   mainElement.appendChild(modalElement); // 가게 추가 모달
//   allListContainerElement.appendChild(categorySortFilterContainerElement); // 필터링바
//   allListContainerElement.appendChild(listElement); // 잔체 가게 리스트
//   favoriteListContainerElement.appendChild(favoriteListElement); // 좋아하는 가게 리스트

//   //좋아요 버튼 클릭 이벤트 등록
//   favoriteEventHandler({ mainElement, restaurantList, updateFavoriteListView });

//   //listItem open 이벤트 등록
//   listItemOpenEventHandler(mainElement, (restaurantName: string) =>
//     DetailModalController({
//       restaurantName,
//       restaurantList,
//       updateCategorySortListView,
//       updateFavoriteListView,
//     }),
//   );
// }

export default MainController;
