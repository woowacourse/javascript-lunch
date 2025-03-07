import { ERROR } from "../../src/constants/messages";

context("공통 설정", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  describe("초기 화면 렌더링 테스트", () => {
    it("첫 화면 렌더링 시 음식점 목록이 보인다.", () => {
      cy.get(".restaurant-list").should("be.visible");
    });
  });

  describe("음식점 추가 모달 기능 정상 동작 테스트", () => {
    it("목록 추가 아이콘 클릭 시 음식점 추가 모달이 화면에 보인다.", () => {
      cy.get(".modal-container").should("not.be.visible");
      cy.get(".gnb__button > img").click();
      cy.get(".modal-container").should("be.visible");
    });

    it("음식점 추가 모달에서 추가하기 버튼 클릭 시 restaurantList에 추가된다.", () => {
      cy.get(".restaurant").then(($items) => {
        const initialLength = $items.length;

        cy.get(".gnb__button > img").click();
        cy.get("#category").select("한식");
        cy.get("#name").type("테스트음식점");
        cy.get("#distance").select("10");
        cy.get("#add-button").click();
        cy.get(".restaurant-list").should("contain", "테스트음식점");
        cy.get(".restaurant").should("have.length", initialLength + 1);
      });
    });

    it("음식점 추가 모달에서 취소하기 버튼 클릭 시 모달이 닫힌다", () => {
      cy.get(".modal-container").should("not.be.visible");
      cy.get(".gnb__button > img").click();
      cy.get(".modal-container").should("be.visible");

      cy.get("#cancel-button").click();
      cy.get(".modal-container").should("not.be.visible");
    });
  });

  describe("음식점 추가 모달 기능 실패 동작 테스트", () => {
    it("필수입력 값이 입력되지 않으면 alert가 작동한다", () => {
      cy.get(".gnb__button > img").click();
      cy.get("#category").select("한식");
      cy.get("#distance").select("10");

      cy.window().then((win) => {
        cy.spy(win, "alert").as("alertSpy");
      });

      cy.get("#add-button").click();

      cy.get("@alertSpy").should(
        "have.been.calledOnceWith",
        ERROR.INVALID_INPUT_REQUIRED
      );
    });

    it("이름 입력값이 공백이면 alert가 작동한다", () => {
      cy.get(".gnb__button > img").click();
      cy.get("#category").select("한식");
      cy.get("#distance").select("10");
      cy.get("#name").type(" ");

      cy.window().then((win) => {
        cy.spy(win, "alert").as("alertSpy");
      });

      cy.get("#link").click();

      cy.get("@alertSpy").should(
        "have.been.calledOnceWith",
        ERROR.INVALID_EMPTY_INPUT
      );
    });
  });
});
