import { DUMMY_DATA } from "../../src/constants";

const TEST_URL = "http://localhost:8081/";

describe("음식점 추가 바텀시트 테스트", () => {
  beforeEach("beforeEach", () => {
    cy.visit(TEST_URL);
  });

  it("음식점 추가 바텀시트를 열었다가 취소하기 버튼으로 닫는다.", () => {
    cy.get("#addIcon").click();
    cy.contains("새로운 음식점");
    cy.get("#cancelButton").click();
    cy.get("#modal").should("not.be.visible");
  });

  it("음식점 추가 바텀시트를 열어 새로운 음식점을 추가한다.", () => {
    cy.get("#addIcon").click();
    cy.contains("새로운 음식점");
    cy.get("#category").select("한식");
    cy.get("#name").type("봉피양");
    cy.get("#distance").select("5");
    cy.get("#description").type("평양냉면");
    cy.get("#link").type("https://www.naver.com/");
    cy.get("#submitButton").click();
    cy.get("#modal").should("not.be.visible");
    cy.get("#restaurantList").contains("봉피양");
    cy.get("#restaurantList").contains("캠퍼스부터 5분 내");
  });
});
