import IRestaurant from "../type/IRestaurant";

const defaultRestaurants: IRestaurant[] = [
  {
    id: "dad24efa-8d45-4020-bfc6-e8dde59934ea",
    category: "chinese",
    name: "찐친",
    distance: 5,
    description: "찐친들이랑 가는 중국집",
    link: undefined,
    favorite: false,
  },
  {
    id: "32810bb1-659f-4550-88fe-d9968db9f433",
    category: "etc",
    name: "커피베네",
    distance: 5,
    description: "성담빌딩 건물에 있는 커피베네",
    link: undefined,
    favorite: false,
  },
  {
    id: "b20ad7c5-073d-42d1-9ca9-33b518537076",
    category: "etc",
    name: "스타벅스 선릉역점",
    distance: 5,
    description: "면담하기 좋은 곳 스타벅스 시끌벅적함",
    link: undefined,
    favorite: true,
  },
  {
    id: "e3a7fa68-6c7a-417f-b6d6-58c9d561e08e",
    category: "korean",
    name: "영동칼국수",
    distance: 15,
    description:
      "멀긴 한데 그래도 9,000원이라는 가격에 저렴하게 적게 먹을 수 있는 곳. 지갑 다이어트하기 좋은 곳",
    link: undefined,
    favorite: false,
  },
  {
    id: "1fe5673d-0c0e-472c-be1f-4a9faab88e63",
    category: "korean",
    name: "덮밥이맛있는집",
    distance: 15,
    description:
      "영동칼국수집 옆에 있는 연어덮밥, 스테이크덮밥 등을 파는 덮밥 집",
    link: undefined,
    favorite: false,
  },
  {
    id: "14e16cf0-4f9e-4fe0-8f89-cc1d613e3c81",
    category: "japanese",
    name: "돈카레",
    distance: 10,
    description: "도밥이 좋아하는 돈카레",
    link: undefined,
    favorite: true,
  },
  {
    id: "79ef25ec-be9d-4eef-b4fb-c198f71f9e4f",
    category: "chinese",
    name: "우육면가",
    distance: 10,
    description: "크론이 한 번도 안 먹어 본 우육면가",
    link: undefined,
    favorite: false,
  },
  {
    id: "a5a3b5b5-6616-46cd-9914-de405b448a7e",
    category: "korean",
    name: "시골밥상머리",
    distance: 10,
    description: "시골에서 주는 밥처럼 나오는 상머리",
    link: undefined,
    favorite: false,
  },
];

export default defaultRestaurants;
