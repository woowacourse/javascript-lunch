import Restaurant from "../types/RestaurantDataType";

const restaurants: Restaurant[] = [
  {
    id: "1234",
    category: "한식",
    name: "피양콩할마니",
    distance: 10,
    description:
      "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다",
    isWish: false,
    link: "https://www.youtube.com/watch?v=66aWspy73tg",
  },
  {
    id: "2345",
    category: "양식",
    name: "파스타",
    distance: 5,
    description: "레전드 파스타 맛집",
    isWish: true,
    link: "https://www.figma.com/design/KcViH81qTQERbbJtBlTEqZ/%EB%A0%88%EB%B2%A81-%EB%AF%B8%EC%85%98-%EB%94%94%EC%9E%90%EC%9D%B8-(%ED%81%AC%EB%A3%A8-%EA%B3%B5%EC%9C%A0%EC%9A%A9)?node-id=1-2&p=f&t=rUKgIzZFY2Hr1J7T-0",
  },
  {
    id: "3456",
    category: "일식",
    name: "참치방어스시",
    distance: 7,
    description: "참치와 방어가 맛있는 참지입니다. 또 가고 싶어요",
    isWish: false,
    link: "https://ofcourse.kr/css-course/cursor-%EC%86%8D%EC%84%B1",
  },
];

export default restaurants;