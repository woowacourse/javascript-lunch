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

    it("음식점 추가 모달에서 취소하기 버튼 클릭 시 모달이 닫힌다", () => {
      cy.get(".modal-container").should("not.be.visible");
      cy.get(".gnb__button > img").click();
      cy.get(".modal-container").should("be.visible");

      cy.get("#cancel-button").click();
      cy.get(".modal-container").should("not.be.visible");
    });
  });

  describe("음식점 추가 모달 alert 동작 테스트", () => {
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

    it("이름 입력값이 20글자를 초과하면 alert가 작동한다", () => {
      cy.get(".gnb__button > img").click();
      cy.get("#category").select("한식");
      cy.get("#distance").select("10");

      cy.window().then((win) => {
        cy.spy(win, "alert").as("alertSpy");
      });

      cy.get("#name").type("a".repeat(21));

      cy.get("@alertSpy").should(
        "have.been.calledOnceWith",
        ERROR.INVALID_INPUT_LENGTH(20)
      );
    });

    it("설명 입력값이 1000글자를 초과하면 alert가 작동한다", () => {
      cy.get(".gnb__button > img").click();
      cy.get("#category").select("한식");
      cy.get("#distance").select("10");
      cy.get("#name").type("테스트음식점");

      cy.window().then((win) => {
        cy.spy(win, "alert").as("alertSpy");
      });

      cy.get("#description").type("a".repeat(1001));

      cy.get("@alertSpy").should(
        "have.been.calledOnceWith",
        ERROR.INVALID_INPUT_LENGTH(1000)
      );
    });

    it("링크 입력값이 300글자를 초과하면 alert가 작동한다", () => {
      cy.get(".gnb__button > img").click();
      cy.get("#category").select("한식");
      cy.get("#distance").select("10");
      cy.get("#name").type("테스트음식점");

      cy.window().then((win) => {
        cy.spy(win, "alert").as("alertSpy");
      });

      cy.get("#link").type("a".repeat(301));

      cy.get("@alertSpy").should(
        "have.been.calledOnceWith",
        ERROR.INVALID_INPUT_LENGTH(300)
      );
    });
  });
});
