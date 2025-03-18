import type { Restaurant } from "../../src/types/type";
import addRestaurant from "../utils/addRestaurant";

describe("음식점 상세 모달 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.fixture("restaurantList.json").then((mockData) => {
      mockData.forEach((item: Restaurant) => addRestaurant(item));
    });
  });

  it("음식점 상세 모달 띄우기", () => {
    cy.get(".restaurant").first().click();
    cy.get(".modal").should("be.visible");
    cy.get(".detail-modal").should("exist");

    cy.get(".detail-modal").within(() => {
      cy.contains("h2", "가").should("exist");
      cy.contains("span", "캠퍼스부터 20분 내").should("exist");
    });
  });

  it("음식점 상세 모달 띄우고 닫기 버튼 클릭", () => {
    cy.get(".restaurant").first().click();
    cy.get(".modal").should("be.visible");
    cy.get(".detail-modal").should("exist");

    cy.get(".close-button").click();
    cy.get(".modal").should("not.be.visible");
  });

  it("음식점 상세 모달 띄우고 삭제 버튼 클릭", () => {
    cy.get("#category-filter").select("전체");
    cy.get(".restaurant").should("have.length", 10);

    cy.get(".restaurant").first().click();
    cy.get(".modal").should("be.visible");
    cy.get(".detail-modal").should("exist");

    cy.get(".delete-button").click();
    cy.get(".restaurant").should("have.length", 9);
  });
});
