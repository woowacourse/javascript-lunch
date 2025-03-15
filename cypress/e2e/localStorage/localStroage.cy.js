import { ERROR_MESSAGE } from "../../../src/settings/errorMessages";

describe("로컬 스토리지가 잘 되는지 확인하는 시나리오", () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("http://localhost:5173/");
    cy.wait(2000);
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("모달 열기 닫기 테스트, 음식점 추가(카테고리, 이름, 거리 입력)", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    cy.get(".cancel-button").click();
    cy.get(".modal").should("not.be.visible");

    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    cy.get("#category").select("중식");
    cy.get("#name").type("마담밍");
    cy.get("#distance").select("20");

    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 11);

    cy.get(".toast")
      .should("be.visible")
      .should("contain", "마담밍 음식점을 추가했습니다.");
  });

  it("모달 열기 테스트, 음식점 추가 2개", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    cy.get("#category").select("양식");
    cy.get("#name").type("타코집");
    cy.get("#distance").select("10");

    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 12);
    cy.get(".toast")
      .should("be.visible")
      .should("contain", "타코집 음식점을 추가했습니다.");

    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    cy.get("#category").select("일식");
    cy.get("#name").type("마담밍");
    cy.get("#distance").select("15");

    cy.get(".restaurant-add-form").submit();

    cy.get(".toast")
      .should("be.visible")
      .should("contain", ERROR_MESSAGE.DUPLICATE_RESTAURANT);

    cy.get("#name").clear();
    cy.get("#name").type("잇쇼이비슷한거");

    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 13).should("be.visible");

    cy.get(".toast")
      .should("be.visible")
      .should("contain", "잇쇼이비슷한거 음식점을 추가했습니다.");
  });
});
