describe("레스토랑 아이템 정렬 e2e 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.viewport(1280, 720);

    cy.addRestaurant(
      "한식",
      "한식",
      "15분 내",
      "정갈한 한식",
      "https://koreanfood.com"
    );
    cy.addRestaurant(
      "일식",
      "일식",
      "5분 내",
      "신선한 초밥",
      "https://sushi.com"
    );
    cy.addRestaurant(
      "양식",
      "양식",
      "10분 내",
      "맛있는 파스타",
      "https://italian.com"
    );
  });

  it("음식점 목록에서 정렬 기준으로 거리를 고른 경우 거리순으로 오름차순 정렬된다.", () => {
    cy.get("#sorting-filter").select("거리순");

    cy.get(".restaurant-list li").first().contains("일식");
    cy.get(".restaurant-list li").first().contains("5분 내");

    cy.get(".restaurant-list li").last().contains("한식");
    cy.get(".restaurant-list li").last().contains("15분 내");
  });

  it("음식점 목록에서 정렬 기준으로 이름순을 고른 경우 이름순으로 오름차순 정렬된다.", () => {
    cy.get("#sorting-filter").select("이름순");

    cy.get(".restaurant-list li").first().contains("양식");
    cy.get(".restaurant-list li").last().contains("한식");
  });
});
