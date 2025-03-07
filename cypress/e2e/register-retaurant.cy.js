import { ERROR_MESSAGE } from "../../src/constants/error.js";

describe("음식점 추가 페이지 테스트", () => {
  const info = {
    category: "중식",
    name: "친친",
    distance: "5",
    description: "친친 가지덮밥이 맛있어요",
    link: "http://localhost.30000",
  };

  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("필수 필드를 입력하고 등록 하기 버튼을 누르면 마지막 항목으로 식당이 추가된다.", () => {
    //given
    cy.get(".modal-backdrop").invoke("addClass", "open");

    cy.get("#register-form").within(() => {
      cy.get("#category").select(info.category);
      cy.get("#name").type(info.name);
      cy.get("#distance").select(info.distance);
      cy.get("#description").type(info.description);
      cy.get("#link").type(info.link);
    });
    //when
    cy.get("#register-button").click();
    //then
    const lastItem = cy.get(".restaurant-list").children().last();
    lastItem.should("contain.text", info.name);
    lastItem.should("contain.text", info.distance);
    lastItem.should("contain.text", info.description);
  });

  describe("각 입력 필드 유효성 검사시 적절한 오류 메시지가 표시된다.", () => {
    it("카테고리를 입력하지 않고 추가하기 버튼을 누르면 오류 메시지가 표시된다", () => {
      //given

      cy.get(".modal-backdrop").invoke("addClass", "open");

      cy.get("#register-form").within(() => {
        cy.get("#category").select("");
        cy.get("#name").type(info.name);
        cy.get("#distance").select(info.distance);
        cy.get("#description").type(info.description);
        cy.get("#link").type(info.link);
      });
      //when
      cy.get("#register-button").click();
      //then
      cy.get(".error-message").should(
        "have.text",
        ERROR_MESSAGE.CATEGORY_FIELD_REQUIRED
      );
    });

    it("이름을 입력하지 않고 추가하기 버튼을 누르면 오류 메시지가 표시된다", () => {
      //given

      cy.get(".modal-backdrop").invoke("addClass", "open");

      cy.get("#register-form").within(() => {
        cy.get("#category").select(info.category);
        cy.get("#name").clear();
        cy.get("#distance").select(info.distance);
        cy.get("#description").type(info.description);
        cy.get("#link").type(info.link);
      });
      //when
      cy.get("#register-button").click();
      //then
      cy.get(".error-message").should(
        "have.text",
        ERROR_MESSAGE.NAME_FIELD_REQUIRED
      );
    });

    it("거리를 입력하지 않고 추가하기 버튼을 누르면 오류 메시지가 표시된다", () => {
      //given

      cy.get(".modal-backdrop").invoke("addClass", "open");

      cy.get("#register-form").within(() => {
        cy.get("#category").select(info.category);
        cy.get("#name").type(info.name);
        cy.get("#distance").select("");
        cy.get("#description").type(info.description);
        cy.get("#link").type(info.link);
      });
      //when
      cy.get("#register-button").click();
      //then
      cy.get(".error-message").should(
        "have.text",
        ERROR_MESSAGE.DISTANCE_FIELD_REQUIRED
      );
    });
  });
});
