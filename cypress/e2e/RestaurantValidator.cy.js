import { DEFAULT_DATA } from "../../src/constants/menu";
import { ERROR_MESSAGES } from "../../src/constants/menu";
import { validateRestaurantData } from "../../src/domains/Restaurants";

export const INVALID_DATA = [
  {
    invalidData: {
      name: "",
      distance: 10,
      description:
        "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.",
      category: "한식",
    },
    errorMessage: ERROR_MESSAGES.invalidRestaurantName,
  },
  {
    invalidData: {
      name: "잇쇼우잇쇼우잇쇼우잇쇼우",
      distance: 10,
      description:
        "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다",
      category: "일식",
    },
    errorMessage: ERROR_MESSAGES.invalidRestaurantName,
  },
  {
    invalidData: {
      name: "친친",
      distance: "",
      description:
        "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다",
      category: "중식",
    },
    errorMessage: ERROR_MESSAGES.invalidDistance,
  },
  {
    invalidData: {
      name: "도스타코스 선릉점",
      distance: 5,
      description: "",
      category: "",
    },
    errorMessage: ERROR_MESSAGES.invalidCategory,
  },
  {
    invalidData: {
      name: "도스타코스 선릉점",
      distance: 5,
      description:
        "멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴",
      category: "기타",
    },
    errorMessage: ERROR_MESSAGES.invalidDescriptionLength,
  },
];

describe("새 음식점 추가 기능 테스트", () => {
  it("레스토랑 추가 폼에 유효한 값을 입력했을때 에러를 발생하지 않는다.", () => {
    cy.wrap(DEFAULT_DATA).each((data) => {
      expect(() => {
        validateRestaurantData(data);
      }).to.not.throw(Error);
    });
  });

  it("레스토랑 추가 폼에 유효하지 않은 값을 입력한 경우 에러를 발생한다.", () => {
    cy.wrap(INVALID_DATA).each(({ invalidData, errorMessage }) => {
      expect(() => {
        validateRestaurantData(invalidData);
      }).to.throw(errorMessage);
    });
  });
});
