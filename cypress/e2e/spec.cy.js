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

describe("즐겨찾기 기능 테스트", () => {
  beforeEach("beforeEach", () => {
    cy.visit(TEST_URL);
    window.localStorage.setItem("restaurants", JSON.stringify(DUMMY_DATA));
  });

  it("음식점 즐겨찾기 마크를 누르면 자주가는 음식점에서 해당 음식점을 확인할 수 있디.", () => {
    cy.get("li > #favorite").first().click();
    cy.get("#favoriteTab").click();
    cy.get("#restaurantList").contains("찐친");
    cy.get("#restaurantList").contains("캠퍼스부터 5분 내");
  });

  it("음식점 상세 바텀시트에서 즐겨찾기 마크를 누르면 자주가는 음식점에서 해당 음식점을 확인할 수 있디.", () => {
    cy.get(".restaurant__info").first().click();
    cy.get("#restaurantDetail > .icon-container > #favorite").click();
    cy.get("#closeButton").click();
    cy.get("#favoriteTab").click();
    cy.get("#restaurantList").contains("찐친");
    cy.get("#restaurantList").contains("캠퍼스부터 5분 내");
  });
});
