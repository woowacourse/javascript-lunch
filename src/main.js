import { BOTTOM_SHEET_MODES } from "./components/common/BottomSheet.js";
import { Header, Layout, Tab, BottomSheet } from "./components/common/index.js";
import { storeData } from "./constants/store.data.ts";
import { RestaurantFacade } from "./domain/RestaurantFacade.ts";

const initializeLocalStorage = () => {
  if (RestaurantFacade.getAll().length === 0) {
    RestaurantFacade.importData(storeData);
  }
};

addEventListener("load", () => {
  initializeLocalStorage();

  const layout = new Layout();
  const bottomSheet = new BottomSheet();

  const header = layout.addChild(Header, {
    title: "점심 뭐먹지",
    iconName: "add-button",
    onIconClick: () => bottomSheet.open(BOTTOM_SHEET_MODES.FORM),
  });

  const tab = layout.addChild(Tab, {
    tabs: ["모든 음식점", "자주 가는 음식점"],
    activeIndex: 0,
    onItemClick: (item) => bottomSheet.open(BOTTOM_SHEET_MODES.DETAIL, item),
  });

  layout.render();
});
