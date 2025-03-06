import IconButton from "./component/IconButton/IconButton.js";
import AddLunchModal from "./component/AddLunchModal/AddLunchModal.js";
import { DOM } from "./utils/dom.js";
import TextButton from "./component/TextButton/TextButton.js";
import LunchInfoCard from "./component/LunchInfoCard/LunchInfoCard.js";

IconButton.render(
  {
    src: "./templates/add-button.png",
    onClick: () => AddLunchModal.open(),
    label: "음식점 추가",
  },
  DOM.$header
);

TextButton.render(
  {
    title: "취소하기",
    onClick: () => AddLunchModal.close(),
    id: "cancel__button",
  },
  DOM.$buttonContainer
);

TextButton.render(
  {
    title: "추가하기",
    onClick: () => console.log("미구현"),
    id: "add__button",
  },
  DOM.$buttonContainer
);

LunchInfoCard.render(
  {
    src: "./templates/category-korean.png",
    name: "피양콩 할머니",
    distance: "캠퍼스부터 10분 내",
    description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩
                할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은
                평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선
                맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은
                건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만,
                할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의
                역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은
                만큼 덜어 먹을 수 있게 준비돼 있다.`,
    label: "한식",
  },
  DOM.$restaurantList
);
LunchInfoCard.render(
  {
    src: "./templates/category-chinese.png",
    name: "친친",
    distance: "캠퍼스부터 5분 내",
    description: `Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과
                정성으로 정통 중식의 세계를 펼쳐갑니다`,
    label: "중식",
  },
  DOM.$restaurantList
);
LunchInfoCard.render(
  {
    src: "./templates/category-japanese.png",
    name: "잇쇼우",
    distance: "캠퍼스부터 10분 내",
    description: `잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은
                정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는
                잇쇼우는 고객 한분 한분께 최선을 다하겠습니다`,
    label: "일식",
  },
  DOM.$restaurantList
);
LunchInfoCard.render(
  {
    src: "./templates/category-western.png",
    name: "이태리키친",
    distance: "캠퍼스부터 20분 내",
    description: `늘 변화를 추구하는 이태리키친입니다.`,
    label: "양식",
  },
  DOM.$restaurantList
);
LunchInfoCard.render(
  {
    src: "./templates/category-asian.png",
    name: "호야빈 삼성점",
    distance: "캠퍼스부터 15분 내",
    description: `푸짐한 양에 국물이 일품인 쌀국수`,
    label: "아시안",
  },
  DOM.$restaurantList
);
LunchInfoCard.render(
  {
    src: "./templates/category-etc.png",
    name: "도스타코스 선릉점",
    distance: "캠퍼스부터 5분 내",
    description: `멕시칸 캐주얼 그릴`,
    label: "기타",
  },
  DOM.$restaurantList
);
