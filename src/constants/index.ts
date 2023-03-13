import { Restaurant } from '../domain/RestaurantList';

const COUNTRY_FOOD = Object.freeze({
  korean: '한식',
  japanese: '일식',
  chinese: '중식',
  western: '양식',
  asian: '아시안',
  etc: '기타',
});

const DEFAULT_RESTAURANTS: Restaurant[] = [
  {
    name: '이승재참치',
    category: '일식',
    distance: 10,
    description: `저희 이승재참치는 tv출연 및 경력20년 이상의
    경험과 노하우로 최고의 숙성참치를 제공해
    드리고자 항상 노력하고 연구 중입니다. 해동 및
    숙성과정을 통해 최고급 참다랑어를 생참치 본연의맛 그대로 드실수 있도록 항상 노력하겠습니다.`,
    link: 'https://seungjaetuna.modoo.at',
    isFavorite: false,
  },
  {
    name: '농민백암순대 본점',
    category: '한식',
    distance: 10,
    description: `선릉역 1번 출구 직진, 오른쪽 신한은행에서 우
    회전, 올리브영 사거리에서 좌회전, 직진하면서 
    우측에 cu 편의점과 만두집 사이 골목  양쪽에 위치하고 있습니다`,
    link: '',
    isFavorite: false,
  },
  {
    name: '김돈이 본점',
    category: '한식',
    distance: 5,
    description: `안녕하세요. 김돈이 선릉본점입니다. 항상 노력하는 김돈이가 되겠습니다`,
    link: '',
    isFavorite: false,
  },
  {
    name: '트라가 삼성점',
    category: '양식',
    distance: 15,
    description: `삼성에 위치한 강남 맛집 자연주의 스페인 레스토랑 트라가 (!traga) 입니다.
    원재료가 가진 신선함을 능가할 요리는 없다 라는 생각을 바탕으로,
    재료 본연의 가치를 최대한 살리기 위한 방향으로 요리하고 있습니다.
    
    저희 트라가에서 사용하는 모든 소스와 요리는 신선한 천연재료로 매일 직접 만들고 있습니다.
    해산물은 당일 받은 것을 당일 소모하는 것을 원칙으로 하며,
    24시간이 지나면 전량 폐기합니다.`,
    link: '',
    isFavorite: false,
  },
  {
    name: '마담밍',
    category: '중식',
    distance: 10,
    description: `우리나라 최초 짬뽕냉면.냉짬뽕식당 입니다..21년의 역사가있습니다`,
    link: 'http://www.madamming.com/',
    isFavorite: false,
  },
  {
    name: '72420',
    category: '아시안',
    distance: 20,
    description: `육수는 특별합니다.!
    약 20여가지 한약재와 사골, 양지를 사용하여
    매장에서 직접 우려내기에
    국물부터가 특별합니다.`,
    link: 'http://www.madamming.com/',
    isFavorite: false,
  },
  {
    name: '월미당 대치점',
    category: '아시안',
    distance: 30,
    description: ``,
    link: '',
    isFavorite: false,
  },
  {
    name: '전봇대',
    category: '기타',
    distance: 20,
    description: ``,
    link: '',
    isFavorite: false,
  },
  {
    name: '공백이없는긴문장을테스트하는음식점이름입니다',
    category: '기타',
    distance: 20,
    description: `공백이없는긴문장을테스트하는설명입니다가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사`,
    link: 'https://www.google.com/search?q=cypress+contains+includeShadowDom&sxsrf=AJOqlzVVhXz0AxFMFbs8Xij2s3UxkgZxBQ%3A1678611402986&ei=ypMNZKzvO43mwQOBlLeIDg&ved=0ahUKEwis_I_jgtb9AhUNc3AKHQHKDeEQ4dUDCA8&uact=5&oq=cypress+contains+includeShadowDom&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQogQyBQgAEKIEMggIABCiBBCLAzoKCAAQRxDWBBCwAzoICCEQoAEQwwRKBAhBGABQthZYoidgqytoAXABeACAAZQBiAG9BJIBAzAuNJgBAKABAcgBCrgBAcABAQ&sclient=gws-wiz-serp',
    isFavorite: false,
  },
  {
    name: '이름에 "이 들어가 있는 경우',
    category: '기타',
    distance: 30,
    description: ``,
    link: '',
    isFavorite: false,
  },
  {
    name: "이름에 '이 들어가 있는 경우",
    category: '기타',
    distance: 5,
    description: ``,
    link: '',
    isFavorite: false,
  },
];

const LOCAL_STORAGE_KEY = 'userList';

export { COUNTRY_FOOD, DEFAULT_RESTAURANTS, LOCAL_STORAGE_KEY };
