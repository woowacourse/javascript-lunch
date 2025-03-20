import { mockRestaurantList } from "../mock-data/restaurantList";
import addRestaurant from "../utils/addRestaurant";

describe("카테고리 필터 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    mockRestaurantList.forEach((item) => {
      addRestaurant(item);
    });
  });

  it("한식 카테고리 필터링", () => {
    cy.get("#category-filter").select("한식");
    cy.get(".restaurant").should("have.length", 2);
  });

  it("일식 카테고리 필터링", () => {
    cy.get("#category-filter").select("일식");
    cy.get(".restaurant").should("have.length", 2);
  });

  it("양식 카테고리 필터링", () => {
    cy.get("#category-filter").select("양식");
    cy.get(".restaurant").should("have.length", 2);
  });

  it("아시안 카테고리 필터링", () => {
    cy.get("#category-filter").select("아시안");
    cy.get(".restaurant").should("have.length", 2);
  });

  it("기타 카테고리 필터링", () => {
    cy.get("#category-filter").select("기타");
    cy.get(".restaurant").should("have.length", 0);
  });

  it("전체 카테고리 필터링", () => {
    cy.get("#category-filter").select("전체");
    cy.get(".restaurant").should("have.length", 10);
  });
});
