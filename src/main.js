import {
  Icon,
  Text,
  Header,
  Layout,
  BottomSheet,
} from "./components/common/index.js";
import { LunchList, LunchItem, LunchForm } from "./components/feature/index.js";

addEventListener("load", () => {
  const layout = new Layout();
  const header = new Header();

  const lunchList = new LunchList();
  const bottomSheet = new BottomSheet();

  bottomSheet.setProps({
    onAdd: (data) => {
      const newLunchItem = new LunchItem();
      newLunchItem.setProps(data);
      lunchList.addLunchItem(newLunchItem);
    },
  });

  const lunchForm = new LunchForm();
  bottomSheet.addChild(LunchForm);

  header.setProps({
    title: "점심 뭐먹지",
    iconName: "add-button",
    onIconClick: () => bottomSheet.open(),
  });

  layout.setProps({
    children: [header, lunchList],
  });

  layout.render();
});
