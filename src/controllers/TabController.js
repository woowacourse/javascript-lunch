import TabEventHandler from "../event/tabEventHandler.js";
import { createTabView } from "../view/createTabView.js";

function TabController(mainElement, { updateCategorySortListView, updateFavoriteListView }) {
  const { tabContainerElement, allRestaurantTab, favoriteRestaurantTab } = createTabView();

  // 업데이트 뷰 함수 매핑
  const tabActionsUpdateListView = {
    "all-restaurant": updateCategorySortListView,
    "favorite-restaurant": updateFavoriteListView,
  };
  TabEventHandler(tabContainerElement, mainElement, tabActionsUpdateListView);

  return tabContainerElement;
}

export default TabController;
