import { mockRestaurantList } from "../mock-data/restaurantList";
import addRestaurant from "../utils/addRestaurant";

describe("음식점 상세 모달 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    mockRestaurantList.forEach((item) => {
      addRestaurant(item);
    });
  });

  it("음식점 상세 모달이 열린다", () => {
    cy.get(".restaurant").first().click();
    cy.get(".modal-container").should("be.visible");
  });

  it("음식점 상세 모달이 닫힌다", () => {
    cy.get(".restaurant").first().click();
    cy.get(".button--close").click();
    cy.get(".modal-container").should("not.be.visible");
  });

  it("음식점 상세 모달이 삭제된다", () => {
    cy.get(".restaurant").first().click();
    cy.get(".button--delete").click();
    cy.get(".modal-container").should("not.be.visible");
  });
});
