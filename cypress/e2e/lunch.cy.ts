const RESTAURANTS = [
  {
    id: 1,
    category: "한식",
    name: "피양콩할마니",
    distance: 10,
    isGoTo: false,
    description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
    link: "https://naver.com",
  },
  {
    id: 2,
    category: "중식",
    name: "친친",
    distance: 5,
    isGoTo: false,
    description: `Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다`,
    link: "https://naver.com",
  },
  {
    id: 3,
    category: "일식",
    name: "잇쇼우",
    distance: 10,
    isGoTo: false,
    description: `잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다`,
    link: "https://naver.com",
  },
  {
    id: 4,
    category: "양식",
    name: "이태리키친",
    distance: 20,
    isGoTo: false,
    description: `늘 변화를 추구하는 이태리키친입니다.`,
    link: "https://naver.com",
  },
  {
    id: 5,
    category: "아시안",
    name: "호아빈 삼성점",
    distance: 15,
    isGoTo: false,
    description: `푸짐한 양에 국물이 일품인 쌀국수`,
    link: "https://naver.com",
  },
  {
    id: 6,
    category: "기타",
    name: "도스타코스 선릉점",
    distance: 5,
    isGoTo: false,
    description: `멕시칸 캐주얼 그릴`,
    link: "https://naver.com",
  },
];

describe("점심 뭐먹지 e2e 테스트", () => {
  beforeEach(() => {
    cy.viewport(512, 914);
    window.localStorage.setItem("restaurants", JSON.stringify(RESTAURANTS));
    cy.visit("http://localhost:8080");
  });

  context("최초 렌더링 테스트", () => {
    it("header rendering", () => {
      cy.get("header.gnb").should("be.visible");
    });

    it("main rendering", () => {
      cy.get("main").should("be.visible");
    });

    it("tab section rendering", () => {
      cy.get("section.restaurant-list-tab-container").should("be.visible");
      cy.get("div#all-tab").should("be.visible");
      cy.get("div#favorite-tab").should("be.visible");
    });

    it("select section rendering", () => {
      cy.get("section.restaurant-filter-container").should("be.visible");
      cy.get("select#category-filter").should("be.visible");
      cy.get("select#sorting-filter").should("be.visible");
    });

    it("list section rendering", () => {
      cy.get("section.restaurant-list-container").should("be.visible");
      cy.get("ul.restaurant-list > li.restaurant").should(
        "have.length",
        RESTAURANTS.length
      );
    });

    it("form modal not rendering", () => {
      cy.get("div#add-restaurant-form__modal").should(
        "have.css",
        "display",
        "none"
      );
    });

    it("detail modal not rendering", () => {
      cy.get("div#restaurant-detail__modal").should(
        "have.css",
        "display",
        "none"
      );
    });
  });

  context("음식점 추가 모달 테스트", () => {
    it("header의 음식점 추가 버튼을 클릭하면 음식점 추가 모달이 표시된다.", () => {
      cy.get("header > button#add-restaurant__button").click();

      cy.get("div#add-restaurant-form__modal").should(
        "have.css",
        "display",
        "block"
      );
    });

    it("음식점 추가 모달 폼을 작성 후 추가하기 버튼을 클릭하면 모달이 닫히고, 음식점이 추가된다.", () => {
      cy.get("header > button#add-restaurant__button").click();

      cy.get("select#category").select("한식");
      cy.get("input#name").type("새로운 한식당");
      cy.get("select#distance").select("10");
      cy.get("textarea#description").type(
        "이 집은 cypress test를 위해 추가된 새로운 한식당입니다."
      );
      cy.get("input#link").type("https://naver.com");
      cy.get("form#restaurant-form").submit();

      cy.get("div#add-restaurant-form__modal").should(
        "have.css",
        "display",
        "none"
      );
      cy.get("ul.restaurant-list > li.restaurant").should(
        "have.length",
        RESTAURANTS.length + 1
      );
    });

    it("음식점 추가 모달에서 취소하기 버튼을 클릭하면 모달이 닫힌다.", () => {
      cy.get("header > button#add-restaurant__button").click();
      cy.get("button#add-restaurant-cancel__button").click();

      cy.get("div#add-restaurant-form__modal").should(
        "have.css",
        "display",
        "none"
      );
    });
  });
});
