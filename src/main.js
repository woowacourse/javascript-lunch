import Icon from "./components/common/Icon.js";
import Text from "./components/common/Text.js";
import Header from "./components/common/Header.js";
import Layout from "./components/common/Layout.js";
import LunchList from "./components/feature/LunchList.js";
import LunchItem from "./components/feature/LunchItem.js";
import BottomSheet from "./components/common/BottomSheet.js";
import LunchForm from "./components/feature/LunchForm.js";

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
