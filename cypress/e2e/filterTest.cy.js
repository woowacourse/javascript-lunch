import store from "../../src/util/store";

describe("카테고리 필터 기능 테스트", () => {
  beforeEach(() => {
    store.setLocalStorage([
      { name: "가식당", category: "아시안", distance: "10", description: "쌀국수 드세요", link: "", stared: false },
      { name: "라식당", category: "중식", distance: "10", description: "쌀국수 드세요", link: "", stared: false },
      { name: "나식당", category: "한식", distance: "15", description: "쌀국수 드세요", link: "", stared: false },
      { name: "마식당", category: "한식", distance: "25", description: "쌀국수 드세요", link: "", stared: false },
      { name: "바식당", category: "양식", distance: "30", description: "쌀국수 드세요", link: "", stared: false },
      { name: "다식당", category: "한식", distance: "20", description: "쌀국수 드세요", link: "", stared: false },
      { name: "사식당", category: "중식", distance: "20", description: "쌀국수 드세요", link: "", stared: false },
      { name: "아식당", category: "한식", distance: "5", description: "쌀국수 드세요", link: "", stared: false },
    ]);
    cy.visit(Cypress.config().baseUrl);
  });

  it("한식 카테고리 이름순으로 정렬 기능", () => {
    cy.selectCategory("한식");
    cy.expectRestaurantListToBe(["나식당", "다식당", "마식당", "아식당"]);
  });

  it("중식 카테고리 이름순으로 정렬 기능", () => {
    cy.selectCategory("중식");
    cy.expectRestaurantListToBe(["라식당", "사식당"]);
  });

  it("양식 카테고리 이름순으로 정렬 기능", () => {
    cy.selectCategory("양식");
    cy.expectRestaurantListToBe(["바식당"]);
  });

  it("이름순으로 정렬 기능", () => {
    cy.sortBy("name");
    cy.expectRestaurantListToBe(["가식당", "나식당", "다식당", "라식당", "마식당", "바식당", "사식당", "아식당"]);
  });

  it("거리순으로 정렬 기능", () => {
    cy.sortBy("distance");
    cy.expectRestaurantListToBe(["아식당", "가식당", "라식당", "나식당", "다식당", "사식당", "마식당", "바식당"]);
  });

  it("한식 카테고리 거리순으로 정렬 기능  ", () => {
    cy.selectCategory("한식");
    cy.sortBy("distance");
    cy.expectRestaurantListToBe(["아식당", "나식당", "다식당", "마식당"]);
  });
});
