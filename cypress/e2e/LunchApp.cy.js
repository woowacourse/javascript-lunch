import { RESTAURANTS_INFOS } from "../fixtures/restaurantInfos";

describe("LunchApp(점심 뭐 먹지) E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
    localStorage.setItem("restaurants", JSON.stringify(RESTAURANTS_INFOS));
  });

  it("처음 방문했을 때 기본 요소(header와 main 태그)가 존재한다.", () => {
    cy.get("header").should("be.visible");
    cy.get("main").should("be.visible");
  });

  it("처음 방문했을 때 header에 '점심 뭐 먹지'라는 텍스트가 존재한다.", () => {
    cy.get("header").contains("점심 뭐 먹지");
  });

  it("처음 방문했을 때 음식점 등록 모달과 음식점 상세 정보 모달이 보이지 않는다.", () => {
    cy.get("restaurant-form").should("not.be.visible");
    cy.get("restaurant-detail").should("not.be.visible");
  });

  it("처음 방문했을 때 로컬 스토리지에 저장된 데이터의 수 만큼 restaurant item이 존재한다.", () => {
    cy.get("restaurant-item").should("have.length", RESTAURANTS_INFOS.length);
  });
});
