import { RestaurantData } from "../../src/RestaurantData.js";

describe("헤더 컴포넌트 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("헤더가 렌더링 된다.", () => {
    cy.get(".gnb").should("exist");
  });
  it("헤더의 타이틀이 렌더링 된다.", () => {
    cy.get(".gnb__title").should("exist");
    cy.get(".gnb__title").contains("점심 뭐 먹지");
  });
  it("헤더의 버튼이 렌더링 된다.", () => {
    cy.get(".gnb__button").should("exist");
  });
});

describe("레스트랑 목록 컴포넌트 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("레스토랑이 랜더링 된다.", () => {
    cy.get(".restaurant__category").should("exist");
  });
  it("레스토랑 갯수만큼 랜더링 된다.", () => {
    const length = RestaurantData.length;
    cy.get(".restaurant__category").should("have.length", length);
  });
});
