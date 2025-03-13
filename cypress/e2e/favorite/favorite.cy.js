import { ERROR_MESSAGE } from "../../../src/settings/settings.ts";
describe("즐겨찾기 테스트", () => {
  beforeEach(() => {
    cy.clearLocalStorage("restaurantList");
    cy.visit("http://localhost:5173/");
    cy.wait(2000);
  });

  it("정상적으로 즐겨찾기를 추가 할수 있어야 한다.", () => {
    cy.get(
      ":nth-child(1) > .restaurant__info > .restaurant__header > .favorite-icon"
    )
      .click()
      .should("have.attr", "src", "Star.png");
  });
  it("정상적으로 즐겨찾기를 제거 할수 있어야 한다.", () => {
    cy.get(
      ":nth-child(1) > .restaurant__info > .restaurant__header > .favorite-icon"
    )
      .click()
      .should("have.attr", "src", "Star.png");
    cy.get(
      ":nth-child(1) > .restaurant__info > .restaurant__header > .favorite-icon"
    )
      .click()
      .should("have.attr", "src", "Un-star.png");
  });
  it("새로 온 항목에도 정상적으로 즐겨찾기를 추가/제거 할수 있어야 한다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    cy.get("#category").select("한식");
    cy.get("#distance").select("5");
    cy.get("#name").clear();
    cy.get("#name").type("더휴웨딩몰");
    cy.get(".restaurant-add-form").submit();

    cy.get(".restaurant").should("have.length", 11);
    cy.get(
      ":nth-child(11) > .restaurant__info > .restaurant__header > .favorite-icon"
    )
      .click()
      .should("have.attr", "src", "Star.png");

    cy.get(
      ":nth-child(11) > .restaurant__info > .restaurant__header > .favorite-icon"
    )
      .click()
      .should("have.attr", "src", "Un-star.png");
  });
});
