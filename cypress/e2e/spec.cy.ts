/* eslint-disable */
import exampleRestaurants from "../exampleRestaurants.json";

describe("점심 뭐 먹지 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");

    exampleRestaurants.forEach((exampleRestaurant) => {
      cy.get(".gnb__button").click();
      cy.get("select#category").select(exampleRestaurant.category);
      cy.get("input#name").type(exampleRestaurant.name);
      cy.get("select#distance").select(exampleRestaurant.distance.toString());
      cy.get("textarea#description").type(exampleRestaurant.description);
      cy.get("input#link").type(exampleRestaurant.link);
      cy.get("form.restaurant-form").submit();
    });
  });

  it("추가한 식당 이름와 UI의 식당 이름 일치여부 확인", () => {
    cy.get("h3.restaurant__name").each(($el, index, $list) => {
      const text = $el.text();
      expect(text).to.eq(exampleRestaurants[index].name);
    });
  });

  it("카테고리 한식으로 변경시 한식집만 렌더링되는지 확인", () => {
    cy.get("select.category-select").select("한식");
    cy.get("h3.restaurant__name").should("have.length", 1);
  });

  it("자주 가는 음식점 클릭 시 즐겨찾기 등록된 음식집만 렌더링되는지 확인", () => {
    cy.get(".filter.bookmark").click();
    cy.get("h3.restaurant__name").should("have.length", 0);
  });
});
