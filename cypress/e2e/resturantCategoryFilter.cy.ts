import type { Restaurant } from "../../src/types/type";
import addRestaurant from "../utils/addRestaurant";

describe("음식점 카테고리 필터 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.fixture("restaurantList.json").then((mockData) => {
      mockData.forEach((item: Restaurant) => addRestaurant(item));
    });
    cy.get("#category-filter").select("전체");
    cy.get(".restaurant").should("have.length", 10);
  });

  it("한식 카테고리를 클릭하면 한식에 해당되는 음식점 3개가 렌더링된다. ", () => {
    cy.get("#category-filter").select("한식");
    cy.get(".restaurant").should("have.length", 3);

    // 특정 한식 음식점이 표시되는지 검증
    cy.get(".restaurant").should("contain.text", "가");
    cy.get(".restaurant").should("contain.text", "한식2");
    cy.get(".restaurant").should("contain.text", "한식3");

    // 다른 카테고리 음식점이 표시되지 않는지 검증
    cy.get(".restaurant").should("not.contain.text", "나");
  });

  it("중식 카테고리를 클릭하면 중식에 해당되는 음식점 2개가 렌더링된다. ", () => {
    cy.get("#category-filter").select("중식");
    cy.get(".restaurant").should("have.length", 2);

    // 특정 중식 음식점이 표시되는지 검증
    cy.get(".restaurant").should("contain.text", "나");
    cy.get(".restaurant").should("contain.text", "중식2");

    // 다른 카테고리 음식점이 표시되지 않는지 검증
    cy.get(".restaurant").should("not.contain.text", "가");
  });

  it("일식 카테고리를 클릭하면 일식에 해당되는 음식점 1개가 렌더링된다. ", () => {
    cy.get("#category-filter").select("일식");
    cy.get(".restaurant").should("have.length", 1);

    // 특정 일식 음식점이 표시되는지 검증
    cy.get(".restaurant").should("contain.text", "다");

    // 다른 카테고리 음식점이 표시되지 않는지 검증
    cy.get(".restaurant").should("not.contain.text", "가");
  });

  it("양식 카테고리를 클릭하면 양식에 해당되는 음식점 2개가 렌더링된다. ", () => {
    cy.get("#category-filter").select("양식");
    cy.get(".restaurant").should("have.length", 2);

    // 특정 양식 음식점이 표시되는지 검증
    cy.get(".restaurant").should("contain.text", "라");
    cy.get(".restaurant").should("contain.text", "양식2");

    // 다른 카테고리 음식점이 표시되지 않는지 검증
    cy.get(".restaurant").should("not.contain.text", "가");
  });

  it("아시안 카테고리를 클릭하면 아시안에 해당되는 음식점 2개가 렌더링된다. ", () => {
    cy.get("#category-filter").select("아시안");
    cy.get(".restaurant").should("have.length", 2);

    // 특정 아시안 음식점이 표시되는지 검증
    cy.get(".restaurant").should("contain.text", "사");
    cy.get(".restaurant").should("contain.text", "아시안2");

    // 다른 카테고리 음식점이 표시되지 않는지 검증
    cy.get(".restaurant").should("not.contain.text", "가");
  });

  it("기타 카테고리를 클릭하면 기타에 해당되는 음식점 0개가 렌더링된다. ", () => {
    cy.get("#category-filter").select("기타");
    cy.get(".restaurant").should("have.length", 0);
  });
});
