import { ERROR_MESSAGE } from "./constants/constants.js";
import validateRestaurant from "./validateRestaurant.js";

describe("음식점 이름 테스트", () => {
  const restaurantsNameList = [
    "피양콩할마니",
    "친친",
    "잇쇼우",
    "이태리키친",
    "호아빈 삼성점",
    "도스타코스 선릉점",
  ];

  test("식당 이름이 1글자 이하면 오류가 발생한다.", () => {
    const newRestaurant = {
      name: "",
      description: "",
    };

    expect(validateRestaurant(newRestaurant, restaurantsNameList)).toBe(null);
  });

  test("식당 이름이 20글자 초과면 오류가 발생한다.", () => {
    const newRestaurant = {
      name: "일이삼사오육칠팔구십일이삼사오육칠팔구십1",
      description: "",
    };

    expect(validateRestaurant(newRestaurant, restaurantsNameList)).toBe(
      ERROR_MESSAGE.restaurantNameMaxLength
    );
  });

  test("식당 이름이 1글자 이상, 20글자 이하면 정상 작동한다.", () => {
    const newRestaurant = {
      name: "일이삼사오육칠팔구십일이삼사오육칠팔구십1",
      description: "식당이름",
    };

    expect(validateRestaurant(newRestaurant, restaurantsNameList)).toBe(
      ERROR_MESSAGE.restaurantNameMaxLength
    );
  });

  test("식당 이름이 기존에 등록된 식당 이름과 중복될 경우 오류가 발생한다.", () => {
    const newRestaurant = {
      name: "친친",
      description: "",
    };

    expect(validateRestaurant(newRestaurant, restaurantsNameList)).toBe(
      ERROR_MESSAGE.duplicateRestaurantName
    );
  });

  test("식당 이름이 기존에 등록된 식당과 다를 경우 정상 작동한다.", () => {
    const newRestaurant = {
      name: "친친아니다",
      description: "",
    };

    expect(validateRestaurant(newRestaurant, restaurantsNameList)).toBe(null);
  });
});

describe("음식점 설명 테스트", () => {
  const restaurantsNameList = [
    "피양콩할마니",
    "친친",
    "잇쇼우",
    "이태리키친",
    "호아빈 삼성점",
    "도스타코스 선릉점",
  ];

  test("식당 설명이 500자 초과이면 오류가 발생한다.", () => {
    const newRestaurant = {
      name: "친친아니다",
      description:
        "산아, 우뚝 솟은 푸른 산아, 철철철 흐르듯 짙푸른 산아. 숱한 나무들, 무성히 무성히 우거진 산마루에, 금빛 기름진 햇살은 내려오고, 둥둥 산을 넘어, 흰구름 건넌 자리 씻기는 하늘. 사슴도 안 오고 바람도 안 불고, 넘엇 골 골짜기서 울어오는 뻐꾸기. 산아, 푸른 산아. 네 가슴 향기로운 풀밭에 엎드리면, 나는 가슴이 울어라. 흐르는 골짜기 스며드는 물소리에, 내사 줄줄줄 가슴이 울어라. 아득히 가버린 것 잊어 버린 하늘과, 아른 아른 오지 않는 보고 싶은 하늘에, 어쩌면 만나도 질 볼이 고운 사람이, 난 혼자 그리워라. 가슴으로 그리워라. 티끌부는 세상에도 벌레 같은 세상에도 눈 맑은, 가슴 맑은, 보고지운 나의 사람. 달밤이나 새벽녘, 홀로 서서 눈물어릴 볼이 고운 나의 사람. 달 가고, 밤 가고, 눈물도 가고, 틔어 올 밝은 하늘 빛난 아침 이르면, 향기로운 이슬밭 푸른 언덕을, 총총총 달려도 와줄 볼이 고운 나의 사람. 푸른 산 한나절 구름은 가고, 골 넘어, 골 넘어, 뻐꾸기는 우는데, 눈에 어려 흘러가는 물결같은 사람 속, 아우성쳐 흘러가는 물결 같은 사람 속에, 난 그리노라. 너만 그리노라. 혼자서 철도 없이 난 너만 그리노라.",
    };

    expect(validateRestaurant(newRestaurant, restaurantsNameList)).toBe(
      ERROR_MESSAGE.descriptionMaxLength
    );
  });

  test("식당 설명이 500자 이하이면 정상 작동한다.", () => {
    const newRestaurant = {
      name: "친친아니다",
      description: "설명이예요.",
    };

    expect(validateRestaurant(newRestaurant, restaurantsNameList)).toBe(null);
  });
});
