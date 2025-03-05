import Icon from "./components/common/Icon.js";
import Text from "./components/common/Text.js";
import Header from "./components/common/Header.js";
import Layout from "./components/common/Layout.js";
import LunchList from "./components/feature/LunchList.js";
import LunchItem from "./components/feature/LunchItem.js";
import BottomSheet from "./components/common/BottomSheet.js";
import LunchForm from "./components/feature/LunchForm.js";

// const initialLunchList = [
//   {
//     storeName: "김밥천국",
//     location: "서울 강남구",
//     category: "한식",
//     description: "김밥과 다양한 한식 메뉴를 저렴한 가격에 즐길 수 있는 곳.",
//   },
//   {
//     storeName: "이태원 버거",
//     location: "서울 용산구",
//     category: "양식",
//     description: "수제 버거와 감자튀김이 맛있는 인기 있는 햄버거 가게.",
//   },
//   {
//     storeName: "타이 스파이스",
//     location: "서울 마포구",
//     category: "아시안",
//     description: "매콤하고 향이 좋은 태국 요리를 맛볼 수 있는 곳.",
//   },
//   {
//     storeName: "도쿄라멘",
//     location: "서울 종로구",
//     category: "일식",
//     description: "진한 돈코츠 라멘과 차슈가 유명한 라멘 전문점.",
//   },
// ];

addEventListener("load", () => {
  const layout = new Layout();
  const bottomSheet = new BottomSheet();
  const header = new Header();
  const lunchList = new LunchList();

  const lunchForm = new LunchForm();

  // lunchForm.setProps({
  //   onAdd: (data) => {
  //     const newLunchItem = new LunchItem();
  //     newLunchItem.setProps(data);

  //     lunchList.addLunchItem(newLunchItem);
  //     bottomSheet.close();
  //   },
  // });

  bottomSheet.setProps({
    children: lunchForm,
  });

  header.setProps({
    title: "점심 뭐먹지",
    iconName: "add-button",
    onIconClick: () => bottomSheet.open(),
  });

  // lunchList.setProps({
  //   lunchList: initialLunchList.map((data) => {
  //     const item = new LunchItem();
  //     item.setProps(data);
  //     return item;
  //   }),
  // });

  layout.setProps({
    children: [header, lunchList],
  });

  layout.render();
});
