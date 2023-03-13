const GIMBAP_SONG_LYRICS = `
몇십 년 동안 서로 달리 살아온 우리
달라도 한참 달라 너무 피곤해
영화도 나는 멜로 너는 액션
난 피자 너는 순~두부

그래도 우린 하나 통한 게 있어 김밥
김밥을 좋아하잖아
언제나 김과 밥은 붙어산다고
너무나 부러워했지

잘 말아줘 잘 눌러줘
밥알이 김에 달라붙는 것처럼
너에게 붙어 있을래
날 안아줘 날 안아줘
옆구리 터져 버린 저 김밥처럼
내 가슴 터질 때까지

예전에 김밥 속에 단무지 하나
요샌 김치에 치즈 참치가
세상이 변하니까 김밥도 변해
우리의 사랑도 변해

잘 말아줘 잘 눌러줘
밥알이 김에 달라붙는 것처럼
너에게 붙어 있을래
날 안아줘 날 안아줘
옆구리 터져 버린 저 김밥처럼
내 가슴 터지게 해

널 사랑해 널 사랑해
세상이 우릴 갈라놓을 때까지
영원히 사랑 할 꺼야
끝까지 붙어 있을래
`;

const RESTAURANTS_TEMPLATE = [
  {
    restaurant: {
      category: "한식",
      name: "김밥지옥",
      estimatedTime: "15",
      description: new Array(7).fill(GIMBAP_SONG_LYRICS).join("\n\n"),
      link: "https://www.naver.com",
    },
    favorite: false,
  },
  {
    restaurant: {
      category: "한식",
      name: "늘봄막국수",
      estimatedTime: "30",
      description: "맛있음",
      link: "",
    },
    favorite: true,
  },
  {
    restaurant: {
      category: "기타",
      name: "바나프레소",
      estimatedTime: "5",
      description: "스탬프 적립해주세요",
      link: "",
    },
    favorite: true,
  },
  {
    restaurant: {
      category: "양식",
      name: "버거킹",
      estimatedTime: "10",
      description: "맛있음",
      link: "https://www.burgerking.co.kr",
    },
    favorite: false,
  },
  {
    restaurant: {
      category: "중식",
      name: "상국집",
      estimatedTime: "20",
      description: "",
      link: "",
    },
    favorite: false,
  },
  {
    restaurant: {
      category: "한식",
      name: "천국김밥",
      estimatedTime: "20",
      description: "김밥천국 아닙니다",
      link: "",
    },
    favorite: false,
  },
];

const LOCALSTORAGE_SAMPLE_DATA = JSON.stringify(RESTAURANTS_TEMPLATE);

export default LOCALSTORAGE_SAMPLE_DATA;
