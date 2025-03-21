import { LIST_ITEM_CONTENTS } from "../constants/listData.ts";
import RestaurantList from "../domain/RestaurantList.ts";
import favoriteEventHandler from "../event/favoriteEventHandler.ts";
import listItemOpenEventHandler from "../event/listItemOpenEventHandler.ts";
import CategorySortFilterController from "../controllers/CategorySortFilterController.ts";
import DetailModalController from "../controllers/DetailModalController.ts";
import FavoriteListController from "../controllers/FavoriteListController.ts";
import HeaderController from "../controllers/HeaderController.ts";
import ListController from "../controllers/ListController.ts";
import ModalController from "../controllers/ModalController.ts";
import TabController from "../controllers/TabController.ts";

class MainController {
  appElement;
  mainElement;
  allListContainerElement;
  favoriteListContainerElement;
  restaurantList;

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

    listItemOpenEventHandler(this.mainElement, (restaurantName) => {
      const detailModalController = new DetailModalController({
        restaurantName,
        restaurantList: this.restaurantList,
        updateCategorySortListView: this.categorySortFilterController.updateCategorySortListView.bind(
          this.categorySortFilterController,
        ),
        updateFavoriteListView: this.favoriteListController.updateFavoriteListView.bind(this.favoriteListController),
      });

      return detailModalController.getElement();
    });
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

export default MainController;
