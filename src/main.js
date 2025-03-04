import Icon from "./components/common/Icon.js";
import Text from "./components/common/Text.js";
import Header from "./components/common/Header.js";
import Layout from "./components/common/Layout.js";
import LunchList from "./components/feature/LunchList.js";
import LunchItem from "./components/feature/LunchItem.js";

addEventListener("load", () => {
  const layout = new Layout();
  const header = new Header();
  const lunchList = new LunchList();
  const lunchItem = new LunchItem();

  header.setProps({
    title: "점심 뭐먹지",
    iconName: "add-button",
  });

  lunchItem.setProps({
    storeName: "피양옥",
    location: "선릉",
    category: "category-korean",
    description:
      "2005년 장모님에게 전수받은 설렁탕 조리법을 개선하여 시작했다는 외고.외고 외고외고외고외고",
  });

  lunchList.setProps({
    lunchList: [lunchItem],
  });

  layout.setProps({
    children: [header, lunchList],
  });
  layout.render();
});
