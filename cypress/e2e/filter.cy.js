describe("레스토랑 아이템 필터 e2e 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.viewport(1280, 720);

    cy.addRestaurant(
      "한식",
      "서울 한정식",
      "5분 내",
      "정갈한 한식",
      "https://koreanfood.com"
    );
    cy.addRestaurant(
      "일식",
      "스시야",
      "10분 내",
      "신선한 초밥",
      "https://sushi.com"
    );
    cy.addRestaurant(
      "양식",
      "이탈리안 키친",
      "15분 내",
      "맛있는 파스타",
      "https://italian.com"
    );
  });

  it("음식점 목록에서 필터 카테고리를 한식으로 고른 경우 한식 음식점만 화면에 보인다. ", () => {
    cy.get("#category-filter").select("한식");

    cy.get(".restaurant-list li").should("have.length", 1);
    cy.get("body").contains("서울 한정식");
  });

  it("음식점 목록에서 필터 카테고리를 한식으로 고른 경우 일식 음식점만 화면에 보인다. ", () => {
    cy.get("#category-filter").select("일식");

    cy.get(".restaurant-list li").should("have.length", 1);
    cy.get("body").contains("스시야");
  });

  it("음식점 목록에서 필터 카테고리를 한식으로 고른 경우 양식 음식점만 화면에 보인다. ", () => {
    cy.get("#category-filter").select("양식");

    cy.get(".restaurant-list li").should("have.length", 1);
    cy.get("body").contains("이탈리안 키친");
  });
});
