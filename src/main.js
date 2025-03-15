import { Header, Layout, BottomSheet } from "./components/common/index.js";
import Tab from "./components/common/Tab.js";
import Restaurant from "./domain/Restaurant.js";

addEventListener("load", () => {
  const layout = new Layout();
  const bottomSheet = new BottomSheet();

  const header = layout.addChild(Header, {
    title: "점심 뭐먹지",
    iconName: "add-button",
    onIconClick: () => bottomSheet.openForm(),
  });
  const tab = layout.addChild(Tab, {
    tabs: ["모든 음식점", "자주 가는 음식점"],
    activeIndex: 0,
    onItemClick: (item) => bottomSheet.openDetail(item),
  });

  layout.render();
});
