import TabEventHandler from "../event/tabEventHandler.js";
import { createTabView } from "../view/createTabView.js";

interface TabControllerType {
  mainElement: HTMLElement;
  updateCategorySortListView: () => void;
  updateFavoriteListView: () => void;
}

function TabController({ mainElement, updateCategorySortListView, updateFavoriteListView }: TabControllerType) {
  const tabContainerElement = createTabView();

  // 업데이트 뷰 함수 매핑
  const tabActionsUpdateListView = {
    "all-restaurant": updateCategorySortListView,
    "favorite-restaurant": updateFavoriteListView,
  };
  TabEventHandler(tabContainerElement, mainElement, tabActionsUpdateListView);

  return tabContainerElement;
}

export default TabController;
