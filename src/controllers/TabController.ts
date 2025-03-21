import TabEventHandler from "../event/tabEventHandler.ts";
import { createTabView } from "../view/createTabView.js";

interface TabControllerType {
  mainElement: HTMLElement;
  updateCategorySortListView: () => void;
  updateFavoriteListView: () => void;
}

class TabController {
  mainElement;
  updateCategorySortListView;
  updateFavoriteListView;
  tabContainerElement;

  constructor({ mainElement, updateCategorySortListView, updateFavoriteListView }: TabControllerType) {
    this.mainElement = mainElement;
    this.updateCategorySortListView = updateCategorySortListView;
    this.updateFavoriteListView = updateFavoriteListView;

    this.tabContainerElement = createTabView();

    const tabActionsUpdateListView = {
      "all-restaurant": this.updateCategorySortListView,
      "favorite-restaurant": this.updateFavoriteListView,
    };

    TabEventHandler(this.tabContainerElement, this.mainElement, tabActionsUpdateListView);
  }

  getTabContainerElement() {
    return this.tabContainerElement;
  }

  render(container: HTMLElement) {
    container.prepend(this.tabContainerElement);
  }
}

export default TabController;
