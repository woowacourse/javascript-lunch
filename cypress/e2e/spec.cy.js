import errorMessage from "../../src/constants/message.js";

describe("점심 뭐 먹지", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5174/");
    cy.viewport(1536, 960);
  });

  it("모달 오픈", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal-container").should("be.visible");
  });

  it("모달 닫기", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal-container").should("be.visible");

    cy.get("#cancel-button").click();
    cy.get(".modal-container").should("not.be.visible");

    cy.get("#category").should("have.value", "");
    cy.get("#name").should("have.value", "");
    cy.get("#distance").should("have.value", "");
    cy.get("#description").should("have.value", "");
    cy.get("#link").should("have.value", "");
  });

  it("음식점 추가", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal-container").should("be.visible");

    cy.get("#category").select("한식");
    cy.get("#name").type("해삐");
    cy.get("#distance").select("10");
    cy.get("#description").type("해삐는 해삐합니다.");
    cy.get("#link").type("www.happy.com");

    cy.get("#add-button").click();
    cy.get(".modal-container").should("not.be.visible");

    cy.get(".restaurant-list").should("have.length", 1);
  });

  describe("잘못된 값이 입력되면 경고 메시지가 나온다.", () => {
    it("이름이 20자를 초과할 경우", () => {
      cy.get(".gnb__button").click();
      cy.get(".modal-container").should("be.visible");

      cy.get("#category").select("한식");
      cy.get("#name").type("해삐".repeat(11));
      cy.get("#distance").select("10");
      cy.get("#description").type("해삐는 해삐합니다.");
      cy.get("#link").type("www.happy.com");

      cy.get("#add-button").click();
      cy.on("window:alert", (alertText) => {
        expect(alertText).to.equal(errorMessage.NAME_LENGTH);
      });
    });

    it("설명이 300자를 초과할 경우", () => {
      cy.get(".gnb__button").click();
      cy.get(".modal-container").should("be.visible");

      cy.get("#category").select("한식");
      cy.get("#name").type("해삐");
      cy.get("#distance").select("10");
      cy.get("#description").type("해삐는 해삐합니다.".repeat(50));
      cy.get("#link").type("www.happy.com");

      cy.get("#add-button").click();
      cy.on("window:alert", (alertText) => {
        expect(alertText).to.equal(errorMessage.DESC_LENGTH);
      });
    });

    it("참고 링크 형식이 잘못된 경우", () => {
      cy.get(".gnb__button").click();
      cy.get(".modal-container").should("be.visible");

      cy.get("#category").select("한식");
      cy.get("#name").type("해삐");
      cy.get("#distance").select("10");
      cy.get("#description").type("해삐는 해삐합니다.");
      cy.get("#link").type("www.happy");

      cy.get("#add-button").click();
      cy.on("window:alert", (alertText) => {
        expect(alertText).to.equal(errorMessage.LINK_FORM);
      });
    });
  });
});
