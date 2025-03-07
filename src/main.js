import { createHeader } from "./components/Header";
import { createRestaurantItem } from "./components/RestaurantItem";

addEventListener("load", () => {
  const body = document.querySelector("body");
  const restaurantList = document.querySelector(".restaurant-list");

  const header = createHeader({ title: "점심 뭐 먹지" });
  header.classList.add("gnb");
  body.prepend(header);

  //////// 다음 컴포넌트
  restaurantList.append(
    createRestaurantItem({
      category: "한식",
      restaurantName: "피양콩할마니",
      distance: 10,
      description: "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩",
    })
  );
  restaurantList.append(
    createRestaurantItem({
      category: "중식",
      restaurantName: "친친",
      distance: 5,
      description: "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은",
    })
  );
  restaurantList.append(
    createRestaurantItem({
      category: "일식",
      restaurantName: "잇쇼우",
      distance: 10,
      description: "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다",
    })
  );
  restaurantList.append(
    createRestaurantItem({
      category: "양식",
      restaurantName: "파스타",
      distance: 10,
      description: "파스타",
    })
  );
  restaurantList.append(
    createRestaurantItem({
      category: "기타",
      restaurantName: "도넛",
      distance: 10,
      description: "도넛",
    })
  );
  restaurantList.append(
    createRestaurantItem({
      category: "아시안",
      restaurantName: "베트남쌀국수",
      distance: 10,
      description: "쌀국수",
    })
  );
});
